import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './Navigation.scss';
import logo from '../Logo_with_Green_Patches_final.svg';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Navigation() {
  const { t, i18n } = useTranslation('nav');
  const [languageKey, setLanguage] = useState(i18n.language);

  const onLanguageChange = (languageKey: string | null) => {
    i18n.changeLanguage(languageKey ?? undefined);
    setLanguage(languageKey ?? '');
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
              <NavDropdown.Item as={Link} to="/donate/overview">
                {t('overviewPage')}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/donate/local">
                {t('localStoreDonation')}
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/donate/fromHome">
                {t('homeDonation')}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav activeKey={languageKey} onSelect={onLanguageChange}>
            <Nav.Link eventKey="de" title="deutsch">
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
