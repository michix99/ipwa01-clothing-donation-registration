import './App.scss';
import Footer from './components/Footer/Footer';
import Navigation from './components/Navigation/Navigation';
import { Outlet } from 'react-router-dom';
import HelperService from './services/HelperService';
import { ReactElement } from 'react';

/**
 * The base component including the navigation, the current content and the footer.
 * @returns the ReactElement
 */
function App(): ReactElement {
  return (
    <>
      <HelperService.scrollToTopAfterNavigation />
      <div className="app">
        <div className="content">
          <Navigation />
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
