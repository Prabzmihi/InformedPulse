import { Person, Search } from '@mui/icons-material'
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonProfileImage from '../../assets/person/person1.jpg'
import React, { useEffect, useState } from 'react'
import './topbar.css'
import Logo from '../../assets/logo/logo.png'
import { Menu, MenuItem } from '@mui/material';
import Person2Icon from '@mui/icons-material/Person2';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../../api';
import useApi from '../../hooks/useApi';

const TopBar = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const { data: logoutStatus, error, loading, fetchData } = useApi(userLogout);

    useEffect(() => {
        if (logoutStatus?.message === 'Successfully logged out') {
            localStorage.removeItem('access_token');
            window.location.href = '/login';
        } else if (logoutStatus) {
            alert('Unable to logout');
        }
    }, [logoutStatus]);

    // Open the dropdown menu
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Close the dropdown menu
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Handle specific menu actions
    const handleLogout = async () => {
        // Clear token from storage and redirect

        try {
            await fetchData();
        } catch (error) {
            alert('Something went wrong')
        }
    };

    const handleProfileRedirect = () => {
        handleMenuClose();
        navigate('/updateProfile')
    }

  return (
    <div className='topBarContainer'>
        <div className="topBarLeft">
                <img src={Logo} alt='' className='logo' />
        </div>
        <div className="topBarCenter">
            <div className="searchBar">
                <Search className='searchIcon' />    
                <input type="text" placeholder='Search for news' className="searchInput" />
            </div>
        </div>
        <div className="topBarRight">
            {/* <div className="topBarIcons">
                <div className="topBarIconItem">
                    <NotificationsIcon />
                    <span className="topBarIconBadge">1</span>
                </div>
            </div> */}
            <div className="profileIconImageContainer">
            <img 
                src={PersonProfileImage} 
                alt='profile picture' 
                className='topBarImg' 
                onClick={handleMenuOpen}
            />
            </div>
        </div>
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            disableAutoFocus
            disableEnforceFocus
            sx={{
                '& .MuiPaper-root': {
                  width: '200px', // Set the desired width
                },
              }}
        >
            <MenuItem onClick={handleProfileRedirect}> <Person2Icon /> Profile </MenuItem>
            <MenuItem onClick={handleLogout}> <LogoutIcon /> Logout</MenuItem>
      </Menu>
    </div>
  )
}

export default TopBar
