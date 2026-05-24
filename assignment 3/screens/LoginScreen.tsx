// Login Screen
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useAuth } from '../store/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useForm } from '../hooks/useForm';

export const LoginScreen: React.FC = () => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const validationRules = {
    email: {
      required: true,
      custom: (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? null : 'Invalid email format';
      },
    },
    password: {
      required: true,
      minLength: 6,
    },
  };

  const { values, errors, touched, handleChange, handleBlur, validate, reset } = useForm(
    {
      email: '',
      password: '',
      username: '',
    },
    isLogin
      ? { email: validationRules.email, password: validationRules.password }
      : {
          username: { required: true, minLength: 3 },
          email: validationRules.email,
          password: validationRules.password,
        }
  );

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      if (isLogin) {
        await login(values.email, values.password);
      } else {
        await register(values.username, values.email, values.password);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    reset();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Inventory Manager</Text>
          <Text style={styles.subtitle}>{isLogin ? 'Sign In' : 'Create Account'}</Text>
        </View>

        <View style={styles.form}>
          {!isLogin && (
            <Input
              label="Username"
              placeholder="Enter username"
              value={values.username}
              onChangeText={(text) => handleChange('username', text)}
              onBlur={() => handleBlur('username')}
              error={touched.username ? errors.username : undefined}
              autoCapitalize="none"
            />
          )}

          <Input
            label="Email"
            placeholder="Enter email"
            value={values.email}
            onChangeText={(text) => handleChange('email', text)}
            onBlur={() => handleBlur('email')}
            error={touched.email ? errors.email : undefined}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Password"
            placeholder="Enter password"
            value={values.password}
            onChangeText={(text) => handleChange('password', text)}
            onBlur={() => handleBlur('password')}
            error={touched.password ? errors.password : undefined}
            secureTextEntry
            autoCapitalize="none"
          />

          <Button
            title={isLogin ? 'Sign In' : 'Register'}
            onPress={handleSubmit}
            loading={loading}
            style={styles.button}
          />

          <Button
            title={isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
            onPress={toggleMode}
            variant="secondary"
            style={styles.button}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Demo credentials: admin@inventory.com / admin123
          </Text>
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    marginTop: 16,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});
