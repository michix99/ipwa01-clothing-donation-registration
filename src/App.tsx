import './App.scss';
import Footer from './Footer/Footer';
import Navigation from './Navigation/Navigation';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
