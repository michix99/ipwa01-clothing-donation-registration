import { ReactElement } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

/**
 * The component to display an routing or application error.
 * @returns the ReactElement
 */
function ErrorView(): ReactElement {
  const { t } = useTranslation('errorView');
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Container>
        <Row>
          <Col>
            <h1>{t('headline')}</h1>
            <p>{t('errorOccured')}</p>
            <h2>{error.status}</h2>
            <p>{error.statusText}</p>
            {error.data?.message && <p>{error.data.message}</p>}
          </Col>
        </Row>
      </Container>
    );
  }
  return (
    <Container>
      <Row>
        <Col>
          <h1>{t('headline')}</h1>
          <p>{t('errorOccured')}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default ErrorView;
