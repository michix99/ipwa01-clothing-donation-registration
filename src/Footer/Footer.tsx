import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { ArrowUp, Github } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Footer.scss';

function Footer() {
  const { t } = useTranslation('nav');
  const [topButtonDisplayed, setTopButtonDisplayed] = useState('none');

  useEffect(() => {
    const onScroll = () => {
      if (
        document.body.scrollTop > 0 ||
        document.documentElement.scrollTop > 0
      ) {
        setTopButtonDisplayed('block');
      } else {
        setTopButtonDisplayed('none');
      }
    };
    window.addEventListener('scroll', onScroll);
  });

  function backtoTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <>
      <Button
        variant="success"
        type="button"
        className="btn-floating btn-lg"
        id="back-to-top"
        style={{
          display: topButtonDisplayed,
        }}
        onClick={backtoTop}
      >
        <ArrowUp />
      </Button>
      <footer className="text-center text-lg-start bg-light">
        <div id="footer-wrapper" className="text-center p-3">
          <Container>
            <Row className="copyright-row">
              <Col
                className="d-none d-sm-block"
                xxl={4}
                xl={4}
                lg={4}
                md={3}
                sm={2}
                xs
              ></Col>
              <Col xxl xl="auto" lg="auto" md="auto" sm="auto" xs="auto">
                &copy; {new Date().getFullYear()} Copyright:
              </Col>
              <Col xxl="auto" xl="auto" lg="auto" md="auto" sm="auto" xs="auto">
                Michaela Andermann{' '}
                <a
                  className="text-reset"
                  href="https://github.com/michix99"
                  title="Go to GitHub profile."
                >
                  <Github />
                </a>
              </Col>
              <Col
                className="d-none d-sm-block"
                xxl={4}
                xl={4}
                lg={4}
                md={3}
                sm={2}
              ></Col>
            </Row>
            <Row>
              <Col xl={5} lg={4} md={4} sm={3} xs={2}></Col>
              <Col xl lg md sm xs>
                <Link className="text-reset" to="legal">
                  {t('legalNotice')}
                </Link>
              </Col>
              <Col xl lg md sm xs>
                <Link className="text-reset" to="license">
                  {t('license')}
                </Link>
              </Col>
              <Col xl={5} lg={4} md={4} sm={3} xs={2}></Col>
            </Row>
          </Container>
        </div>
      </footer>
    </>
  );
}

export default Footer;
