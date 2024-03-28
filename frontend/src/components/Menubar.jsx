import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import Logout from './userauth/Logout';

const Menubar = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      Hello, { user.username }
      <Logout />
    </>
  )
}

export default Menubar
