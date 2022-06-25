import { ChangeEvent, useEffect, useState } from 'react';
import { useUserNameValidation } from '../utils/userNameValidation.effect';

export interface IFields {
  email: string;
  username: string;
  phone: string;
}

const useForm = (callback: () => void) => {
  const { userNameSurName, errorSurNameMax, errorSurNameMin, errorNameMax, errorNameMin, countUserName } =
    useUserNameValidation();

  useEffect(() => {
    setValues({ ...values, username: userNameSurName });
    setErrors({ ...errors, username: `${errorSurNameMax} ${errorSurNameMin} ${errorNameMax} ${errorNameMin}` });
  }, [userNameSurName]);

  const initialState: IFields = { email: '', username: '', phone: '' };

  const [values, setValues] = useState<IFields>(initialState);
  const [errors, setErrors] = useState<IFields>(initialState);
  const validateErrors = (name: string, value: string) => {
    switch (name) {
      // case 'username':
      //   if (value.length <= 4) {
      //     setErrors({
      //       ...errors,
      //       username: 'Username atleast have 5 letters',
      //     });
      //   } else {
      //     setErrors({ ...errors, username: '' });
      //   }
      //   break;

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

      case 'phone':
        if (!new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)) {
          setErrors({
            ...errors,
            phone: 'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers',
          });
        } else {
          setErrors({ ...errors, phone: '' });
        }
        break;

      default:
        break;
    }
  };

  const validateValues = (event: any, name: string, value: string) => {
    event.persist();
    if (name === 'phone' && value.length <= 15) {
      let x: any = value.replace(/(\D)/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      setValues({
        ...values,
        phone: !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : ''),
      });
    }
    if (name === 'username') {
      countUserName(value);

      // if (value[0] !== ' ' && /^$|^[a-zA-Z\s]+$/.test(value)) {
      //   const newValue = value.replace(/ +(?= )/g, '').split('');
      //
      //   if (newValue.filter((i) => i === ' ').length > 1) {
      //     newValue.pop();
      //   }
      //   let firstPart: string[] = [];
      //   let secondPart: string[] = [];
      //   const spaceIndex = newValue.indexOf(' ');
      //
      //   if (spaceIndex !== -1) {
      //     newValue.forEach((el, index) => {
      //       if (index < spaceIndex) {
      //         firstPart.push(el);
      //       } else {
      //         secondPart.push(el);
      //       }
      //     });
      //   } else {
      //     value.split('').forEach((el) => firstPart.push(el));
      //   }
      //
      //   if (firstPart.length < 3 && secondPart.length < 4) {
      //     setErrors({
      //       ...errors,
      //       // username: 'min limit name !!! and min limit surname',
      //       username: 'min limit name ',
      //       userSurname: 'and min limit surname',
      //     });
      //   }
      //
      //   if (firstPart.length < 3 && secondPart.length > 4) {
      //     setErrors({
      //       ...errors,
      //       username: 'min limit name !!!',
      //     });
      //   }
      //   if (firstPart.length > 3 && secondPart.length < 4) {
      //     setErrors({
      //       ...errors,
      //       // username: 'min limit surname !!!',
      //       userSurname: 'min limit surname !!!',
      //     });
      //   }
      //
      //   if (firstPart.length > 30 && secondPart.length > 31) {
      //     setErrors({
      //       ...errors,
      //       // username: 'max limit name !!! and max limit surname',
      //       username: 'max limit name ',
      //       userSurname: 'max limit surname',
      //     });
      //   }
      //
      //   if (firstPart.length > 30 && secondPart.length < 31) {
      //     setErrors({
      //       ...errors,
      //       username: 'max limit name !!!',
      //     });
      //   }
      //   if (firstPart.length < 30 && secondPart.length > 31) {
      //     setErrors({
      //       ...errors,
      //       // username: 'max limit surname !!!',
      //       userSurname: 'max limit surname !!!',
      //     });
      //   }
      //
      //   if (firstPart.length > 3 && secondPart.length > 4 && firstPart.length < 30 && secondPart.length < 31) {
      //     setErrors({
      //       ...errors,
      //       username: '',
      //       userSurname: '',
      //     });
      //   }
      //   if (secondPart.length > 4 && secondPart.length < 31) {
      //     setErrors({
      //       ...errors,
      //       userSurname: '',
      //     });
      //   }
      //   if (firstPart.length > 3 && firstPart.length < 30) {
      //     setErrors({
      //       ...errors,
      //       username: '',
      //     });
      //   }
      //   const result = firstPart.concat(secondPart).join('').toUpperCase();
      //   setValues({
      //     ...values,
      //     username: result,
      //   });
      // }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    event.preventDefault();

    event.target.focus();
    let name = event.target.name;
    let val = event.target.value;

    validateErrors(name, val);
    validateValues(event, name, val);
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
