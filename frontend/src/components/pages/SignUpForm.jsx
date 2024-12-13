import { Formik, Form, Field } from 'formik';
import registrationImage from '../../../public/registration.png';

const submitForm = (values, { setSubmitting }) => {
  console.log(values);
  setSubmitting(false);
};

const SignUpForm = () => {
  return (
    <div class="container-fluid h-100">
      <div class="row justify-content-center align-content-center h-100">
        <div class="col-12 col-md-8 col-xxl-6">
          <div class="card shadow-sm">
            <div class="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={registrationImage} class="rounded-circle" alt="Регистрация" />
              </div>
                <Formik initialValues={{ username: '', password: '', confirmPassword: '' }} onSubmit={submitForm}>
                  {(errors, touched) => (
                    <Form className="w-50">
                      <h1 class="text-center mb-4">Регистрация</h1>
                      <div class="form-floating mb-3">
                        <Field
                          name="username"
                          autoComplete="username"
                          className="form-control"
                          required=""
                          placeholder="От 3 до 20 символов"
                          id="username"
                          value=""
                        />
                        <label class="form-label" for="username">Имя пользователя</label>
                        {/*здесь обработка того, что поле должно быть заполнено <div class="invalid-tooltip">Обязательное поле</div>*/}
                      </div>
                      <div class="form-floating mb-3">
                        <Field
                          name="password"
                          autocomplete="new-password"
                          className="form-control"
                          required=""
                          placeholder="Не менее 6 символов"
                          id="password"
                          value=""
                          type="password"
                          aria-describedby="passwordHelpBlock"
                        />
                        <label class="form-label" for="password">Пароль</label>
                        {/*здесь обработка того, что поле должно быть заполнено <div class="invalid-tooltip">Обязательное поле</div>*/}
                      </div>
                      <div class="form-floating mb-4">
                        <Field
                          name="confirmPassword"
                          autocomplete="new-password"
                          className="form-control"
                          required=""
                          placeholder="Пароли должны совпадать"
                          id="confirmPassword"
                          value=""
                          type="password"
                        />
                        <label class="form-label" for="confirmPassword">Подтвердите пароль</label>
                        {/*здесь обработка того, что поле должно быть заполнено <div class="invalid-tooltip">Обязательное поле</div>*/}
                      </div>
                      <button type="submit" class="w-100 btn btn-outline-primary">Зарегистрироваться</button>
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
