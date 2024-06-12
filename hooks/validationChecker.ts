import React from 'react'

export const useValidationChecker = () => {
  const validateEmptyInputs = (value: string): string | null => {
    if (!value.trim()) {
      return `Invalidate is Empty`
    }

    return null;
  }

  const validateEmailInput = (emailVal: string): string | null => {
    const emptyValidate = validateEmptyInputs(emailVal);
    if (emptyValidate) {
      return emptyValidate;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailVal)) {
      return 'Invalid email format';
    }

    return null;
  }

  const validatePasswordInput = (password: string): string | null => {
    const emptyValidate = validateEmptyInputs(password);
    if (emptyValidate) {
      return emptyValidate;
    }

    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }

    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      return 'Password must contain lowercase, uppercase, and numeric characters';
    }

    return null;
  }

  const validateConfirmPasswordInput = (password: string, confirmPassword: string): string | null => {
    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }
    return null;
  }

  return { validateEmptyInputs, validateEmailInput, validatePasswordInput, validateConfirmPasswordInput }
}

