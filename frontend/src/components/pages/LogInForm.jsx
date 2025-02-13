import { useState } from "react";
import { Formik, useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { FloatingLabel, Form } from 'react-bootstrap';
import logInImage from '../../../public/logIn.jpg';
import routes from '../../utils/routes.js';
import { useLogInUserMutation } from '../../services/authorizationApi.js';
import useAuth from '../../hooks/useAuth.js';

const LogInForm = () => {
  const navigate = useNavigate();
  const [submitError, setsubmitError] = useState('');
  const [buttonStatus, setButtonStatus] = useState('');
  const [logInUser, { isLoading }] = useLogInUserMutation();
  //const { logIn } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ username, password }) => {
      try {
        setsubmitError(false);
        setButtonStatus('disabled');
        const response = await logInUser({ username, password });
        // кастыльно! переделать
        if (Object.hasOwn(response, 'error')) {
          if (response.error.status === 401) setsubmitError(true);
        } else {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', username);
          navigate(routes.homePage());
        }
      } catch (err) {
        //if (err.status === 401) {
          //console.log('err.status in = ', err.status, typeof err.status);
          //setsubmitError(true);
        //}
        console.log(err);
      } finally {
        setButtonStatus('');
      }
    },
  });

  return (
    <div className='container-fluid h-100'>
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={logInImage} className="rounded-circle" alt="Войти" />
              </div>
              <Formik>
                <Form className='col-12 col-md-6 mt-3 mt-mb-0' onSubmit={formik.handleSubmit}>
                  <h1 className='text-center mb-4'>Войти</h1>
                  <FloatingLabel className="mb-4" controlId="username" label="Ваш ник">
                    <Form.Control
                      name="username"
                      type="username"
                      className="w-100"
                      required
                      isInvalid={submitError}
                      value={formik.values.username}
                      onChange={formik.handleChange}
                    />
                  </FloatingLabel>
                  <FloatingLabel className="mb-4" controlId="password" label="Пароль">
                    <Form.Control
                      type="password"
                      name="password"
                      className="w-100"
                      required
                      isInvalid={submitError}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        {submitError ? 'Неверные имя пользователя или пароль' : ''}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <button type="submit" className={`w-100 btn btn-outline-primary ${buttonStatus}`}>Войти</button>
                </Form>
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

/*<Button
  variant="primary"
  type="submit"
  disabled={isLoading}
  className="w-100 border-primary bg-white text-primary"
>Войти</Button>*/