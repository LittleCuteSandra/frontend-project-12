import { useState, useRef, useEffect } from "react";
import { Formik, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { FloatingLabel, Form } from 'react-bootstrap';
import logInImage from '../../../public/logIn.jpg';
import routes from '../../utils/routes.js';
import { useLogInUserMutation } from '../../services/authorizationApi.js';
import useAuth from '../../hooks/useAuth.js';

const LogInForm = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(false);
  const [authorizError, setAuthorizError] = useState(false);
  const [buttonStatus, setButtonStatus] = useState('');
  const [logInUser] = useLogInUserMutation();
  const { logIn } = useAuth();
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const submitForm = async (userData) => {
    setAuthorizError(false);
    setServerError(false);
    setButtonStatus('disabled');
    const response = await logInUser(userData);
    if (Object.hasOwn(response, 'error')) {
      if (response.error.status === 401) {
        setAuthorizError(true);
      } else {
        setServerError(true);
      }
    } else {
      logIn(response.data);
      navigate(routes.homePage());
    }
    setButtonStatus('');
  };

  return (
    <div className='container-fluid h-100'>
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={logInImage} className="rounded-circle" alt="Войти" />
              </div>
              <Formik initialValues={{ username: '', password: '' }} onSubmit={submitForm}>
                {({ handleSubmit }) => (
                  <Form className="w-50" onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">Войти</h1>
                    <FloatingLabel className="mb-3" controlId="username" label="Имя пользователя">
                      <Field
                        id="username"
                        type="text"
                        name="username"
                        className={`form-control ${authorizError || serverError ? 'is-invalid' : ''}`}
                        placeholder="Имя пользователя"
                        autoComplete="username"
                        innerRef={inputEl}
                      />
                    </FloatingLabel>
                    <FloatingLabel className="mb-3" controlId="passwor" label="Пароль">
                      <Field
                        id="password"
                        type="password"
                        name="password"
                        className={`form-control ${authorizError || serverError ? 'is-invalid' : ''}`}
                        placeholder="Пароль"
                        autoComplete="new-password"
                      />
                      {authorizError && (<div className="invalid-tooltip">Неверные имя пользователя или пароль</div>)}
                      {serverError && (<div className="invalid-tooltip">Ошибка сервера</div>)}
                    </FloatingLabel>
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
