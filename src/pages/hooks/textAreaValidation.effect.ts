import { useState } from 'react';
import { maxLengthTextArea, minLengthTextArea } from '../../constants/settingsForm';

export const useTextAreaValidation = () => {
  const [textArea, setTextArea] = useState<string>('');

  const [errorTextArea, setErrorTextArea] = useState<string>('');

  const countTextArea = (value: string) => {
    if (value.trim().length <= minLengthTextArea) {
      setErrorTextArea(`Увеличьте количество символов до ${minLengthTextArea} `);
    }
    if (value === '') {
      setErrorTextArea(`Введите от ${minLengthTextArea} до ${maxLengthTextArea} символов `);
    }
    if (value.trim().length >= maxLengthTextArea) {
      setErrorTextArea(`Уменьшите количество символов до ${maxLengthTextArea}`);
    }
    if (value.trim().length >= minLengthTextArea && value.trim().length <= maxLengthTextArea) {
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
