import {
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import './DonationForm.scss';
import location from '../../assets/officeLocation.json';

interface donationData {
  crisisArea: number;
  clothCategories: number[];
}

interface fromHomeDonationData extends donationData {
  firstName: string;
  lastName: string;
  street: string;
  houseNumber: string;
  postcode: string;
  city: string;
}

function DonationForm(props: { isCollected: boolean }) {
  const { t, i18n } = useTranslation(['donationForm', 'donationView']);
  const [selectedOptions, setSelectedOptions] = useState<Array<number>>([]);
  const [options, setOptions] = useState<
    Array<{ value: number; label: string }>
  >([]);
  const [formValid, setFormValid] = useState(false);
  const [formData, setFormData] = useState<donationData | fromHomeDonationData>(
    {
      crisisArea: 0,
      clothCategories: [],
    },
  );
  const [multiSelectValid, setMultiSelectValid] = useState(true);
  const [addressValid, setAddressValid] = useState(true);
  const [postcodeValid, setPostcodeValid] = useState(true);

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

  function isFromHomeDonationData(
    object: donationData,
  ): object is fromHomeDonationData {
    return 'firstName' in object;
  }

  const onCrisisAreaSelectChange: ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const name = event.target.name;
    const selectedIndex = (
      t('crisisAreas', { returnObjects: true }) as string[]
    ).findIndex((v) => v === event.target.value);
    setFormData({ ...formData, [name]: selectedIndex });
  };

  const onControlChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (props.isCollected && isFromHomeDonationData(formData)) {
      if (!formData.postcode.startsWith(location.postcode.slice(0, 2))) {
        setAddressValid(false);
        return;
      }
      setAddressValid(true);
    }

    console.log(formData);
    setFormValid(true);
  };

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
          <Form.Select name="crisisArea" onChange={onCrisisAreaSelectChange}>
            {(t('crisisAreas', { returnObjects: true }) as string[]).map(
              (area, index) => (
                <option key={index}>{area}</option>
              ),
            )}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t('selectionCloth')}</Form.Label>
          <Select
            className={`multi-select ${multiSelectValid ? '' : 'invalid'}`}
            isMulti
            options={options}
            onChange={(event) => {
              setSelectedOptions(event.map((e) => e.value));
              if (!selectedOptions.length) {
                setMultiSelectValid(false);
              } else {
                const oldFormData = { ...formData };
                formData.clothCategories = selectedOptions;
                setFormData(oldFormData);
                setMultiSelectValid(true);
              }
            }}
            value={options.filter(
              (option: { value: number; label: string }) => {
                return selectedOptions.includes(option.value);
              },
            )}
          />
          {!multiSelectValid && (
            <Form.Control.Feedback
              type="invalid"
              style={{ display: multiSelectValid ? 'none' : 'block' }}
            >
              {t('clothCategoriesInvalid')}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        {props.isCollected && (
          <>
            <Form.Group className="mb-3">
              <Form.Text>{t('addressDisclaimer')}</Form.Text>
            </Form.Group>

            <Row>
              <Form.Group className="col-md-6 mb-3">
                <Form.Label>{t('firstNameHeader')}</Form.Label>
                <Form.Control
                  name="firstName"
                  onChange={onControlChange}
                  required
                  placeholder={t('firstNamePlaceholder') ?? undefined}
                />
              </Form.Group>

              <Form.Group className="col-md-6 mb-3">
                <Form.Label>{t('lastNameHeader')}</Form.Label>
                <Form.Control
                  name="lastName"
                  onChange={onControlChange}
                  required
                  placeholder={t('lastNamePlaceholder') ?? undefined}
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group className="col-md-7 mb-3">
                <Form.Label>{t('addressHeader')}</Form.Label>
                <Form.Control
                  name="street"
                  onChange={onControlChange}
                  required
                  placeholder={t('adressPlaceholder') ?? undefined}
                />
              </Form.Group>

              <Form.Group className="col-md-5 mb-3">
                <Form.Label>{t('houseNumberHeader')}</Form.Label>
                <Form.Control
                  name="houseNumber"
                  onChange={onControlChange}
                  required
                  placeholder={t('houseNumberPlaceholder') ?? undefined}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>{t('postcodeHeader')}</Form.Label>
              <Form.Control
                name="postcode"
                onChange={(event) => {
                  onControlChange(event as ChangeEvent<HTMLInputElement>);
                  const matchPattern = event.target.value.match(/^([0-9]{5})$/);
                  setPostcodeValid(matchPattern?.length !== 0);
                }}
                placeholder={t('postcodePlaceholder') ?? undefined}
              />
              {!postcodeValid && (
                <Form.Control.Feedback
                  type="invalid"
                  style={{ display: postcodeValid ? 'none' : 'block' }}
                >
                  {t('postcodeInvalid')}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t('cityHeader')}</Form.Label>
              <Form.Control
                name="city"
                onChange={onControlChange}
                required
                placeholder={t('cityPlaceholder') ?? undefined}
              />
            </Form.Group>

            {!addressValid && (
              <Form.Control.Feedback
                type="invalid"
                style={{ display: addressValid ? 'none' : 'block' }}
              >
                {t('addressInvalid')} <br />
                <strong>
                  {location.street} {location.houseNumber} <br />
                  {location.postcode} {location.city}
                </strong>
              </Form.Control.Feedback>
            )}
          </>
        )}
        <Button className="submit mt-3 mb-3" variant="success" type="submit">
          {t('submitButton')}
        </Button>
      </Form>
    </>
  );
}

export default DonationForm;
