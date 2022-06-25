import { useState } from 'react';

export const useUserNameValidation = () => {
  const [userNameSurName, setUserNameSurName] = useState<string>('');

  const [errorNameMin, setErrorNameMin] = useState<string>('');
  const [errorNameMax, setErrorNameMax] = useState<string>('');

  const [errorSurNameMin, setErrorSurNameMin] = useState<string>('');
  const [errorSurNameMax, setErrorSurNameMax] = useState<string>('');

  const countUserName = (value: string) => {
    console.log(value, 'value!!!!!!!');
    if (/^$|^[a-zA-Z\s]+$/.test(value)) {
      const newValue = value.replace(/ +(?= )/g, '').split('');

      if (newValue.filter((i) => i === ' ').length > 1) {
        newValue.pop();
      }
      let firstPart: string[] = [];
      let secondPart: string[] = [];
      const spaceIndex = newValue.indexOf(' ');

      if (spaceIndex !== -1) {
        newValue.forEach((el, index) => {
          if (index < spaceIndex) {
            firstPart.push(el);
          } else {
            secondPart.push(el);
          }
        });
      } else {
        value.split('').forEach((el) => firstPart.push(el));
      }

      if (firstPart.length < 3 && secondPart.length < 4) {
        setErrorNameMin('min limit name ');
        setErrorSurNameMin('and min limit surname');
      }

      if (firstPart.length < 3 && secondPart.length > 4) {
        setErrorNameMin('min limit name ');
      }
      if (firstPart.length > 3 && secondPart.length < 4) {
        setErrorSurNameMin('and min limit surname');
      }

      if (firstPart.length > 30 && secondPart.length > 31) {
        setErrorNameMax('max limit name ');
        setErrorSurNameMax('max limit surname');
      }

      if (firstPart.length > 30 && secondPart.length < 31) {
        setErrorNameMax('max limit name ');
      }
      if (firstPart.length < 30 && secondPart.length > 31) {
        setErrorSurNameMax('max limit surname');
      }

      if (firstPart.length > 3 && secondPart.length > 4 && firstPart.length < 30 && secondPart.length < 31) {
        setErrorNameMax('');
        setErrorSurNameMax('');
        setErrorNameMin('');
        setErrorSurNameMin('');
      }
      if (secondPart.length > 4 && secondPart.length < 31) {
        setErrorSurNameMax('');
        setErrorSurNameMin('');
      }
      if (firstPart.length > 3 && firstPart.length < 30) {
        setErrorNameMax('');
        setErrorNameMin('');
      }
      const result = firstPart.concat(secondPart).join('').toUpperCase();
      setUserNameSurName(result);
    }
  };

  return {
    userNameSurName,
    errorSurNameMax,
    errorSurNameMin,
    errorNameMax,
    errorNameMin,
    countUserName,
  };
};
