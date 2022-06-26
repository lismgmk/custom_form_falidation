import { ChangeEvent, useEffect, useState } from 'react';
import { useUserNameValidation } from './userNameValidation.effect';
import { useEmailValidation } from './emailValidation.effect';
import { usePhoneValidation } from './phoneValidation.effect';

export interface IFields {
  email: string;
  username: string;
  phone: string;
}

const useForm = (callback: () => void) => {
  const { userNameSurName, errorSurNameMax, errorSurNameMin, errorNameMax, errorNameMin, countUserName } =
    useUserNameValidation();
  const { email, errorEmail, countEmail } = useEmailValidation();
  const { phone, errorPhone, countPhone } = usePhoneValidation();

  useEffect(() => {
    setValues({ ...values, username: userNameSurName });
    setErrors({ ...errors, username: `${errorSurNameMax} ${errorSurNameMin} ${errorNameMax} ${errorNameMin}` });
  }, [userNameSurName]);

  useEffect(() => {
    setValues({ ...values, email: email });
    setErrors({ ...errors, email: errorEmail });
  }, [email]);

  useEffect(() => {
    setValues({ ...values, phone: phone });
    setErrors({ ...errors, phone: errorPhone });
  }, [phone]);

  const initialState: IFields = { email: '', username: '', phone: '' };

  const [values, setValues] = useState<IFields>(initialState);
  const [errors, setErrors] = useState<IFields>(initialState);

  const validateValues = (name: string, value: string) => {
    switch (name) {
      case 'username':
        countUserName(value);
        break;
      case 'email':
        countEmail(value);
        break;
      case 'phone':
        countPhone(value);
        break;
      default:
        break;
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();

    let name = event.target.name;
    let val = event.target.value;

    validateValues(name, val);
  };

  const handleSubmit = (event: any) => {
    if (event) event.preventDefault();

    if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
      callback();
    } else {
      alert('There is an Error!');
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
