import React, {useEffect} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const {
        // loginWithPopup,
        loginWithRedirect,
        logout,
        isAuthenticated
      } = useAuth0();

    useEffect(()=> {
        if(isAuthenticated) {
            navigate('/dashboard');
        }
    },[isAuthenticated]);


    return (
      <div>
        <h1>Auth0 Authentication</h1>
        <ul>
          {isAuthenticated ? 
            <li>
              <button className="logout-button" onClick={logout}>Logout </button>
            </li>:
            <li>
              <button className="login-button" onClick={loginWithRedirect}>Login </button>
            </li>
          }
        </ul>
      </div>
    );
}


export default Home;