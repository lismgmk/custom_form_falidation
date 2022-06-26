import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useUserNameValidation } from './userNameValidation.effect';
import { useEmailValidation } from './emailValidation.effect';
import { usePhoneValidation } from './phoneValidation.effect';
import { useDateValidation } from './dateValidation.effect';
import { useTextAreaValidation } from './textAreaValidation.effect';

export interface IFields {
  email: string;
  username: string;
  phone: string;
  date: string;
  textArea: string;
}

const useForm = (callback: () => void) => {
  const initialState: IFields = { email: '', username: '', phone: '', date: '', textArea: '' };
  const { userNameSurName, errorName, countUserName } = useUserNameValidation();
  const { email, errorEmail, countEmail } = useEmailValidation();
  const { phone, errorPhone, countPhone } = usePhoneValidation();
  const { date, errorDate, countDate } = useDateValidation();
  const { textArea, errorTextArea, countTextArea } = useTextAreaValidation();
  const [values, setValues] = useState<IFields>(initialState);
  const [errors, setErrors] = useState<IFields>(initialState);

  useEffect(() => {
    setErrors({
      email: errorEmail,
      username: errorName,
      phone: errorPhone,
      date: errorDate,
      textArea: errorTextArea,
    });
  }, [errorName, errorEmail, errorPhone, errorDate, errorTextArea]);

  useEffect(() => {
    setValues({
      email,
      username: userNameSurName,
      phone,
      date,
      textArea,
    });
  }, [userNameSurName, email, phone, date, textArea]);

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
      case 'date-birth':
        countDate(value);
        break;
      case 'textarea':
        countTextArea(value);
        break;
      default:
        break;
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    event.persist();

    let name = event.target.name;
    let val = event.target.value;

    validateValues(name, val);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();
    countUserName(values.username);
    countEmail(values.email);
    countPhone(values.phone);
    countDate(values.date);
    countTextArea(values.textArea);
    callback();
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues,
  };
};

export default useForm;
