import { useState } from "react";
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import logInImage from '../../../public/logIn.jpg';

const LogInForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [buttonStatus, setStatus] = useState('');

  const submitForm = async ({ username, password }, { setSubmitting }) => {
    try {
      setSubmitting(true);
      setStatus('disabled');
      const response = await axios.post('/api/v1/login', { username, password });
      console.log(response, ' = response');
      const { token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      navigate('/');
    } catch (err) {
      setError(err.response.status);
    } finally {
      setStatus('');
      setSubmitting(false);
    }
  };

  return (
    <div className='container-fluid h-100'>
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            {!error
              ? null
              : <>
                {error === 401
                  ? <div className="error-message">Неверные имя пользователя или пароль</div>
                  : <div className="invalid-tooltip">Неизвестная ошибка</div>
                }
              </>
            }
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={logInImage} className="rounded-circle" alt="Войти" />
              </div>
              <Formik initialValues={{ username: '', password: '' }} onSubmit={submitForm}>
                {() => (
                  <Form className="col-12 col-md-6 mt-3 mt-md-0">
                    <h1 className="text-center mb-4">Войти</h1>
                    <div className="form-floating mb-3">
                      <Field
                        name="username"
                        type="username"
                        autoComplete="username"
                        className={`form-control ${error ? 'is-invalid' : ''}`}
                        required
                        placeholder="Ваш ник"
                        id="username"
                      />
                      <label htmlFor="username">Ваш ник</label>
                    </div>
                    <div className="form-floating mb-4">
                      <Field
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        className={`form-control ${error ? 'is-invalid' : ''}`}
                        required
                        placeholder="Пароль"
                        id="password"
                      />
                      <label className="form-label" htmlFor="password">Пароль</label>
                    </div>
                    <div>
                      {/*!error ? null : { error === 401 ? (<div className="invalid-tooltip">Неверные имя пользователя или пароль</div>) : }*/}

                    </div>
                    <button type="submit" className={`w-100 btn btn-outline-primary ${buttonStatus}`}>Войти</button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <Link to="/signup">Регистрация</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;
