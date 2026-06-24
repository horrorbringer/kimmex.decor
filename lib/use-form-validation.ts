import { useCallback, useState } from "react";

type ValidationRules = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  patternMessage?: string;
  custom?: (value: string) => string | null;
};

type FieldConfig = Record<string, ValidationRules>;

type FieldErrors = Record<string, string>;

export function useFormValidation(fields: FieldConfig) {
  const [errors, setErrors] = useState<FieldErrors>({});

  const validate = useCallback(
    (formData: FormData): boolean => {
      const newErrors: FieldErrors = {};

      for (const [name, rules] of Object.entries(fields)) {
        const value = formData.get(name)?.toString().trim() ?? "";

        if (rules.required && !value) {
          newErrors[name] = "This field is required";
          continue;
        }

        if (value && rules.minLength && value.length < rules.minLength) {
          newErrors[name] = `Minimum ${rules.minLength} characters`;
          continue;
        }

        if (value && rules.maxLength && value.length > rules.maxLength) {
          newErrors[name] = `Maximum ${rules.maxLength} characters`;
          continue;
        }

        if (value && rules.pattern && !rules.pattern.test(value)) {
          newErrors[name] = rules.patternMessage || "Invalid format";
          continue;
        }

        if (value && rules.custom) {
          const customError = rules.custom(value);
          if (customError) {
            newErrors[name] = customError;
          }
        }
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [fields]
  );

  const clearError = useCallback((name: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  return { errors, validate, clearError, clearAllErrors };
}
