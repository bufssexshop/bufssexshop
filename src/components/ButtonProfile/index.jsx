import { useState } from 'react';
import Menu from '@mui/material/Menu';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logout from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';

const ButtonProfile = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user-bufs');
    localStorage.removeItem('token-bufs');
    dispatch({type: 'USER_LOGOUT', payload: ''});
    history.push('/home');
  }

  return (
    <>
      <Tooltip title="Mi perfíl">
        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: '#ff7bac',
            }}
            className="button_profile"
          >
            P
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar
            sx={{
              bgcolor: '#ff7bac',
            }}
          />
          <Link href="/profile" underline="none" sx={{color: '#000'}}>
            Perfil
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: '#ff7bac' }} />
          </ListItemIcon>
          Salir
        </MenuItem>
      </Menu>
    </>
  )
}

export default ButtonProfile;
