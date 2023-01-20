import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './Navigation.scss';
import logo from '../Logo_with_Green_Patches_final.svg';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
          <Nav activeKey={languageKey} onSelect={onLanguageChange}>
            <Nav.Link eventKey="de" title="deutsch">
              DE
            </Nav.Link>
            <div className="vr bg-light d-none d-lg-block"></div>
            <Nav.Link eventKey="en" title="english">
              EN
            </Nav.Link>
          </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
