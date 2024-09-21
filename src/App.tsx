import { Route } from 'react-router-dom';
import './App.css';
import {Home} from './components/pages/public/home/home.page';
import { RoutesWithNotFound } from './components/utilities/routes-with-not-found.utility';
import { PublicRoutes } from './models/routes/routes.model';
import { RiwiTheme } from './state/context/riwiTheme';
import ClientLayout from './components/layout/client.layout';
import DashboardCards from './components/pages/private/admin/components/AdminCards';

function App() {
  return (
    <div className='app'>
      <DashboardCards></DashboardCards>
    </div>
  );
}

export default App;
