import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './LegalNotice.scss';

function LegalNotice() {
  const { t, i18n } = useTranslation(['legalNotice', 'nav']);

  useEffect(() => {
    document.title = `Sock Savior - ${t('legalNotice', { ns: 'nav' })}`;
  }, [i18n.language]);

  return (
    <>
      <h1 className="mt-3">{t('header')}</h1>
      <p>{t('informationHeader')} § 5 TMG</p>
      <p>
        Sock Savior e. V. <br /> Musterweg
        <br /> 12345 Musterstadt <br />{' '}
      </p>
      <p>
        {' '}
        <strong>{t('responsibleHeader')}: </strong>
        <br />
        Michaela Andermann
        <br />
      </p>
      <p>
        <strong>{t('contactHeader')}:</strong> <br />
        {t('phone')}: 01234-789456
        <br />
        Fax: 1234-56789
        <br />
        E-Mail: <a href="mailto:max@muster.de">max@muster.de</a>
        <br />
      </p>
      <p>
        <strong>{t('registryEntry')}: </strong>
        <br />
        {t('registryPlaceHeader')}: Musterstadt
        <br />
        {t('registryNumber')}: 12345
        <br />
      </p>
      <p>
        <strong>{t('salesTaxId')}: </strong> <br />
        {t('salesTaxLaw')}: Musterustid.
        <br />
      </p>
      <p>
        <strong>{t('supervisoryAuthorityHeader')}:</strong>
        <br />
        Musteraufsicht Musterstadt
        <br />
      </p>
      <p>
        <strong>{t('disclaimerHeader')}: </strong>
        <br />
        <br />
        <strong>{t('disclaimerHeaderContent')}</strong>
        <br />
        <br />
        {t('disclaimerContent')}
        <br />
        <br />
        <strong>{t('disclaimerHeaderLinks')}</strong>
        <br />
        <br />
        {t('disclaimerLinks')}
        <br />
        <br />
        <strong>{t('disclaimerHeaderPropertyRights')}</strong>
        <br />
        <br />
        {t('disclaimerPropertyRights')}
        <br />
        <br />
        <strong>{t('disclaimerHeaderPrivacyPolicy')}</strong>
        <br />
        <br />
        {t('disclaimerPrivacyPolicy')}
        <br />
      </p>
    </>
  );
}

export default LegalNotice;
