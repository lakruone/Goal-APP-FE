import React, {useEffect, useState} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Home = () => {
    const navigate = useNavigate();
    const {
        // loginWithPopup,
        loginWithRedirect,
        logout,
        isAuthenticated,
        getAccessTokenSilently
      } = useAuth0();

    const [responseData, setResponseData] = useState(null);

    useEffect(()=> {
        if(isAuthenticated) {
            navigate('/dashboard');
        }
    },[isAuthenticated]);

    const CallPublicAPI = async() => {
        try {
            setResponseData(null);
            const response = await axios.get('http://localhost:4300/');
            console.log(response.data);
            setResponseData(response.data.message);
                
            } catch (error) {
                console.log(error.message);
            }
    }

    const CallProtectedAPI = async() => {
        try {
        setResponseData(null);
        const token = await getAccessTokenSilently();
        console.log(token);
        const response = await axios.get('http://localhost:4300/protected/', {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        setResponseData(response.data);
            
        } catch (error) {
            console.log(error.message);
            setResponseData(error.message);
        }
    }

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
        <button className="protected" onClick={CallProtectedAPI}> Call Protected API</button>
        <button className="public" onClick={CallPublicAPI}> Call Public API</button>

        <h4>{responseData && responseData}</h4>
      </div>
    );
}


export default Home;