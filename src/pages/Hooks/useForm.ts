import { ChangeEvent, useState } from 'react';

export interface IFields {
  email: string;
  username: string;
  password: string;
}

const useForm = (callback: () => void) => {
  const initialState: IFields = { email: '', username: '', password: '' };

  const [values, setValues] = useState<IFields>(initialState);
  const [errors, setErrors] = useState<IFields>(initialState);

  const validateErrors = (name: string, value: string) => {
    switch (name) {
      case 'username':
        if (value.length <= 4) {
          setErrors({
            ...errors,
            username: 'Username atleast have 5 letters',
          });
        } else {
          setErrors({ ...errors, username: '' });
        }
        break;

      case 'email':
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          ).test(value)
        ) {
          setErrors({
            ...errors,
            email: 'Enter a valid email address',
          });
        } else {
          setErrors({ ...errors, email: '' });
        }
        break;

      case 'password':
        if (!new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)) {
          setErrors({
            ...errors,
            password: 'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers',
          });
        } else {
          setErrors({ ...errors, password: '' });
        }
        break;

      default:
        break;
    }
  };
  const validateValues = (name: string, value: string) => {
    switch (name) {
      case 'username':
        if (value.length <= 4) {
          setErrors({
            ...errors,
            username: 'Username atleast have 5 letters',
          });
        } else {
          setErrors({ ...errors, username: '' });
        }
        break;

      case 'email':
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          ).test(value)
        ) {
          setErrors({
            ...errors,
            email: 'Enter a valid email address',
          });
        } else {
          setErrors({ ...errors, email: '' });
        }
        break;

      case 'password':
        if (!new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)) {
          setErrors({
            ...errors,
            password: 'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers',
          });
        } else {
          setErrors({ ...errors, password: '' });
        }
        break;

      default:
        break;
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();

    let name = event.target.name;
    let val = event.target.value;

    validateErrors(name, val);
    validateValues(name, val);

    setValues({
      ...values,
      [name]: val,
    });
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
