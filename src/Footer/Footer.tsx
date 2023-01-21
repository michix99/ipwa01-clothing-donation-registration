import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Footer.scss';

function Footer() {
  const { t } = useTranslation('nav');

  return (
    <div id="footer-wrapper" className="text-center p-3">
      <Container>
        <Row>
          <Col>
            &copy; {new Date().getFullYear()} Copyright:{' '}
            <a className="text-dark" href="https://github.com/michix99">
              michix99
            </a>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link to="legal">{t('legalNotice')}</Link>
            {' • '}
            <Link to="license">{t('license')}</Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
