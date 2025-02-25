import * as Yup from 'yup';

const channelValidationSchema = (t, channels) => Yup.object().shape({
  name: Yup.string().required(t('validation.requiredField'))
    .min(3, t('validation.minThree'))
    .max(20, t('validation.maxTwenty'))
    .notOneOf(channels, t('validation.uniqueName')),
});

export default channelValidationSchema;
