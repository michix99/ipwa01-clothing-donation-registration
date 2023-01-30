import { ReactElement, useEffect } from 'react';
import {
  Button,
  Col,
  Container,
  OverlayTrigger,
  Popover,
  Row,
} from 'react-bootstrap';
import { QuestionCircle } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import DonationSubPages from '../../models/DonationSubPages';
import DonationForm from './DonationForm/DonationForm';
import './DonationView.scss';

/**
 * The donation view including all subviews and components.
 * @returns the ReactElement
 */
function DonationView(): ReactElement {
  const { t, i18n } = useTranslation(['donationView', 'nav']);
  const { subview } = useParams();

  /**
   * Runs everytime the active language and the params of the
   * current URL changes.
   */
  useEffect(() => {
    let header = '';
    if (subview === DonationSubPages.Overview) {
      header = t('overviewPage', { ns: 'nav' });
    } else if (subview === DonationSubPages.Local) {
      header = t('localStoreDonation', { ns: 'nav' });
    } else if (subview === DonationSubPages.FromHome) {
      header = t('homeDonation', { ns: 'nav' });
    }
    document.title = `Sock Savior - ${header}`;
  }, [subview, i18n.language]);

  return (
    <>
      <h1 className="mt-3">{t('overviewHeader')}</h1>
      <Container>
        {subview === DonationSubPages.Overview && (
          <>
            <Row data-testid="overview-row">
              <div className="mt-3 mb-3">
                {t('overviewText')}{' '}
                {/**
                 * The help icon which opens a popover containing information
                    about different donation options.
                 */}
                <OverlayTrigger
                  trigger="focus"
                  placement="bottom"
                  overlay={
                    <Popover>
                      <Popover.Header as="h3">
                        {t('helpPopoverHeader')}
                      </Popover.Header>
                      <Popover.Body>
                        <strong>{t('localDonationButton')}</strong>
                        <br />
                        {t('localDonationExplanation')}
                        <br />
                        <strong>{t('homeDonationButton')}</strong>
                        <br />
                        {t('homeDonationExplanation')}
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <Button
                    className="help"
                    type="button"
                    variant="light"
                    // will always return string, even without translation -> returns key
                    title={t('helpPopoverHeader') as string}
                  >
                    <QuestionCircle />
                  </Button>
                </OverlayTrigger>
              </div>
            </Row>
            <Row>
              <Col xxl={4} xl={4} lg={3} md={2} sm={2} xs={1}></Col>
              <Col xxl xl lg md sm xs>
                <div className="d-grid gap-4">
                  <Link to={`/donate/${DonationSubPages.Local}`}>
                    <Button
                      className="donation-option"
                      variant="success"
                      type="button"
                      // will always return string, even without translation -> returns key
                      title={t('localDonationButtonTitle') as string}
                      size="lg"
                    >
                      {t('localDonationButton')}
                    </Button>
                  </Link>
                  <Link to={`/donate/${DonationSubPages.FromHome}`}>
                    <Button
                      className="donation-option"
                      variant="success"
                      type="button"
                      // will always return string, even without translation -> returns key
                      title={t('homeDonationButtonTitle') as string}
                      size="lg"
                    >
                      {t('homeDonationButton')}
                    </Button>
                  </Link>
                </div>
              </Col>
              <Col xxl={4} xl={4} lg={3} md={2} sm={2} xs={1}></Col>
            </Row>
          </>
        )}

        {/**
         * Renders the donation subpages once selected.
         */}
        {(subview === DonationSubPages.Local ||
          subview === DonationSubPages.FromHome) && (
          <Row data-testid="donation-row">
            <Col xxl={3} xl={3} lg={3} md={2} sm={2} xs={1}></Col>
            <Col xxl xl lg md sm xs>
              <DonationForm
                isCollected={subview === DonationSubPages.FromHome}
              />
            </Col>
            <Col xxl={3} xl={3} lg={3} md={2} sm={2} xs={1}></Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default DonationView;
