import { ReactElement, useEffect, useState } from 'react';
import { Alert, Button, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { DonationData, FromHomeDonationData } from '../../../../models';
import DonationSubPages from '../../../../models/DonationSubPages';
import './DonationSuccessView.scss';

/**
 * The component containig a success notification once a donation was submitted.
 * @param props The data submitted.
 * @returns the ReactElement
 */
function DonationSuccessView(props: {
  formData: DonationData | FromHomeDonationData;
}): ReactElement {
  const { t, i18n } = useTranslation(['donationSuccessView', 'donationForm']);
  const [crisisAreas, setCrisisAreas] = useState<string[]>([]);
  const [clothCategories, setClothCategories] = useState<string[]>([]);
  const [submitDate, setSubmitDate] = useState<Date>();

  /**
   * Runs everytime the active language changes.
   * Updates the list data for crisis areas and cloth categories accordingly.
   */
  useEffect(() => {
    setCrisisAreas(
      t('crisisAreas', { ns: 'donationForm', returnObjects: true }) as string[],
    );
    setClothCategories(
      t('clothCategories', {
        ns: 'donationForm',
        returnObjects: true,
      }) as string[],
    );
  }, [i18n.language]);

  /**
   * Runs everytime the submitted data changes.
   */
  useEffect(() => {
    setSubmitDate(new Date());
  }, [props.formData]);

  /**
   * Type check to determine which interface the provided data matches.
   * @param data The form data which can be for local donation or donation from home.
   * @returns If the data is for a donation from home.
   */
  function isFromHomeDonationData(
    data: DonationData | FromHomeDonationData,
  ): data is FromHomeDonationData {
    return 'firstName' in data;
  }

  return (
    <Alert variant="success">
      <Alert.Heading>{t('congratulation')}</Alert.Heading>
      <p>{t('successMessage')}</p>
      <h5>{t('summaryHeader')}</h5>
      <Container className="summary-container">
        <Row>
          <dt className="col-sm-7">{t('crisisAreaHeader')}</dt>
          <dd className="col-sm-5">{crisisAreas[props.formData.crisisArea]}</dd>
        </Row>
        <Row>
          <dt className="col-sm-7">{t('clothCathegoriesHeader')}</dt>
          <dd className="col-sm-5">
            {(props.formData.clothCategories as number[])
              .map((c) => clothCategories[c])
              .join(', ')}
          </dd>
        </Row>
        <Row>
          <dt className="col-sm-7">{t('whereDonatedHeader')}</dt>
          <dd className="col-sm-5">
            {isFromHomeDonationData(props.formData)
              ? t('homeDonation')
              : t('localDonation')}
          </dd>
        </Row>
        {/**
         * Submitted Address is only shown when the donation is being collected at home.
         */}
        {isFromHomeDonationData(props.formData) && (
          <Row>
            <dt className="col-sm-7">{t('addressheader')}</dt>
            <dd className="col-sm-5">
              {props.formData.firstName} {props.formData.lastName} <br />
              {props.formData.street} {props.formData.houseNumber} <br />
              {props.formData.postcode} {props.formData.city}
            </dd>
          </Row>
        )}
      </Container>
      <figcaption className="mt-3 blockquote-footer">
        {t('submitDateHeader')}{' '}
        {submitDate?.toLocaleString(i18n.language === 'de' ? 'de-DE' : 'en-US')}
      </figcaption>
      <hr />
      <div className="d-flex justify-content-end">
        <Link to={`/donate/${DonationSubPages.Overview}`}>
          <Button variant="outline-success">{t('backButton')}</Button>
        </Link>
      </div>
    </Alert>
  );
}

export default DonationSuccessView;
