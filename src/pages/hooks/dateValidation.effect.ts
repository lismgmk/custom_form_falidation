import { useState } from 'react';

export const useDateValidation = () => {
  const minAge: number = 7;
  const maxValidDate = new Date();
  maxValidDate.setFullYear(maxValidDate.getFullYear() - minAge);

  const [date, setDate] = useState<string>('');

  const [errorDate, setErrorDate] = useState<string>('');

  const countDate = (value: string) => {
    setDate(value);
    if (new Date(value).valueOf() > maxValidDate.valueOf()) {
      setErrorDate('Enter valid Date less then 2015');
    } else {
      setErrorDate('');
    }
  };
  return {
    date,
    errorDate,
    countDate,
  };
};
