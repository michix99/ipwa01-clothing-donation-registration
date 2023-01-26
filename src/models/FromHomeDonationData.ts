import * as yup from 'yup';
import { DonationData } from './DonationData';
import location from '../assets/officeLocation.json';

export const fromHomeDonationDataSchema = yup.object({
  firstName: yup.string().required(() => ({ key: 'isRequiredText' })),
  lastName: yup.string().required(() => ({ key: 'isRequiredText' })),
  street: yup.string().required(() => ({ key: 'isRequiredText' })),
  houseNumber: yup.string().required(() => ({ key: 'isRequiredText' })),
  postcode: yup
    .string()
    .required(() => ({ key: 'isRequiredText' }))
    .matches(/^([0-9]{5})$/, () => ({ key: 'postcodeInvalid' }))
    .test(
      'is-nearby',
      () => ({ key: 'addressInvalid' }),
      (value) =>
        value ? value.startsWith(location.postcode.slice(0, 2)) : false,
    ),
  city: yup.string().required(() => ({ key: 'isRequiredText' })),
});

export interface FromHomeDonationData
  extends DonationData,
    yup.InferType<typeof fromHomeDonationDataSchema> {}
