import { ReactElement, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './HomeView.scss';
import logo from '../../assets/Logo.svg';
import map from '../../assets/MapChart_Map.png';
import location from '../../assets/officeLocation.json';
import DonationSubPages from '../../models/DonationSubPages';
import { Link } from 'react-router-dom';

/**
 * The home view of the page which is shown on entering it.
 * @returns the ReactElement
 */
function HomeView(): ReactElement {
  const { t, i18n } = useTranslation(['homeView', 'nav', 'donationForm']);

  /**
   * Runs everytime the active language changes.
   */
  useEffect(() => {
    document.title = `Sock Savior - ${t('homePage', { ns: 'nav' })}`;
  }, [i18n.language]);

  return (
    <Container className="mt-3 mb-3">
      <Row>
        <Col xs={12} lg={6}>
          <h1 className="mt-3 mb-3">{t('title')}</h1>
          <p className="mt-6">{t('introduction', { city: location.city })}</p>
          <h4>{t('specialHeader')}</h4>
          <p>{t('specialText')}</p>
          <p>
            {t('newRegionText')}{' '}
            <a href="mailto:max@muster.de">max@muster.de</a>
          </p>
        </Col>
        <Col xs={12} lg={6}>
          <img src={logo} className="logo mb-2" alt="Logo" height="auto"></img>
          <p className="lead">{t('everyDonation')}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>{t('whatHeader')}</h4>
          <p>{t('whatText')}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>{t('howHeader')}</h4>
          <p>
            {t('howText')}
            <br />
            Sock Savior e. V.
            <br />
            {location.street} {location.houseNumber}
            <br />
            {location.postcode} {location.city}
            <br />
          </p>
          <Link to={`/donate/${DonationSubPages.Overview}`}>
            <Button
              variant="success"
              type="button"
              title={t('goToDonationButton') ?? undefined}
            >
              {t('goToDonationButton')}
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="mt-3">{t('whichHeader')}</h4>
          <p>
            {(
              t('crisisAreas', {
                returnObjects: true,
                ns: 'donationForm',
              }) as string[]
            ).join(', ')}
          </p>
          <figure className="figure">
            <img
              src={map}
              className="figure-img img-fluid"
              alt="World Map"
            ></img>
            <figcaption className="figure-caption text-end">
              - {t('createdTitle')}{' '}
              <a
                className="text-reset"
                href="https://www.mapchart.net/"
                title="Go to MapChart."
              >
                MapChart
              </a>
              .
            </figcaption>
          </figure>
        </Col>
      </Row>
    </Container>
  );
}

export default HomeView;
