import { useState } from 'react';

export const useDateValidation = () => {
  const minAge: number = 7;
  const maxValidDate = new Date();
  maxValidDate.setFullYear(maxValidDate.getFullYear() - minAge);

  const [date, setDate] = useState<string>('');

  const [errorDate, setErrorDate] = useState<string>('');
  const countDate = (value: string) => {
    if (value === '') {
      setErrorDate('Enter valid Date less then 2015');
    } else {
      if (new Date(value).valueOf() > maxValidDate.valueOf()) {
        setErrorDate('Enter valid Date less then 2015');
      } else {
        setErrorDate('');
      }
      setDate(value);
    }
  };
  return {
    date,
    errorDate,
    countDate,
  };
};
