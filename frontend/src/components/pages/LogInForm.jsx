import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import logInImage from '../../../public/logIn.jpg';

const LogInForm = () => {
  const navigate = useNavigate();

  const submitForm = async ({ username, password }, { setSubmitting }) => {
    try {
      setSubmitting(true);
      const response = await axios.post('/api/v1/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      navigate('/');
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
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
                {(errors, touched) => (
                  <Form className="col-12 col-md-6 mt-3 mt-md-0">
                    <h1 className="text-center mb-4">Войти</h1>
                    <div className="form-floating mb-3">
                      <Field
                        name="username"
                        type="username"
                        autoComplete="username"
                        className={`form-control ${
                          errors.username && touched.username ? 'is-invalid' : ''
                        }`}
                        required
                        placeholder="Ваш ник"
                        id="username"
                      />
                      <label htmlFor="username">Ваш ник</label>
                      <ErrorMessage
                        component="div"
                        name="username"
                        className="invalid-feedback"
                        value={errors.username}
                      />
                    </div>
                    <div className="form-floating mb-4">
                      <Field
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        className={`form-control ${
                          errors.password && touched.password ? 'is-invalid' : ''
                        }`}
                        required
                        placeholder="Пароль"
                        id="password"
                      />
                      <label className="form-label" htmlFor="password">Пароль</label>
                      <ErrorMessage
                        component="div"
                        name="password"
                        className="invalid-feedback"
                        value={errors.password}
                      />
                    </div>
                    <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
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
