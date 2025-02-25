import { useState, useRef, useEffect } from "react";
import { Formik, Field } from 'formik';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSignUpUserMutation } from '../../services/authorizationApi.js';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth.js';
import routes from '../../utils/routes.js';
import validationFormSchema from '../../utils/formValidation.js';
import registrationImage from '../../../public/registration.png';

const SignUpForm = () => {

  const navigate = useNavigate();
  const [serverError, setServerError] = useState(false);
  const [authorizError, setAuthorizError] = useState(false);
  const [buttonStatus, setButtonStatus] = useState('');
  const [signUpUser] = useSignUpUserMutation();
  const { makeUserLoggedIn } = useAuth();
  const { t } = useTranslation();
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const submitForm = async (userData) => {
    setAuthorizError(false);
    setServerError(false);
    setButtonStatus('disabled');
    const response = await signUpUser(userData);
    if (Object.hasOwn(response, 'error')) {
      if (response.error.status === 409) {
        setAuthorizError(true);
      } else {
        setServerError(true);
      }
    } else {
      makeUserLoggedIn(response.data);
      navigate(routes.homePage());
    }
    setButtonStatus('');
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={registrationImage} className="rounded-circle" alt="Регистрация" />
              </div>
              <Formik initialValues={{ username: '', password: '', confirmPassword: '' }} validationSchema={validationFormSchema(t)} onSubmit={submitForm}>
                {({ handleSubmit, errors, touched }) => (
                  <Form className="w-50" onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">{t('auth.regist')}</h1>
                    <FloatingLabel className="mb-3" controlId="username" label={t('auth.userName')}>
                      <Field
                        id="username"
                        type="text"
                        name="username"
                        className={`form-control ${errors.username && touched.username || authorizError || serverError ? 'is-invalid' : ''}`}
                        placeholder={t('auth.userName')}
                        autoComplete="username"
                        innerRef={inputEl}
                      />
                      {errors.username && touched.username && (<div className="invalid-feedback">{errors.username}</div>)}
                    </FloatingLabel>
                    <FloatingLabel className="mb-3" controlId="passwor" label={t('auth.password')}>
                      <Field
                        id="password"
                        type="password"
                        name="password"
                        className={`form-control ${errors.password && touched.password || authorizError || serverError ? 'is-invalid' : ''}`}
                        placeholder={t('auth.password')}
                        autoComplete="new-password"
                      />
                      {errors.password && touched.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </FloatingLabel>
                    <FloatingLabel className="mb-3" controlId="confirmPassword" label={t('auth.repeatPassword')}>
                      <Field
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        className={`form-control ${errors.confirmPassword && touched.confirmPassword || authorizError || serverError ? 'is-invalid' : ''}`}
                        placeholder={t('auth.repeatPassword')}
                        autoComplete="new-password"
                      />
                      {errors.confirmPassword && touched.confirmPassword && (<div className="invalid-feedback">{errors.confirmPassword}</div>)}
                      {authorizError && (<div className="invalid-tooltip">{t('auth.sameUser')}</div>)}
                      {serverError && (<div className="invalid-tooltip">{t('auth.serverError')}</div>)}
                    </FloatingLabel>
                    <button type="submit" className={`w-100 btn btn-outline-primary ${buttonStatus}`}>{t('auth.signup')}</button>
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
