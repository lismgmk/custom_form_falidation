import useForm from './hooks/useForm';
import React from 'react';
import './form.scss';

export function Form() {
  const formLogin = () => {
    if (
      errors.phone === '' &&
      errors.email === '' &&
      errors.username === '' &&
      errors.date === '' &&
      errors.textArea === '' &&
      values.email !== '' &&
      values.phone !== '' &&
      values.date !== '' &&
      values.username !== '' &&
      values.textArea !== ''
    ) {
      alert('!!!!!!');
      setValues({ email: '', username: '', phone: '', date: '', textArea: '' });
    }
  };

  const { handleChange, values, errors, handleSubmit, setValues } = useForm(formLogin);

  return (
    <div className="App">
      <form onSubmit={handleSubmit} noValidate>
        <input
          autoComplete="off"
          type="text"
          value={values.username}
          name="username"
          placeholder="USERNAME SURNAME"
          onChange={handleChange}
        />
        {errors.username && <h3>{errors.username}</h3>}
        <input
          type="email"
          autoComplete={'off'}
          name="email"
          placeholder="example@mail.com"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <h3>{errors.email}</h3>}
        <input
          autoComplete={'off'}
          value={values.phone}
          type="tel"
          name="phone"
          placeholder="(123)-(456)-(7891)"
          onChange={handleChange}
        />
        {errors.phone && <h3>{errors.phone}</h3>}
        <input
          type="date"
          min="1920-01-01"
          max="2016-12-31"
          name="date-birth"
          value={values.date}
          onChange={handleChange}
        />
        {errors.date && <h3>{errors.date}</h3>}
        <textarea rows={10} cols={50} name="textarea" value={values.textArea} onChange={handleChange} />
        {errors.textArea && <h3>{errors.textArea}</h3>}
        <input type="submit" value="Submit" className="submit" />
      </form>
    </div>
  );
}
