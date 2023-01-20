import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './HomeView.scss';

function HomeView() {
  // load multiple namespaces
  // the t function will be set to first namespace as default
  // const { t, i18n } = useTranslation(['ns1', 'ns2', 'ns3']);
  // t('key'); // will be looked up from namespace ns1
  // t('key', { ns: 'ns2' }); // will be looked up from namespace ns2
  const { t } = useTranslation('nav');
  useEffect(() => {
    document.title = `Sock Savior - ${t('homePage')}`;
  }, []);

  return <div>Home View</div>;
}

export default HomeView;
