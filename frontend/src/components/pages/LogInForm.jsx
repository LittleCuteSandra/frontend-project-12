import { Formik, Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logInImage from '../../../public/logIn.jpg';

const LogInForm = () => {
  return (
    <div className='container-fluid h-100'>
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={logInImage} className="rounded-circle" alt="Войти" />
              </div>
              <Formik 
                initialValues={{ username: '', password: '' }}
                onSubmit={(values, actions) => {
                  /*setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                  }, 1000);*/
                }}
              >
                {() => (
                  <Form className="col-12 col-md-6 mt-3 mt-md-0">
                    <h1 className="text-center mb-4">Войти</h1>
                    <div className="form-floating mb-3">
                      <label htmlFor="username">Ваш ник</label>
                      <Field
                        type="password"
                        name="username"
                        autoComplete="username"
                        className="form-control"
                        required=""
                        placeholder="Ваш ник"
                        id="username"
                        value=""
                      />
                    </div>
                    <div className="form-floating mb-4">
                      <label className="form-label" htmlFor="password">Пароль</label>
                      <Field
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        className="form-control"
                        required=""
                        placeholder="Пароль"
                        id="password"
                        value=""
                      />
                    </div>
                    <Button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</Button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
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
