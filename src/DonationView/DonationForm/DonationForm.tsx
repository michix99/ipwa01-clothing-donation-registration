import { useEffect, useState } from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import './DonationForm.scss';

function DonationForm(props: { isCollected: boolean }) {
  const { t, i18n } = useTranslation(['donationForm', 'donationView']);
  const [selectedOption, setSelectedOption] = useState<Array<number>>([]);
  const [options, setOptions] = useState<
    Array<{ value: number; label: string }>
  >([]);
  const [validated, setValidated] = useState(false);

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

  const handleSubmit = (event: {
    currentTarget: any;
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    // TODO: need to check cloth selection here!

    setValidated(true);
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
        validated={validated}
        onSubmit={handleSubmit}
        className="form"
      >
        <Form.Group className="mb-3">
          <Form.Label>{t('selectionCrisisArea')}</Form.Label>
          <Form.Select>
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
            isMulti
            options={options}
            onChange={(event) => {
              setSelectedOption(event.map((e) => e.value));
            }}
            value={options.filter(
              (option: { value: number; label: string }) => {
                return selectedOption.includes(option.value);
              },
            )}
          />
        </Form.Group>

        {props.isCollected && (
          <>
            <Form.Group className="mb-3">
              <Form.Text>
                For collecting the cloth we need your address:
              </Form.Text>
            </Form.Group>

            <Row>
              <Form.Group className="col-md-6 mb-3">
                <Form.Label>{t('firstNameHeader')}</Form.Label>
                <Form.Control
                  required
                  placeholder={t('firstNamePlaceholder') ?? undefined}
                />
              </Form.Group>

              <Form.Group className="col-md-6 mb-3">
                <Form.Label>{t('lastNameHeader')}</Form.Label>
                <Form.Control
                  required
                  placeholder={t('lastNamePlaceholder') ?? undefined}
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group className="col-md-7 mb-3">
                <Form.Label>{t('addressHeader')}</Form.Label>
                <Form.Control
                  required
                  placeholder={t('adressPlaceholder') ?? undefined}
                />
              </Form.Group>

              <Form.Group className="col-md-5 mb-3">
                <Form.Label>{t('houseNumberHeader')}</Form.Label>
                <Form.Control
                  required
                  placeholder={t('houseNumberPlaceholder') ?? undefined}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>{t('postcodeHeader')}</Form.Label>
              <Form.Control
                required
                placeholder={t('postcodePlaceholder') ?? undefined}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t('cityHeader')}</Form.Label>
              <Form.Control
                required
                placeholder={t('cityPlaceholder') ?? undefined}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
          </>
        )}
        <Button className="submit mb-3" variant="success" type="submit">
          {t('submitButton')}
        </Button>
      </Form>
    </>
  );
}

export default DonationForm;
