import * as Yup from 'yup';

const validationFormSchema = Yup.object().shape({
  username: Yup.string().required('Обязательное поле').min(3, 'Минимум 3 буквы').max(20, 'Максимум 20 букв'),
  password: Yup.string().required('Обязательное поле').min(6, 'Минимум 6 символов'),
  confirmPassword: Yup.string().required('Обязательное поле').oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
});

export default validationFormSchema;
