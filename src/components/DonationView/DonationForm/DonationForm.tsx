import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Select, { MultiValue } from 'react-select';
import './DonationForm.scss';
import {
  DonationData,
  donationDataSchema,
  FromHomeDonationData,
  fromHomeDonationDataSchema,
} from '../../../models';
import FromHomeDonationControls from './FromHomeDonationControls/FromHomeDonationControls';
import HelperService from '../../../services/HelperService';
import DonationSuccessView from './DonationSuccessView/DonationSuccessView';

/**
 * The component containing the form for a donation registration.
 * @param props Contains the information if the donaton is collected from home
 * or done in the office.
 * @returns the ReactElement
 */
function DonationForm(props: { isCollected: boolean }): ReactElement {
  const { t, i18n } = useTranslation(['donationForm', 'donationView']);
  const [selectedOptions, setSelectedOptions] = useState<Array<number>>([]);
  const [options, setOptions] = useState<
    Array<{ value: number; label: string }>
  >([]);
  const [formValid, setFormValid] = useState(false);
  const [formData, setFormData] = useState<DonationData | FromHomeDonationData>(
    {
      crisisArea: 0,
      clothCategories: [],
    },
  );
  const [validationErrors, setValidationErrors] = useState<
    Record<string, { key: string }[]>
  >({});

  /**
   * Runs everytime the active language changes.
   */
  useEffect(() => {
    // Updates the multi selection options for the cloth categories field
    setOptions(
      (t('clothCategories', { returnObjects: true }) as string[]).map(
        (category, index) => ({
          value: index,
          label: category,
        }),
      ),
    );
  }, [i18n.language]);

  /**
   * Runs everytime the path changes between local donation
   * and donation from home. Resets the form elements.
   */
  useEffect(() => {
    setFormValid(false);
    setFormData({
      crisisArea: 0,
      clothCategories: [],
    });
    setSelectedOptions([]);
    setValidationErrors({});
  }, [props.isCollected]);

  /**
   * EventHandler when a new crisis area was selected. Saves the selection.
   * @param event The event containing the new value.
   */
  const onCrisisAreaSelectChange: ChangeEventHandler<HTMLSelectElement> = (
    event: ChangeEvent<HTMLSelectElement>,
  ): void => {
    const name = event.target.name;
    const selectedIndex = (
      t('crisisAreas', { returnObjects: true }) as string[]
    ).findIndex((v) => v === event.target.value);
    setFormData({ ...formData, [name]: selectedIndex });
    resetValidationErrorForKey(name);
  };

  /**
   * Handles when the selection of cloth categories was changed and saves it.
   * @param newValue The new value containing the selected cloth categories.
   */
  const onClothCategoriesSelectChange = (
    newValue: MultiValue<{ value: number; label: string }>,
  ): void => {
    const newSelection = newValue.map((e) => e.value);
    setSelectedOptions(newSelection);

    const copyFormData = { ...formData };
    copyFormData.clothCategories = newSelection;
    setFormData(copyFormData);
    resetValidationErrorForKey('clothCategories');
  };

  /**
   * EventHandler when a text control was updated. Saves the new value.
   * @param event The event containing the new value.
   */
  const onControlChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
    resetValidationErrorForKey(name);
  };

  /**
   * EventHandler which validates the data in the form and submits it,
   * when there are no errors.
   * @param event The submit event.
   */
  const onSubmit: FormEventHandler<HTMLFormElement> = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    let firstValidationResult: Record<string, { key: string }[]> = {};
    let secondValidationResult: Record<string, { key: string }[]> = {};

    firstValidationResult = await HelperService.validateAgainstSchema(
      donationDataSchema,
      formData,
    );

    if (props.isCollected) {
      secondValidationResult = await HelperService.validateAgainstSchema(
        fromHomeDonationDataSchema,
        formData,
      );
    }

    if (
      Object.keys(firstValidationResult).length ||
      Object.keys(secondValidationResult).length
    ) {
      setValidationErrors({
        ...firstValidationResult,
        ...secondValidationResult,
      });
      return;
    }

    setValidationErrors({});
    setFormValid(true);
  };

  /**
   * Removes the current validation errors for a given attribute.
   * @param key The attribute which should be reseted.
   */
  function resetValidationErrorForKey(key: string): void {
    const copyValidationErrors = { ...validationErrors };
    delete copyValidationErrors[key];
    setValidationErrors(copyValidationErrors);
  }

  return (
    <>
      <h4 className="mt-3 mb-3">
        {props.isCollected
          ? t('homeDonationButton', { ns: 'donationView' })
          : t('localDonationButton', { ns: 'donationView' })}
      </h4>

      {!formValid ? (
        <Form
          noValidate
          validated={formValid}
          onSubmit={onSubmit}
          className="form"
          data-testid="form"
        >
          <Form.Group className="mb-3">
            <Form.Label>{t('selectionCrisisArea')}</Form.Label>
            <Form.Select
              name="crisisArea"
              onChange={onCrisisAreaSelectChange}
              isInvalid={!!validationErrors.crisisArea}
              value={
                (t('crisisAreas', { returnObjects: true }) as string[])[
                  formData.crisisArea
                ]
              }
              data-testid="crisis-area-select"
            >
              {(t('crisisAreas', { returnObjects: true }) as string[]).map(
                (area, index) => (
                  <option key={index}>{area}</option>
                ),
              )}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {validationErrors.crisisArea?.map((e) => t(e.key))}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{t('selectionCloth')}</Form.Label>
            <Select
              className={`multi-select ${
                !!validationErrors.clothCategories ? 'invalid' : ''
              }`}
              isMulti
              options={options}
              onChange={onClothCategoriesSelectChange}
              value={options.filter(
                (option: { value: number; label: string }) => {
                  return selectedOptions.includes(option.value);
                },
              )}
              id="cloth-category-select"
            />
            <Form.Control.Feedback
              type="invalid"
              style={{
                display: !!validationErrors.clothCategories ? 'block' : 'none',
              }}
            >
              {validationErrors.clothCategories?.map((e) => t(e.key))}
            </Form.Control.Feedback>
          </Form.Group>

          {/**
           * Only show specific home donation form elements, if it is
           * the selected option.
           */}
          {props.isCollected && (
            <FromHomeDonationControls
              onControlChange={onControlChange}
              validationErrors={validationErrors}
            />
          )}

          <Button className="submit mt-3 mb-3" variant="success" type="submit">
            {t('submitButton')}
          </Button>
        </Form>
      ) : (
        <DonationSuccessView formData={formData} />
      )}
    </>
  );
}

export default DonationForm;
