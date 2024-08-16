import { Outlet } from 'react-router-dom';

import SigningModal from '../modals/SigningModal';
import Navbar from './Navbar';
import Notifications from './Notifications';

function AppRouterLayout() {
  return (
    <div className="bg-crest h-screen w-screen  bg-center bg-no-repeat">
      <Navbar />
      <Outlet />
      <Notifications />

      <SigningModal />
    </div>
  );
}

export default AppRouterLayout;
