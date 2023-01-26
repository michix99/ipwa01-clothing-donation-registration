import * as yup from 'yup';

export const donationDataSchema = yup.object({
  crisisArea: yup
    .number()
    .required(() => ({ key: 'isRequiredText' }))
    .min(0),
  clothCategories: yup
    .array(yup.number())
    .min(1, () => ({ key: 'clothCategoriesInvalid' })),
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DonationData
  extends yup.InferType<typeof donationDataSchema> {}
