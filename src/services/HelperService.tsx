import { ReactElement, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BaseSchema } from 'yup';
import { DonationData, FromHomeDonationData } from '../models';

/**
 * Includes various handy methods which are generalized.
 */
const HelperService = {
  /**
   * Performs a validation of the given schema to the given data.
   * @param schema The yup specification of for an object.
   * @param formData The object which should be validated.
   * @returns A formatted list of validation errors including the attribut name
   *          as record identifier and an array of errors for it.
   */
  validateAgainstSchema: async function (
    schema: BaseSchema,
    formData: DonationData | FromHomeDonationData,
  ): Promise<Record<string, { key: string }[]>> {
    const errorData: Record<string, { key: string }[]> = {};
    try {
      await schema.validate(formData, {
        abortEarly: false,
      });
    } catch (valErrors) {
      // Cannot be mapped to the 'ValidationError' interface coming from yup,
      // as it does not match the multiple error pattern.
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

  /**
   * An empty component to scroll to the top everytime we navigate to a
   * different route.
   * @returns An empty tag.
   */
  scrollToTopAfterNavigation: function (): ReactElement {
    const { pathname } = useLocation();

    /**
     * Runs everytime the current location changes.
     */
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return <></>;
  },
};

export default HelperService;
