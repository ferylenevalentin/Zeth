import React, { useRef, useState } from 'react';
import { Button, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const idRef = useRef();
    const firstNameRef = useRef();
    const middleNameRef = useRef();
    const lastNameRef = useRef();
    const signUpEmailRef = useRef();
    const signUpPasswordRef = useRef();

    const [openSignUp, setOpenSignUp] = useState(false);

    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = async () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try {
            const response = await axios.post("http://localhost:1337/login", { email, password });
            alert('Login successful!');
            console.log('Logged in user:', response.data);

            // Redirect to the dashboard
            navigate('/dashboard'); // Replace '/dashboard' with your actual dashboard route
        } catch (error) {
            console.error('Error during login:', error);
            if (error.response && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('Failed to login. Please try again.');
            }
        }
    };

   const handleSignUp = async () => {
    const newUser = {
        id: idRef.current.value,
        firstName: firstNameRef.current.value,
        middleName: middleNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: signUpEmailRef.current.value,
        password: signUpPasswordRef.current.value,
    };

    // Validation
    if (!newUser.id || isNaN(newUser.id)) {
        alert("ID Number is required and must be a number.");
        return;
    }
    if (!newUser.firstName) {
        alert("First Name is required.");
        return;
    }
    if (!newUser.lastName) {
        alert("Last Name is required.");
        return;
    }
    if (!newUser.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
        alert("A valid Email is required.");
        return;
    }
    if (!newUser.password) {
        alert("Password is required.");
        return;
    }

    try {
        const response = await axios.post("http://localhost:1337/signup", newUser);
        alert('Sign-up successful!');
        setOpenSignUp(false);
        idRef.current.value = '';
        firstNameRef.current.value = '';
        middleNameRef.current.value = '';
        lastNameRef.current.value = '';
        signUpEmailRef.current.value = '';
        signUpPasswordRef.current.value = '';
    } catch (error) {
        console.error("Error during sign-up:", error);
        alert("Failed to sign up. Please try again.");
    }
};

     

    return (
        <Box className="login-container">
            <Box className="login-box">
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <TextField
                    inputRef={emailRef}
                    label="Email"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    inputRef={passwordRef}
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
                    Login
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => setOpenSignUp(true)} fullWidth>
                    Sign Up
                </Button>
            </Box>

            {/* Sign-Up Modal */}
            <Dialog
    open={openSignUp}
    onClose={() => setOpenSignUp(false)}
    className="signup-modal"
    PaperProps={{
        style: {
            width: '600px', // Adjust the width
            maxWidth: '90%', // Ensure it doesn't exceed the screen width
            padding: '20px', // Add padding for better spacing
        },
    }}
>
                <DialogTitle>Sign Up</DialogTitle>
                <DialogContent>
                    <TextField
                        inputRef={idRef}
                        label="ID Number"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        inputRef={firstNameRef}
                        label="First Name"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        inputRef={middleNameRef}
                        label="Middle Name"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        inputRef={lastNameRef}
                        label="Last Name"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        inputRef={signUpEmailRef}
                        label="Email"
                        
                    />
                    <TextField
                        inputRef={signUpPasswordRef}
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenSignUp(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSignUp} color="primary">
                        Sign Up
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Login;