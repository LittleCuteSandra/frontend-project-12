import { useState } from "react";
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
//import validationFormSchema from '../../utils/formValidation.js';
import registrationImage from '../../../public/registration.png';

const SignUpForm = () => {
  const validationFormSchema = Yup.object().shape({
    username: Yup.string().required('Обязательное поле').min(3, 'Минимум 3 буквы').max(20, 'Максимум 20 букв'),
    password: Yup.string().required('Обязательное поле').min(6, 'Минимум 6 символов'),
    confirmPassword: Yup.string().required('Обязательное поле').oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
  });

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [buttonStatus, setStatus] = useState('');

  const submitForm = async ({ username, password }, { setSubmitting }) => {
    try {
      setSubmitting(true);
      setStatus('disabled');
      const response = await axios.post('/api/v1/signup', { username, password });
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
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            {!error
              ? null
              : <>
                {error === 409
                  ? <div className="error-message">Уже авторизован</div>
                  : <div className="error-message">Неизвестная ошибка</div>
                }
              </>
            }
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={registrationImage} className="rounded-circle" alt="Регистрация" />
              </div>
              <Formik initialValues={{ username: '', password: '', confirmPassword: '' }} validationSchema={validationFormSchema} onSubmit={submitForm}>
                {({ errors, touched }) => (
                  <Form className="w-50">
                    <h1 className="text-center mb-4">Регистрация</h1>
                    <div className="form-floating mb-3">
                      <Field
                        id="username"
                        type="text"
                        name="username"
                        className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}
                        placeholder="Имя пользователя"
                        autoComplete="username"
                      />
                      <label className="form-label" htmlFor="username">Имя пользователя</label>
                      {errors.username && touched.username && (<div className="invalid-feedback">{errors.username}</div>)}
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        id="password"
                        type="password"
                        name="password"
                        className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                        placeholder="Пароль"
                        autoComplete="new-password"
                      />
                      <label className="form-label" htmlFor="password">Пароль</label>
                      {errors.password && touched.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-floating mb-4">
                      <Field
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        className={`form-control ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`}
                        placeholder="Подтвердите пароль"
                        autoComplete="new-password"
                      />
                      <label className="form-label" htmlFor="confirmPassword">Подтвердите пароль</label>
                      {errors.confirmPassword && touched.confirmPassword && (<div className="invalid-feedback">{errors.confirmPassword}</div>)}
                    </div>
                    <button type="submit" className={`w-100 btn btn-outline-primary ${buttonStatus}`}>Зарегистрироваться</button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
