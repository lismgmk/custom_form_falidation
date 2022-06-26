import { useState } from 'react';

export const useTextAreaValidation = () => {
  const minLength: number = 10;
  const maxLength: number = 300;

  const [textArea, setTextArea] = useState<string>('');

  const [errorTextArea, setErrorTextArea] = useState<string>('');

  const countTextArea = (value: string) => {
    if (value.trim().length <= minLength) {
      setErrorTextArea(`Enter ${minLength} and more symbols`);
    }
    if (value === '') {
      setErrorTextArea(`Enter  more then ${minLength} and less ${maxLength} then  symbols`);
    }
    if (value.trim().length >= maxLength) {
      setErrorTextArea(`Enter less then ${maxLength} symbols`);
    }
    if (value.trim().length >= minLength && value.trim().length <= maxLength) {
      setErrorTextArea('');
    }
    setTextArea(value);
  };
  return {
    textArea,
    errorTextArea,
    countTextArea,
  };
};
