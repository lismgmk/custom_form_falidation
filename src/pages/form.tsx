import useForm, { IFields } from './hooks/useForm';
import React, { useEffect, useState } from 'react';
import './form.scss';

export function Form() {
  const [load, setLoad] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, [show]);
  function finishValidate(obj: IFields, err: boolean) {
    return err ? new Set(Object.values(obj)).size === 1 : new Set(Object.values(obj)).size > 1;
  }
  const formLogin = async () => {
    if (finishValidate(errors, true) && finishValidate(values, false)) {
      try {
        setLoad(true);
        const response = await fetch('https://simple-express-inc.herokuapp.com/form', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        setShow(true);
        if (!response.ok) {
          const errorMessage = await response.text().then((e) => JSON.parse(e));
          setResponseMessage(`Код ответа ${response.status} ${errorMessage.message}`);
        }
        const responseText = await response.text();
        const messageRes = JSON.parse(responseText);
        setResponseMessage(`Код ответа ${response.status} ${messageRes.message}`);
        setValues({ email: '', username: '', phone: '', date: '', textArea: '' });
      } catch (ex) {
        console.error('POST error!');
      } finally {
        setLoad(false);
      }
    }
  };

  const { handleChange, values, errors, handleSubmit, setValues } = useForm(formLogin);

  return (
    <div className={'main-container'}>
      {show && (
        <div className="modal">
          <div className="modal-content">
            <span onClick={() => setShow(false)} className="close-button">
              &times;
            </span>
            <h2>{responseMessage}</h2>
            <p>Нажмите закрыть, либо окно закроется через 3 секунды автоматически</p>
          </div>
        </div>
      )}
      <div className="container">
        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="form-control">
            <label htmlFor="username">Имя фамилия</label>
            <input
              autoComplete="off"
              type="text"
              value={values.username}
              name="username"
              placeholder="ИМЯ ФАМИЛИЯ"
              onChange={handleChange}
            />
            {errors.username && <small>{errors.username}</small>}
          </div>
          <div className="form-control">
            <label htmlFor="username">Электронная почта</label>
            <input
              type="email"
              autoComplete={'off'}
              name="email"
              placeholder="example@mail.com"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <small>{errors.email}</small>}
          </div>
          <div className="form-control">
            <label htmlFor="username">Телефон</label>
            <input
              autoComplete={'off'}
              value={values.phone}
              type="tel"
              name="phone"
              placeholder="(123)-(456)-(7891)"
              onChange={handleChange}
            />
            {errors.phone && <small>{errors.phone}</small>}
          </div>
          <div className="form-control">
            <label htmlFor="username">Дата рождения</label>
            <input
              type="date"
              min="1920-01-01"
              max="2016-12-31"
              name="date-birth"
              value={values.date}
              onChange={handleChange}
            />
            {errors.date && <small>{errors.date}</small>}
          </div>
          <div className="form-control">
            <label htmlFor="username">Сообщение</label>
            <textarea rows={5} cols={40} name="textarea" value={values.textArea} onChange={handleChange} />
            {errors.textArea && <small>{errors.textArea}</small>}
          </div>

          {load ? (
            <button>Идет отправка...</button>
          ) : (
            <button type="submit" value="Submit" className="submit">
              Отправить
            </button>
          )}
          <span>* что бы протестировать ошибку от сервера отправить номер телефона (000)-000-000</span>
        </form>
      </div>
    </div>
  );
}
