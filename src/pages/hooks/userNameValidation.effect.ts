import { useState } from 'react';
import { maxLengthWorld, minLengthWorld } from '../../constants/settingsForm';

type TypeHelperObj = { errorNameMin: string; errorNameMax: string; errorSurNameMin: string; errorSurNameMax: string };
export const useUserNameValidation = () => {
  const [userNameSurName, setUserNameSurName] = useState<string>('');
  const [errorName, setErrorName] = useState<string>('');

  const helperObj: TypeHelperObj = { errorNameMin: '', errorNameMax: '', errorSurNameMin: '', errorSurNameMax: '' };

  const countUserName = (value: string) => {
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
      if (firstPart.length <= minLengthWorld && secondPart.length <= minLengthWorld + 1) {
        helperObj.errorNameMin = `Увеличьте количество символов в имени до ${minLengthWorld} `;
        helperObj.errorSurNameMin = `Увеличьте количество символов в фамилии до ${minLengthWorld}`;
      }

      if (firstPart.length <= minLengthWorld && secondPart.length >= minLengthWorld + 1) {
        helperObj.errorNameMin = `Увеличьте количество символов в имени до ${minLengthWorld} `;
      }
      if (firstPart.length >= minLengthWorld && secondPart.length <= minLengthWorld + 1) {
        helperObj.errorSurNameMin = `Увеличьте количество символов в фамилии до ${minLengthWorld}`;
      }

      if (firstPart.length >= maxLengthWorld && secondPart.length >= maxLengthWorld + 1) {
        helperObj.errorNameMax = `Уменьшите количество символов в имени до ${maxLengthWorld} `;
        helperObj.errorSurNameMax = `Уменьшите количество символов в фамилии до ${maxLengthWorld}`;
      }

      if (firstPart.length >= maxLengthWorld && secondPart.length <= maxLengthWorld + 1) {
        helperObj.errorNameMax = `Уменьшите количество символов в имени до ${maxLengthWorld} `;
      }
      if (firstPart.length <= maxLengthWorld && secondPart.length >= maxLengthWorld + 1) {
        helperObj.errorSurNameMax = `Уменьшите количество символов в фамилии до ${maxLengthWorld}`;
      }
      if (secondPart.length >= minLengthWorld + 1 && secondPart.length <= maxLengthWorld + 1) {
        helperObj.errorSurNameMax = '';
        helperObj.errorSurNameMin = '';
      }
      if (firstPart.length >= minLengthWorld && firstPart.length <= maxLengthWorld) {
        helperObj.errorNameMin = '';
        helperObj.errorNameMax = '';
      }
      setErrorName(Object.values(helperObj).join('').trim());
      const result = firstPart.concat(secondPart).join('').toUpperCase();
      setUserNameSurName(result);
    }
  };

  return {
    userNameSurName,
    errorName,
    countUserName,
  };
};
