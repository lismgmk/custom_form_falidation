import { ChangeEvent, useState } from 'react';

export interface IFields {
  email: string;
  username: string;
  phone: string;
}

const useForm = (callback: () => void) => {
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
      // const specialChars = /[а-яА-Я][`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (value[0] !== ' ' && /^[a-zA-Z\s]+$/.test(value)) {
        const newValue2 = value
          .replace(/ +(?= )/g, '')
          .split('')
          .join('');

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

        if (firstPart.length < 3 && secondPart.length < 4) {
          setErrors({
            ...errors,
            username: 'name !!! and surname',
          });
        }

        if (firstPart.length < 3 && secondPart.length > 4) {
          setErrors({
            ...errors,
            username: 'name !!!',
          });
        }
        if (firstPart.length > 3 && secondPart.length < 4) {
          setErrors({
            ...errors,
            username: 'surname !!!',
          });
        }
        if (firstPart.length > 3 && secondPart.length > 4) {
          setErrors({
            ...errors,
            username: '',
          });
        }

        const result = firstPart.concat(secondPart).join('').toUpperCase();
        setValues({
          ...values,
          username: result,
        });
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();

    let name = event.target.name;
    let val = event.target.value;

    validateErrors(name, val);
    validateValues(event, name, val);

    // setValues({
    //   ...values,
    //   [name]: val,
    // });
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
