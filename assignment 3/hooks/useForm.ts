// Custom hook for form management with validation
import { useState, useCallback } from 'react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

interface FormErrors {
  [key: string]: string;
}

interface UseFormReturn<T> {
  values: T;
  errors: FormErrors;
  touched: { [key: string]: boolean };
  handleChange: (field: keyof T, value: string) => void;
  handleBlur: (field: keyof T) => void;
  validate: () => boolean;
  reset: () => void;
  setValues: (values: T) => void;
}

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationRules?: ValidationRules
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = useCallback(
    (field: string, value: string): string | null => {
      if (!validationRules || !validationRules[field]) {
        return null;
      }

      const rules = validationRules[field];
      const fieldErrors: string[] = [];

      if (rules.required && !value.trim()) {
        fieldErrors.push(`${field} is required`);
      }

      if (rules.minLength && value.length < rules.minLength) {
        fieldErrors.push(`${field} must be at least ${rules.minLength} characters`);
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        fieldErrors.push(`${field} must not exceed ${rules.maxLength} characters`);
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        fieldErrors.push(`${field} format is invalid`);
      }

      if (rules.custom) {
        const customError = rules.custom(value);
        if (customError) {
          fieldErrors.push(customError);
        }
      }

      return fieldErrors.length > 0 ? fieldErrors[0] : null;
    },
    [validationRules]
  );

  const handleChange = useCallback(
    (field: keyof T, value: string) => {
      setValues(prev => ({ ...prev, [field]: value }));
      
      // Validate field if it's been touched
      if (touched[field as string]) {
        const error = validateField(field as string, value);
        setErrors(prev => ({ ...prev, [field]: error || '' }));
      }
    },
    [touched, validateField]
  );

  const handleBlur = useCallback(
    (field: keyof T) => {
      setTouched(prev => ({ ...prev, [field]: true }));
      const error = validateField(field as string, values[field as string]);
      setErrors(prev => ({ ...prev, [field]: error || '' }));
    },
    [values, validateField]
  );

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(validationRules || {}).forEach(field => {
      const error = validateField(field, values[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(validationRules || {}).reduce((acc, field) => ({ ...acc, [field]: true }), {})
    );

    return isValid;
  }, [values, validationRules, validateField]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const setFormValues = useCallback((newValues: T) => {
    setValues(newValues);
  }, []);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    reset,
    setValues: setFormValues,
  };
}
