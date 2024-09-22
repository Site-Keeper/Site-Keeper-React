import { Route } from 'react-router-dom';
import './App.css';
import {Home} from './components/pages/public/home/home.page';
import { RoutesWithNotFound } from './components/utilities/routes-with-not-found.utility';
import { PrivateRoutes, PublicRoutes } from './models/routes/routes.model';
import { RiwiTheme } from './state/context/riwiTheme';
import ClientLayout from './components/layout/client.layout';
import LostObject from './components/pages/private/client/lostObjects/lost-objects.page';
import AdminLayout from './components/layout/admin.layout';
import Dashboard from './components/pages/private/admin/dashboard/dashboard.page';
import { UserAdmin } from './components/pages/private/admin/users-admin/users-admin.page';
import AuthGuard from './components/guard/auth.guard';
import ClientHome from './components/pages/public/clientHome/clientHome.page';
import { RoutineAdmin } from './components/pages/private/admin/admin-routines/admin-routines.page';
import { AdminSpaces } from './components/pages/private/admin/admin-spaces/admin-spaces.page';

function App() {
  return (
    <div className='app' style={{minHeight: '100vh'}}>
        <RiwiTheme>
        <RoutesWithNotFound>
          <Route path={'site-keeper'} element={<ClientHome />}/>
          <Route element={<ClientLayout />}>
            <Route path={PublicRoutes.HOME} element={<Home />} />
            <Route path={PrivateRoutes.LOST_OBJECTS} element={<LostObject />} />
          </Route>
          <Route element={<AuthGuard/>}>
            <Route element={<AdminLayout/>}>
              <Route path={PrivateRoutes.PRIVATE_DASHBOARD} element={<Dashboard />} />
              <Route path={PrivateRoutes.ADMIN_USERS} element={<UserAdmin />} />
              <Route path={PrivateRoutes.ADMIN_RUTINES} element={<RoutineAdmin/>}/>
              <Route path={PrivateRoutes.ADMIN_SPACES} element={<AdminSpaces />} />
            </Route>
          </Route>
        </RoutesWithNotFound>
      </RiwiTheme>
    </div>
  );
}

export default App;
