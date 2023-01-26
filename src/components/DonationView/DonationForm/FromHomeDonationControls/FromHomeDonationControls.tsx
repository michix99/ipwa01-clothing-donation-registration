import { ChangeEventHandler } from 'react';
import { Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import location from '../../../../assets/officeLocation.json';

function FromHomeDonationControls(props: {
  onControlChange: ChangeEventHandler<HTMLInputElement>;
  validationErrors: Record<string, { key: string }[]>;
}) {
  const { t } = useTranslation(['donationForm']);

  const handleControlChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    props.onControlChange(event);
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Text>{t('addressDisclaimer')}</Form.Text>
      </Form.Group>

      <Row>
        <Form.Group className="col-md-6 mb-3">
          <Form.Label>{t('firstNameHeader')}</Form.Label>
          <Form.Control
            name="firstName"
            onChange={handleControlChange}
            isInvalid={!!props.validationErrors.firstName}
            placeholder={t('firstNamePlaceholder') ?? undefined}
          />
          <Form.Control.Feedback type="invalid">
            {props.validationErrors.firstName?.map((e) => t(e.key))}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="col-md-6 mb-3">
          <Form.Label>{t('lastNameHeader')}</Form.Label>
          <Form.Control
            name="lastName"
            onChange={handleControlChange}
            placeholder={t('lastNamePlaceholder') ?? undefined}
            isInvalid={!!props.validationErrors.lastName}
          />
          <Form.Control.Feedback type="invalid">
            {props.validationErrors.lastName?.map((e) => t(e.key))}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group className="col-md-7 mb-3">
          <Form.Label>{t('addressHeader')}</Form.Label>
          <Form.Control
            name="street"
            onChange={handleControlChange}
            placeholder={t('adressPlaceholder') ?? undefined}
            isInvalid={!!props.validationErrors.street}
          />
          <Form.Control.Feedback type="invalid">
            {props.validationErrors.street?.map((e) => t(e.key))}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="col-md-5 mb-3">
          <Form.Label>{t('houseNumberHeader')}</Form.Label>
          <Form.Control
            name="houseNumber"
            onChange={handleControlChange}
            placeholder={t('houseNumberPlaceholder') ?? undefined}
            isInvalid={!!props.validationErrors.houseNumber}
          />
          <Form.Control.Feedback type="invalid">
            {props.validationErrors.houseNumber?.map((e) => t(e.key))}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>{t('postcodeHeader')}</Form.Label>
        <Form.Control
          name="postcode"
          onChange={handleControlChange}
          placeholder={t('postcodePlaceholder') ?? undefined}
          isInvalid={!!props.validationErrors.postcode}
        />
        <Form.Control.Feedback type="invalid">
          {props.validationErrors.postcode
            ?.filter((v) => v.key !== 'addressInvalid')
            .map((e) => t(e.key))}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t('cityHeader')}</Form.Label>
        <Form.Control
          name="city"
          onChange={handleControlChange}
          placeholder={t('cityPlaceholder') ?? undefined}
          isInvalid={!!props.validationErrors.city}
        />
        <Form.Control.Feedback type="invalid">
          {props.validationErrors.city?.map((e) => t(e.key))}
        </Form.Control.Feedback>
      </Form.Group>

      {props.validationErrors.postcode?.find(
        (e) => e.key === 'addressInvalid',
      ) && (
        <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
          {props.validationErrors.postcode
            ?.filter((v) => v.key === 'addressInvalid')
            .map((e) => t(e.key))}{' '}
          <br />
          <strong>
            {location.street} {location.houseNumber} <br />
            {location.postcode} {location.city}
          </strong>
        </Form.Control.Feedback>
      )}
    </>
  );
}

export default FromHomeDonationControls;
