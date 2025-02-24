import * as Yup from 'yup';

const channelValidationSchema = (channels) => Yup.object().shape({
  name: Yup.string().required('Обязательное поле')
  .min(3, 'Минимум 3 буквы')
  .max(20, 'Максимум 20 букв')
  .notOneOf(channels, 'Названия каналов должны быть уникальными'),
});

/*export const newChannelSchema = (t, channels) => yup.object().shape({
  body: yup.string().required(t('valid.required'))
    .min(3, t('valid.minmax'))
    .max(20, t('valid.minmax'))
    .notOneOf(channels, t('valid.unique')),
});*/

export default channelValidationSchema;
