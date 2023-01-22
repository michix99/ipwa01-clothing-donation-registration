import './App.scss';
import Footer from './Footer/Footer';
import Navigation from './Navigation/Navigation';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <div className="content">
        <Navigation />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
