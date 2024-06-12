import { useState } from "react";
import { useValidationChecker } from "./validationChecker";

interface InputErrorType {
  fullName: string | null;
  userName: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
}

export const useAuthInputs = () => {
  const { validateEmptyInputs, validateEmailInput, validatePasswordInput, validateConfirmPasswordInput } = useValidationChecker();
  
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<InputErrorType | null>({ fullName: '', userName: '', email: '', password: '', confirmPassword: '' });

  const validateInputs = (): boolean => {
    const fullNameError = validateEmptyInputs(fullName);
    const userNameError = validateEmptyInputs(userName);
    const emailError = validateEmailInput(email);
    const passwordError = validatePasswordInput(password);
    const confirmPasswordError = validateConfirmPasswordInput(password, confirmPassword);

    if (fullNameError || userNameError || emailError || passwordError || confirmPasswordError) {
      setError({
        fullName: fullNameError,
        userName: userNameError,
        email: emailError,
        password: passwordError || '',
        confirmPassword: confirmPasswordError || '',
      });
      return true;
    }

    setError(null);
    return false;
  };

  const clearInputs = () => {
    setFullName('');
    setUserName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return {
    fullName,
    setFullName,
    userName,
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    validateInputs,
    clearInputs,
  };
};
