import './License.scss';
import licenseInformation from '../../assets/license.json';
import packageInformation from '../../../package.json';
import { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LibraryInformation, PackageInformation } from '../../models';

/**
 * The component including all the used libraries and der licenses.
 * @returns the ReactElement
 */
function License(): ReactElement {
  const { t, i18n } = useTranslation('nav');
  const licenses: Record<string, LibraryInformation> = licenseInformation;
  const packageInfo: PackageInformation = packageInformation;

  // Only include libraries which have a license
  const libraries: LibraryInformation[] = Object.values(licenses).filter(
    (e) => e.licenses !== 'UNLICENSED',
  );

  /**
   * Runs everytime the active language changes.
   */
  useEffect(() => {
    document.title = `Sock Savior - ${t('license')}`;
  }, [i18n.language]);

  return (
    <>
      <h1 className="mt-3">Open Source Assurance</h1>
      <h4 className="fw-bold">Sock Savior v{packageInfo.version}</h4>
      <div>MIT - &copy; Copyright 2023-present Michaela Andermann</div>
      <hr className="hr" />
      <br />
      {libraries.map((e, index) => (
        <div className="library-wrapper" key={index}>
          <h5>
            {e.name} {e.version}
          </h5>{' '}
          <div>
            {e.licenses} - {e.copyright}
          </div>
          <br />
        </div>
      ))}
    </>
  );
}

export default License;
