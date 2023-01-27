import * as yup from 'yup';
import { DonationData } from './DonationData';
import location from '../assets/officeLocation.json';

/**
 * Validation schema for a donation which is collected.
 */
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
      'is-nearby-office',
      () => ({ key: 'addressInvalid' }),
      (value) =>
        value ? value.startsWith(location.postcode.slice(0, 2)) : false,
    ),
  city: yup.string().required(() => ({ key: 'isRequiredText' })),
});

export interface FromHomeDonationData
  extends DonationData,
    yup.InferType<typeof fromHomeDonationDataSchema> {}
