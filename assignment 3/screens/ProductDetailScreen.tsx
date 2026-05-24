// Product Detail Screen
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useProducts } from '../store/ProductContext';
import { Card, CardTitle, CardSubtitle, CardText, CardSection } from '../components/Card';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { formatCurrency, formatDate, getStockStatus, getStockColor } from '../utils/helpers';
import { Product, Supplier } from '../types';
import { productsApi } from '../api/products';

interface Props {
  route: any;
  navigation: any;
}

export const ProductDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { productId } = route.params;
  const { state } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const productData = await productsApi.getById(productId);
      setProduct(productData);
      
      // Get supplier details
      if (productData.supplierId) {
        const supplierData = state.suppliers.find(s => s.id === productData.supplierId);
        setSupplier(supplierData || null);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigation.navigate('ProductForm', { productId });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]
    );
  };

  if (loading) {
    return <Loading message="Loading product details..." />;
  }

  if (error || !product) {
    return <ErrorDisplay message={error || 'Product not found'} onRetry={loadProduct} />;
  }

  const stockStatus = getStockStatus(product.stock, product.minStock);
  const stockColor = getStockColor(product.stock, product.minStock);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={[styles.stockBadge, { backgroundColor: stockColor }]}>
          {stockStatus}
        </Text>
      </View>

      <Card>
        <CardSection>
          <CardSubtitle>Product Information</CardSubtitle>
          <CardText>SKU: {product.sku}</CardText>
          <CardText>Category: {product.category}</CardText>
          <CardText>Price: {formatCurrency(product.price)}</CardText>
          <CardText>Stock: {product.stock} units</CardText>
          <CardText>Minimum Stock: {product.minStock} units</CardText>
        </CardSection>

        <CardSection>
          <CardSubtitle>Description</CardSubtitle>
          <CardText>{product.description}</CardText>
        </CardSection>

        {supplier && (
          <CardSection>
            <CardSubtitle>Supplier</CardSubtitle>
            <CardText>Name: {supplier.name}</CardText>
            <CardText>Email: {supplier.email}</CardText>
            <CardText>Phone: {supplier.phone}</CardText>
          </CardSection>
        )}

        <CardSection>
          <CardSubtitle>Timestamps</CardSubtitle>
          <CardText>Created: {formatDate(product.createdAt)}</CardText>
          <CardText>Updated: {formatDate(product.updatedAt)}</CardText>
        </CardSection>
      </Card>

      <View style={styles.actions}>
        <Button
          title="Edit Product"
          onPress={handleEdit}
          style={styles.actionButton}
        />
        <Button
          title="Delete Product"
          onPress={handleDelete}
          variant="danger"
          style={styles.actionButton}
        />
      </View>
    </ScrollView>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  stockBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  actions: {
    padding: 20,
    gap: 12,
  },
  actionButton: {
    minHeight: 48,
  },
});
