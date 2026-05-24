// Product Form Screen (Create/Edit)
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useProducts } from '../store/ProductContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useForm } from '../hooks/useForm';
import { Product, Supplier } from '../types';
import { productsApi } from '../api/products';

interface Props {
  route: any;
  navigation: any;
}

export const ProductFormScreen: React.FC<Props> = ({ route, navigation }) => {
  const { productId } = route.params || {};
  const { state, addProduct, updateProduct } = useProducts();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!productId);
  const isEdit = !!productId;

  const validationRules = {
    name: {
      required: true,
      minLength: 2,
    },
    sku: {
      required: true,
      minLength: 3,
    },
    description: {
      required: true,
      minLength: 10,
    },
    price: {
      required: true,
      custom: (value: string) => {
        const num = parseFloat(value);
        return !isNaN(num) && num > 0 ? null : 'Price must be a positive number';
      },
    },
    stock: {
      required: true,
      custom: (value: string) => {
        const num = parseInt(value);
        return !isNaN(num) && num >= 0 ? null : 'Stock must be a non-negative number';
      },
    },
    minStock: {
      required: true,
      custom: (value: string) => {
        const num = parseInt(value);
        return !isNaN(num) && num >= 0 ? null : 'Minimum stock must be a non-negative number';
      },
    },
    category: {
      required: true,
      minLength: 2,
    },
    supplierId: {
      required: true,
    },
  };

  const { values, errors, touched, handleChange, handleBlur, validate, reset, setValues } = useForm(
    {
      name: '',
      sku: '',
      description: '',
      price: '',
      stock: '',
      minStock: '',
      category: '',
      supplierId: '',
    },
    validationRules
  );

  useEffect(() => {
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const loadProduct = async () => {
    setInitialLoading(true);
    try {
      const product = await productsApi.getById(productId);
      setValues({
        name: product.name,
        sku: product.sku,
        description: product.description,
        price: product.price.toString(),
        stock: product.stock.toString(),
        minStock: product.minStock.toString(),
        category: product.category,
        supplierId: product.supplierId,
      });
    } catch (error: any) {
      Alert.alert('Error', error.message);
      navigation.goBack();
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const productData = {
        name: values.name,
        sku: values.sku,
        description: values.description,
        price: parseFloat(values.price),
        stock: parseInt(values.stock),
        minStock: parseInt(values.minStock),
        category: values.category,
        supplierId: values.supplierId,
      };

      if (isEdit) {
        await updateProduct(productId, productData);
        Alert.alert('Success', 'Product updated successfully');
      } else {
        await addProduct(productData);
        Alert.alert('Success', 'Product created successfully');
      }
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>{isEdit ? 'Edit Product' : 'New Product'}</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Product Name"
            placeholder="Enter product name"
            value={values.name}
            onChangeText={(text) => handleChange('name', text)}
            onBlur={() => handleBlur('name')}
            error={touched.name ? errors.name : undefined}
          />

          <Input
            label="SKU"
            placeholder="Enter SKU"
            value={values.sku}
            onChangeText={(text) => handleChange('sku', text)}
            onBlur={() => handleBlur('sku')}
            error={touched.sku ? errors.sku : undefined}
            autoCapitalize="characters"
          />

          <Input
            label="Description"
            placeholder="Enter product description"
            value={values.description}
            onChangeText={(text) => handleChange('description', text)}
            onBlur={() => handleBlur('description')}
            error={touched.description ? errors.description : undefined}
            multiline
            numberOfLines={4}
          />

          <Input
            label="Price ($)"
            placeholder="Enter price"
            value={values.price}
            onChangeText={(text) => handleChange('price', text)}
            onBlur={() => handleBlur('price')}
            error={touched.price ? errors.price : undefined}
            keyboardType="decimal-pad"
          />

          <Input
            label="Stock Quantity"
            placeholder="Enter stock quantity"
            value={values.stock}
            onChangeText={(text) => handleChange('stock', text)}
            onBlur={() => handleBlur('stock')}
            error={touched.stock ? errors.stock : undefined}
            keyboardType="number-pad"
          />

          <Input
            label="Minimum Stock Level"
            placeholder="Enter minimum stock level"
            value={values.minStock}
            onChangeText={(text) => handleChange('minStock', text)}
            onBlur={() => handleBlur('minStock')}
            error={touched.minStock ? errors.minStock : undefined}
            keyboardType="number-pad"
          />

          <Input
            label="Category"
            placeholder="Enter category"
            value={values.category}
            onChangeText={(text) => handleChange('category', text)}
            onBlur={() => handleBlur('category')}
            error={touched.category ? errors.category : undefined}
          />

          <Input
            label="Supplier ID"
            placeholder="Enter supplier ID"
            value={values.supplierId}
            onChangeText={(text) => handleChange('supplierId', text)}
            onBlur={() => handleBlur('supplierId')}
            error={touched.supplierId ? errors.supplierId : undefined}
          />

          <Button
            title={isEdit ? 'Update Product' : 'Create Product'}
            onPress={handleSubmit}
            loading={loading}
            style={styles.submitButton}
          />

          <Button
            title="Cancel"
            onPress={() => navigation.goBack()}
            variant="secondary"
            style={styles.cancelButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    padding: 20,
  },
  submitButton: {
    marginTop: 8,
  },
  cancelButton: {
    marginTop: 12,
  },
});
