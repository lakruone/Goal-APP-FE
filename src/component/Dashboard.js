import React, { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import axios from "axios";

const Dashboard = () => {
    const {
        logout,
        user,
        getAccessTokenSilently
      } = useAuth0();

    const [userEmail, setUserEmail] = useState(null);
    const [students, setStudents] = useState(null);
    const [responseData, setResponseData] = useState(null);

    useEffect(()=>{
        if (user) {
            setUserEmail(user.email)
        }
    },[user])

    const CallProtectedAPI = async() => {
        try {
        clearData();
        const token = await getAccessTokenSilently();
        console.log(token);
        const response = await axios.get('http://localhost:4300/protected/', {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        setResponseData(response.data.message);
            
        } catch (error) {
            console.log(error.message);
            setResponseData(error.message);
        }
    }

    const getStudentList = () => {
        clearData();
        axios
        .get('http://localhost:4300/student/')
        .then( res => {
            setStudents(res.data.rows);
        })
        .catch( error => console.log(error.message));
    }

    const CallPublicAPI = async() => {
        try {
            clearData();
            const response = await axios.get('http://localhost:4300/');
            console.log(response.data);
            setResponseData(response.data.message);
            } catch (error) {
                console.log(error.message);
            }
    }

    const clearData = () => {
        setStudents(null);
        setResponseData(null);
    }
    return (
        <>
        <button className="logout-button" onClick={logout}>Logout </button>
        <h2>Dashboard</h2>
        {/* <pre style={{textAlign: 'start', fontSize:'20px'}}>
        {JSON.stringify(user, null, 2)}
        </pre> */}
        <p style={{fontSize: '20px'}}>{userEmail && userEmail}</p>
        <button className="protected" onClick={CallProtectedAPI}> Call Protected API</button>
        <button className="public" onClick={CallPublicAPI}> Call Public API</button>
        <button className="student-list" onClick={getStudentList}> Get student List</button>
        <button className="clear" onClick={clearData} disabled={!students && !responseData} >Clear</button>

        {students &&
            <table>
                <tbody>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Age</th>
                </tr>
                {students.map( student => (
                <tr key={student.id}>
                    <td>{student.firstname}</td>
                    <td>{student.lastname}</td>
                    <td>{student.age}</td>
                </tr>))
                }
                </tbody>
            </table>
        }
        {responseData &&
            // <h4> {responseData}</h4>
            <pre className="res-data">{JSON.stringify(responseData, null, 2)} </pre>
        }
        
        </>
    );
}

export default Dashboard;
