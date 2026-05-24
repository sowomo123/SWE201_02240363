// Product List Screen
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { useProducts } from '../store/ProductContext';
import { useAuth } from '../store/AuthContext';
import { Card, CardTitle, CardSubtitle, CardText } from '../components/Card';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { EmptyState } from '../components/EmptyState';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { formatCurrency, getStockStatus, getStockColor } from '../utils/helpers';
import { Product } from '../types';

export const ProductListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { state, fetchProducts, deleteProduct, setSearchQuery, setCategoryFilter, getFilteredProducts, clearError } = useProducts();
  const { state: authState, logout } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchProducts();
    } catch (error) {
      // Error already handled in context
    } finally {
      setRefreshing(false);
    }
  };

  const handleDelete = (product: Product) => {
    Alert.alert(
      'Delete Product',
      `Are you sure you want to delete "${product.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteProduct(product.id);
              Alert.alert('Success', 'Product deleted successfully');
            } catch (error: any) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  const renderProduct = ({ item }: { item: Product }) => {
    const stockStatus = getStockStatus(item.stock, item.minStock);
    const stockColor = getStockColor(item.stock, item.minStock);

    return (
      <Card
        onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
      >
        <View style={styles.productHeader}>
          <CardTitle>{item.name}</CardTitle>
          <Text style={[styles.stockBadge, { backgroundColor: stockColor }]}>
            {stockStatus}
          </Text>
        </View>
        <CardSubtitle>SKU: {item.sku}</CardSubtitle>
        <CardText>{item.description}</CardText>
        <View style={styles.productFooter}>
          <Text style={styles.price}>{formatCurrency(item.price)}</Text>
          <Text style={styles.stock}>Stock: {item.stock}</Text>
        </View>
        <View style={styles.actions}>
          <Button
            title="Edit"
            onPress={() => navigation.navigate('ProductForm', { productId: item.id })}
            variant="secondary"
            style={styles.actionButton}
          />
          <Button
            title="Delete"
            onPress={() => handleDelete(item)}
            variant="danger"
            style={styles.actionButton}
          />
        </View>
      </Card>
    );
  };

  if (state.isLoading) {
    return <Loading message="Loading products..." />;
  }

  if (state.error) {
    return (
      <ErrorDisplay
        message={state.error}
        onRetry={() => {
          clearError();
          fetchProducts();
        }}
      />
    );
  }

  const filteredProducts = getFilteredProducts();
  const categories = Array.from(new Set(state.products.map(p => p.category)));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Products</Text>
        <Text style={styles.headerSubtitle}>Welcome, {authState.user?.username}</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={state.searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          <TouchableOpacity
            style={[styles.categoryButton, !state.selectedCategory && styles.categoryButtonActive]}
            onPress={() => setCategoryFilter('')}
          >
            <Text style={[styles.categoryText, !state.selectedCategory && styles.categoryTextActive]}>
              All
            </Text>
          </TouchableOpacity>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                state.selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => setCategoryFilter(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  state.selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {filteredProducts.length === 0 ? (
        <EmptyState
          message="No products found"
          submessage={state.searchQuery || state.selectedCategory ? 'Try adjusting your search or filters' : 'Add your first product to get started'}
        />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('ProductForm')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  logoutButton: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  filterContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoryScroll: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
  list: {
    padding: 16,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  stock: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  actionButton: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  fabText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
});
