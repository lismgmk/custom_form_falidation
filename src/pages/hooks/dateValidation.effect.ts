import { useState } from 'react';
import { minAge } from '../../constants/settingsForm';

export const useDateValidation = () => {
  const maxValidDate = new Date();
  maxValidDate.setFullYear(maxValidDate.getFullYear() - minAge);

  const [date, setDate] = useState<string>('');

  const [errorDate, setErrorDate] = useState<string>('');
  const countDate = (value: string) => {
    if (value === '') {
      setErrorDate(`Выберите валидую дату, ( не ранее ${maxValidDate.getFullYear()}/${maxValidDate.getMonth()})`);
    } else {
      if (new Date(value).valueOf() > maxValidDate.valueOf()) {
        setErrorDate(`Выберите валидую дату, ( не ранее ${maxValidDate.getFullYear()}/${maxValidDate.getMonth()})`);
      } else {
        setErrorDate('');
      }
    }
    setDate(value);
  };
  return {
    date,
    errorDate,
    countDate,
  };
};
