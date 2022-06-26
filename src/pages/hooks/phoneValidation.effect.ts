import { useState } from 'react';

export const usePhoneValidation = () => {
  const [phone, setPhone] = useState<string>('');

  const [errorPhone, setErrorPhone] = useState<string>('');

  const countPhone = (value: string) => {
    if (value.length <= 15) {
      let x: any = value.replace(/(\D)/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      setPhone(!x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : ''));
    }
    if (value.length < 15) {
      setErrorPhone('Enter valid phone');
    }
    if (value.length === 14) {
      setErrorPhone('');
    }
  };
  return {
    phone,
    errorPhone,
    countPhone,
  };
};
