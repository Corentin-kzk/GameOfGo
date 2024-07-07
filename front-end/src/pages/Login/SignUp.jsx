import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import '../../styles/Login.css';

const signUpValidationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
});

const SignUpComponent = () => {
  const navigate = useNavigate();

  const mutation = useMutation(async (values) => {
    const response = await fetch('http://localhost:8000/api/auth/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => {
      mutation.mutate(values, {
        onSuccess: (data) => {
          console.log('submitted:', data);
          navigate('/home');
        },
        onError: (error) => {
          console.error('Error:', error);
        },
      });
    },
  });

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}></Grid>
      <div className="container">
        <Container
          component="main"
          maxWidth="xs"
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form onSubmit={formik.handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    autoFocus
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                    sx={{ backgroundColor: 'white' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    sx={{ backgroundColor: 'white' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    sx={{ backgroundColor: 'white' }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="login-button"
                sx={{ mt: 3, mb: 2 }}
              >
                Signup
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Button 
                  href="/login"
                  className="signup"
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </div>
      <Grid item xs={3}></Grid>
    </Grid>
  );
};

export default SignUpComponent;