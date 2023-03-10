import { ChangeEvent, ChangeEventHandler, ReactElement } from 'react';
import { Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import location from '../../../../assets/officeLocation.json';

/**
 * The component containing all home donation related form elements.
 * @param props Contains the event handler to update the parent information
 * and the validation errors coming from the parent.
 * @returns the ReactElement
 */
function FromHomeDonationControls(props: {
  onControlChange: ChangeEventHandler<HTMLInputElement>;
  validationErrors: Record<string, { key: string }[]>;
}): ReactElement {
  const { t } = useTranslation(['donationForm']);

  /**
   * Propagates the event to the parent component, so the data can be saved.
   * @param event The event containing the new value.
   */
  const handleControlChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
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
            // will always return string, even without translation -> returns key
            placeholder={t('firstNamePlaceholder') as string}
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
            // will always return string, even without translation -> returns key
            placeholder={t('lastNamePlaceholder') as string}
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
            // will always return string, even without translation -> returns key
            placeholder={t('adressPlaceholder') as string}
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
            // will always return string, even without translation -> returns key
            placeholder={t('houseNumberPlaceholder') as string}
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
          // will always return string, even without translation -> returns key
          placeholder={t('postcodePlaceholder') as string}
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
          // will always return string, even without translation -> returns key
          placeholder={t('cityPlaceholder') as string}
          isInvalid={!!props.validationErrors.city}
        />
        <Form.Control.Feedback type="invalid">
          {props.validationErrors.city?.map((e) => t(e.key))}
        </Form.Control.Feedback>
      </Form.Group>

      {/**
       * Show an error when the the address is not near the office.
       */}
      {props.validationErrors.postcode?.find(
        (e) => e.key === 'addressInvalid',
      ) && (
        <Form.Control.Feedback
          type="invalid"
          data-testid="address-feedback"
          style={{ display: 'block' }}
        >
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
