import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import './Navbar.css';
import {useMutation} from "react-query";
import {signOut} from "../../services/api/auth";

const Navbar = () => {
    const { isConnected, handleSignOut } = React.useContext(AuthContext);
    const navigate = useNavigate();

    const signOutMutation = useMutation(
       signOut, {
    onSuccess: (data) => {
        handleSignOut()
        navigate('/login');
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
    },
  });
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" className="app-bar" />
        <Drawer className="drawer" variant="permanent" anchor="left">
          <Toolbar className='app-bar'>
            <Typography variant="h6" noWrap component="div">
              Tsumego
            </Typography>
          </Toolbar>
          <Divider />
          <List className="nav-list">
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to="/home" className="nav-link" activeClassName="active">
                <ListItemIcon>
                  <HomeIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            {!isConnected && (
              <>
                <ListItem disablePadding>
                  <ListItemButton component={NavLink} to="/login" className="nav-link" activeClassName="active">
                    <ListItemIcon>
                      <LoginIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={NavLink} to="/signup" className="nav-link" activeClassName="active">
                    <ListItemIcon>
                      <PersonAddIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Signup" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
          <Box sx={{ flexGrow: 1 }} />
          {isConnected && (
            <List className="nav-list">
              <ListItem disablePadding>
                <ListItemButton
                  component={NavLink}
                  to="/home"
                  className="nav-link"
                  activeClassName="active"
                  onClick={() => signOutMutation.mutate()}
                >
                  <ListItemIcon>
                    <LogoutIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Disconnect" />
                </ListItemButton>
              </ListItem>
            </List>
          )}
        </Drawer>
      </Box>
    );
  };
  
  export default Navbar;