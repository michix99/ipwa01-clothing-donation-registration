import { ReactElement, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { ArrowUp, Github } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import packageInformation from '../../../package.json';
import { PackageInformation } from '../../models';
import './Footer.scss';

/**
 * The footer element of the page, shown always at the bottom.
 * @returns the ReactElement
 */
function Footer(): ReactElement {
  const { t } = useTranslation(['footer', 'nav']);
  const [topButtonDisplayed, setTopButtonDisplayed] = useState('none');
  const packageInfo: PackageInformation = packageInformation;

  /**
   * Runs on ever re-render.
   */
  useEffect((): void => {
    /**
     * Sets up a scroll handler which shows a button to scroll up everytime
     * we scroll the page down.
     */
    const onScroll = (): void => {
      if (window.scrollY > 0) {
        setTopButtonDisplayed('block');
      } else {
        setTopButtonDisplayed('none');
      }
    };
    window.addEventListener('scroll', onScroll);
  });

  /**
   * Scrolls to the top of the page.
   */
  function backtoTop(): void {
    window.scrollTo(0, 0);
  }

  return (
    <>
      <Button
        variant="success"
        type="button"
        className="btn-floating"
        id="back-to-top"
        style={{
          display: topButtonDisplayed,
        }}
        onClick={backtoTop}
        title={t('scrollToTop') ?? undefined}
        data-testid="back-to-top"
      >
        <ArrowUp />
      </Button>
      <footer
        data-testid="footer"
        className="text-center text-lg-start bg-light"
      >
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
                v{packageInfo.version} - &copy; {new Date().getFullYear()}{' '}
                Copyright:
              </Col>
              <Col xxl="auto" xl="auto" lg="auto" md="auto" sm="auto" xs="auto">
                Michaela Andermann{' '}
                <a
                  className="text-reset"
                  href="https://github.com/michix99"
                  title={t('linkToProfile') ?? undefined}
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
              <Col xl="auto" lg md sm xs>
                <Link className="text-reset" to="legal">
                  {t('legalNotice', { ns: 'nav' })}
                </Link>
              </Col>
              <Col xl="auto" lg md sm xs>
                <Link className="text-reset" to="license">
                  {t('license', { ns: 'nav' })}
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
