import {
  ChangeEventHandler,
  FormEventHandler,
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

function DonationForm(props: { isCollected: boolean }) {
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

  useEffect(() => {
    setOptions(
      (t('clothCategories', { returnObjects: true }) as string[]).map(
        (category, index) => ({
          value: index,
          label: category,
        }),
      ),
    );
  }, [i18n.language]);

  useEffect(() => {
    setFormValid(false);
    setFormData({
      crisisArea: 0,
      clothCategories: [],
    });
    setSelectedOptions([]);
    setValidationErrors({});
  }, [props.isCollected]);

  const onCrisisAreaSelectChange: ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const name = event.target.name;
    const selectedIndex = (
      t('crisisAreas', { returnObjects: true }) as string[]
    ).findIndex((v) => v === event.target.value);
    setFormData({ ...formData, [name]: selectedIndex });
    resetValidationErrorForKey(name);
  };

  const onClothCategoriesSelectChange = (
    newValue: MultiValue<{ value: number; label: string }>,
  ) => {
    const newSelection = newValue.map((e) => e.value);
    setSelectedOptions(newSelection);

    const copyFormData = { ...formData };
    copyFormData.clothCategories = newSelection;
    setFormData(copyFormData);
    resetValidationErrorForKey('clothCategories');
  };

  const onControlChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
    resetValidationErrorForKey(name);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
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
    console.log(formData);
  };

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
        <Form
          noValidate
          validated={formValid}
          onSubmit={onSubmit}
          className="form"
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
    </>
  );
}

export default DonationForm;
