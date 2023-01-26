import { BaseSchema } from 'yup';
import { DonationData, FromHomeDonationData } from '../models';

const HelperService = {
  validateAgainstSchema: async function (
    schema: BaseSchema,
    formData: DonationData | FromHomeDonationData,
  ) {
    const errorData: Record<string, { key: string }[]> = {};
    try {
      await schema.validate(formData, {
        abortEarly: false,
      });
    } catch (valErrors) {
      (
        valErrors as {
          inner: { path: string; errors: { key: string }[] }[];
        }
      ).inner.forEach((validationError) => {
        errorData[validationError.path] =
          errorData[validationError.path] === undefined
            ? validationError.errors
            : errorData[validationError.path].concat(validationError.errors);
      });
    }
    return errorData;
  },
};

export default HelperService;
