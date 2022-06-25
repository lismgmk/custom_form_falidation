import useForm from './Hooks/useForm';
import React from 'react';
import './app.scss';
import InputMask from './Hooks/inputMusk';

export function Form() {
  const formLogin = () => {
    console.log('Callback function when form is submitted!');
    console.log('Form Values ', values);
  };

  const { handleChange, values, errors, handleSubmit } = useForm(formLogin);

  return (
    <div className="App">
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          // autocomplete="off"
          name="email"
          placeholder="E-mail"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <h3>{errors.email}</h3>}
        <input minLength={8} type="password" name="password" placeholder="password" onChange={handleChange} />
        {errors.password && <h3>{errors.password}</h3>}
        <input
          type="text"
          minLength={5}
          value={values.username.toUpperCase()}
          required
          name="username"
          placeholder="username"
          onChange={handleChange}
        />
        {errors.username && <h3>{errors.username}</h3>}
        <input type="submit" value="Submit" className="submit" />
      </form>
      <InputMask />
    </div>
  );
}
