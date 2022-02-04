import React from "react";
import { useAuth0 } from '@auth0/auth0-react';

const Dashboard = () => {
    const {
        logout,
        user,
      } = useAuth0();

    const CallProtectedAPI = () => {
        console.log("hey protected");
    }

    const CallPublicAPI = () => {
        console.log("hey public");
    }
    return (
        <>
        <button className="logout-button" onClick={logout}>Logout </button>
        <h2>Dashboard</h2>
        <button className="protected" onClick={CallProtectedAPI}> Call Protected API</button>
        <button className="public" onClick={CallPublicAPI}> Call Public API</button>
        <pre style={{textAlign: 'start', fontSize:'20px'}}>
        {JSON.stringify(user, null, 2)}
        </pre>
        </>
    );
}

export default Dashboard;
