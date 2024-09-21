import { Route } from 'react-router-dom';
import './App.css';
import {Home} from './components/pages/public/home/home.page';
import { RoutesWithNotFound } from './components/utilities/routes-with-not-found.utility';
import { PrivateRoutes, PublicRoutes } from './models/routes/routes.model';
import { RiwiTheme } from './state/context/riwiTheme';
import ClientLayout from './components/layout/client.layout';
import AdminLayout from './components/layout/admin.layout';
import Dashboard from './components/pages/private/admin/dashboard/dashboard.page';
import { UserAdmin } from './components/pages/private/admin/users-admin/users-admin.page';
import AuthGuard from './components/guard/auth.guard';
import ClientHome from './components/pages/public/clientHome/clientHome.page';

function App() {
  return (
    <div className='app'>
        <RiwiTheme>
        <RoutesWithNotFound>
          <Route path={'site-keeper'} element={<ClientHome />}/>
          <Route element={<ClientLayout />}>
            <Route path={PublicRoutes.HOME} element={<Home />} />
          </Route>
          <Route element={<AuthGuard/>}>
            <Route element={<AdminLayout/>}>
              <Route path={PrivateRoutes.PRIVATE_DASHBOARD} element={<Dashboard />} />
              <Route path={PrivateRoutes.ADMIN_USERS} element={<UserAdmin />} />
            </Route>
          </Route>
        </RoutesWithNotFound>
      </RiwiTheme>
    </div>
  );
}

export default App;
