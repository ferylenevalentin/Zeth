import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './Sidebar.css';
import './AddUser.css';
import { Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';

function AddUser() {
    const [users, setUsers] = useState([]); // State to store users

    // Fetch users when the component mounts
    useEffect(() => {
        fetchUsers();
    }, []);

    // Function to fetch users from the backend
    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:1337/fetchusers");
            setUsers(response.data); // Update the users state
            console.log("Fetched users:", response.data); // Log the fetched users
        } catch (error) {
            console.error("Error fetching users:", error); // Log any errors
        }
    };

    return (
        <div className="container">
            <Sidebar />
            <div className="Buttons">
                <Typography variant="h2">VIEW USERS</Typography>
                <hr />

                <div className="view">
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <Card key={index}>
                                <CardContent>
                                    <h3>User Id: {user.id}</h3>
                                    <p>First Name: {user.firstName}</p>
                                    <p>Middle Name: {user.middleName}</p>
                                    <p>Last Name: {user.lastName}</p>
                                    <p>Email: {user.email}</p>
                                    <p>Password: {user.password}</p>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Typography>No users available</Typography>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddUser;