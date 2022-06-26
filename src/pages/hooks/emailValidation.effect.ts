import { useState } from 'react';

export const useEmailValidation = () => {
  const [email, setEmail] = useState<string>('');

  const [errorEmail, setErrorEmail] = useState<string>('');

  const countEmail = (value: string) => {
    if (
      !new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ).test(value)
    ) {
      setErrorEmail('Enter a valid email address');
    } else {
      setErrorEmail('');
    }
    setEmail(value);
  };

  return {
    email,
    errorEmail,
    countEmail,
  };
};
