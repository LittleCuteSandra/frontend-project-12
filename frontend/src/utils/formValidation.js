import * as Yup from 'yup';

const validationFormSchema = (t) => Yup.object().shape({
  username: Yup.string().required(t('validation.requiredField')).min(3, t('validation.minThree')).max(20, t('validation.maxTwenty')),
  password: Yup.string().required(t('validation.requiredField')).min(6, t('validation.minSix')),
  confirmPassword: Yup.string().required(t('validation.requiredField')).oneOf([Yup.ref('password'), null], t('validation.samePassword')),
});

export default validationFormSchema;
