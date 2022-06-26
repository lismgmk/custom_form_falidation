import { useState } from 'react';

export const useUserNameValidation = () => {
  const minLimitLength = 3;
  const maxLimitLength = 30;
  const [userNameSurName, setUserNameSurName] = useState<string>('');

  const [errorNameMin, setErrorNameMin] = useState<string>('');
  const [errorNameMax, setErrorNameMax] = useState<string>('');

  const [errorSurNameMin, setErrorSurNameMin] = useState<string>('');
  const [errorSurNameMax, setErrorSurNameMax] = useState<string>('');
  const countUserName = (value: string) => {
    if (value === '') {
      setErrorNameMin('min limit name ');
    }
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

      if (firstPart.length <= minLimitLength && secondPart.length <= minLimitLength + 1) {
        setErrorNameMin('min limit name ');
        setErrorSurNameMin('and min limit surname');
      }

      if (firstPart.length <= minLimitLength && secondPart.length >= minLimitLength + 1) {
        setErrorNameMin('min limit name ');
      }
      if (firstPart.length >= minLimitLength && secondPart.length <= minLimitLength + 1) {
        setErrorSurNameMin('and min limit surname');
      }

      if (firstPart.length >= maxLimitLength && secondPart.length >= maxLimitLength + 1) {
        setErrorNameMax('max limit name ');
        setErrorSurNameMax('max limit surname');
      }

      if (firstPart.length >= maxLimitLength && secondPart.length <= maxLimitLength + 1) {
        setErrorNameMax('max limit name ');
      }
      if (firstPart.length <= maxLimitLength && secondPart.length >= maxLimitLength + 1) {
        setErrorSurNameMax('max limit surname');
      }

      if (
        firstPart.length >= minLimitLength &&
        secondPart.length >= minLimitLength + 1 &&
        firstPart.length <= maxLimitLength &&
        secondPart.length <= maxLimitLength + 1
      ) {
        setErrorNameMax('');
        setErrorSurNameMax('');
        setErrorNameMin('');
        setErrorSurNameMin('');
      }
      if (secondPart.length >= minLimitLength + 1 && secondPart.length <= maxLimitLength + 1) {
        setErrorSurNameMax('');
        setErrorSurNameMin('');
      }
      if (firstPart.length >= minLimitLength && firstPart.length <= maxLimitLength) {
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
