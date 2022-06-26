import { ChangeEvent, useEffect, useState } from 'react';
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
  const { userNameSurName, errorSurNameMax, errorSurNameMin, errorNameMax, errorNameMin, countUserName } =
    useUserNameValidation();
  const { email, errorEmail, countEmail } = useEmailValidation();
  const { phone, errorPhone, countPhone } = usePhoneValidation();
  const { date, errorDate, countDate } = useDateValidation();
  const { textArea, errorTextArea, countTextArea } = useTextAreaValidation();

  useEffect(() => {
    setValues({ ...values, username: userNameSurName });
    setErrors({ ...errors, username: `${errorSurNameMax} ${errorSurNameMin} ${errorNameMax} ${errorNameMin}` });
  }, [userNameSurName]);

  useEffect(() => {
    setValues({ ...values, email });
    setErrors({ ...errors, email: errorEmail });
  }, [email]);

  useEffect(() => {
    setValues({ ...values, phone });
    setErrors({ ...errors, phone: errorPhone });
  }, [phone]);

  useEffect(() => {
    setValues({ ...values, date });
    setErrors({ ...errors, date: errorDate });
  }, [date]);

  useEffect(() => {
    setValues({ ...values, textArea });
    setErrors({ ...errors, textArea: errorTextArea });
  }, [textArea]);

  const initialState: IFields = { email: '', username: '', phone: '', date: '', textArea: '' };

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
