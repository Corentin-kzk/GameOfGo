import React from 'react';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import '../../styles/Login.css';
import '../../styles/global.css';
import loginValidationSchema from '../../validation/loginValidationSchema';

const SignIn = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:8000/api/auth/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        document.cookie = `token=${data.token}; path=/`;
        console.log('Logged in:', data);
        navigate('/home');
      } catch (error) {
        console.error('Error:', error);
      }
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
      <Box className="container">
        <Container component="main" maxWidth="xs">
          <Box className="box">
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form onSubmit={formik.handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
                sx={{ backgroundColor: 'white' }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                sx={{ backgroundColor: 'white' }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                className="login-button"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Button
                    className="signup"
                    href="/signup">
                    {'Signup'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </Box>
    </Grid>
  );
};

export default SignIn;