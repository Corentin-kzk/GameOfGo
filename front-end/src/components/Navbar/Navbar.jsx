import * as React from 'react';
import { NavLink } from 'react-router-dom';
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

const drawerWidth = 240;

const Navbar = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className="app-bar"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
      </AppBar>
      <Drawer
        className="drawer"
        variant="permanent"
        anchor="left"
      >
        <Toolbar className='app-bar'>
          <Typography variant="h6" noWrap component="div">
            Tsumego
          </Typography>
        </Toolbar>
        <Divider />
        <List className="nav-list">
          {[
            { text: 'Home', icon: <HomeIcon sx={{ color: 'white' }} />,},
            { text: 'Login', icon: <LoginIcon sx={{ color: 'white' }} /> },
            { text: 'Signup', icon: <PersonAddIcon sx={{ color: 'white' }} /> }
          ].map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={NavLink} to={`/${item.text.toLowerCase()}`} className="nav-link" activeClassName="active">
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} /> {/* This will push the disconnect button to the bottom */}
        <List className="nav-list">
          <ListItem key="Disconnect" disablePadding>
            <ListItemButton component={NavLink} to="/disconnect" className="nav-link" activeClassName="active">
              <ListItemIcon>
                <LogoutIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Disconnect" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        
      </Box>
    </Box>
  );
};

export default Navbar;