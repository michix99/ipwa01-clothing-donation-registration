import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './Navigation.scss';
import logo from '../../assets/Logo.svg';
import { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import DonationSubPages from '../../models/DonationSubPages';

/**
 * The navigation component which is always shown.
 * @returns the ReactElement
 */
function Navigation(): ReactElement {
  const { t, i18n } = useTranslation('nav');
  const [languageKey, setLanguage] = useState(i18n.language);

  /**
   * Updates the current active language of the application.
   * @param languageKey The string key of the new language.
   */
  const onLanguageChange = (languageKey: string | null): void => {
    i18n.changeLanguage(languageKey as string);
    setLanguage(languageKey as string);
  };

  return (
    <Navbar bg="success" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="Sock Savior logo"
          />{' '}
          <span className="align-middle">Sock Savior</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navigation-links" />
        <Navbar.Collapse id="navigation-links">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              {t('homePage')}
            </Nav.Link>
            <NavDropdown menuVariant="dark" title={t('donationPage')}>
              <NavDropdown.Item
                as={Link}
                to={`/donate/${DonationSubPages.Overview}`}
              >
                {t('overviewPage')}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                as={Link}
                to={`/donate/${DonationSubPages.Local}`}
              >
                {t('localStoreDonation')}
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to={`/donate/${DonationSubPages.FromHome}`}
              >
                {t('homeDonation')}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav activeKey={languageKey} onSelect={onLanguageChange}>
            <Nav.Link eventKey="de" title="deutsch" data-testid="de-selection">
              DE
            </Nav.Link>
            <div className="vr bg-light d-none d-lg-block"></div>
            <Nav.Link eventKey="en" title="english">
              EN
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
