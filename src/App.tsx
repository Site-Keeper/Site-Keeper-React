import { Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/public/home/home.page';
import { RoutesWithNotFound } from './components/utilities/routes-with-not-found.utility';
import { PrivateRoutes, PublicRoutes } from './models/routes/routes.model';
import { RiwiTheme } from './state/context/riwiTheme';
import ClientLayout from './components/layout/client.layout';
import LostObject from './components/pages/private/client/lostObjects/lost-objects.page';

function App() {
  return (
    <div className='app' style={{minHeight: '100vh'}}>
        <RiwiTheme>
        <RoutesWithNotFound>
          <Route element={<ClientLayout />}>
            <Route path={PublicRoutes.HOME} element={<Home />} />
            <Route path={PrivateRoutes.LOST_OBJECTS} element={<LostObject />} />
          </Route>
        </RoutesWithNotFound>
      </RiwiTheme>
    </div>
  );
}

export default App;
