import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import insta from '../assets/insta.jpg';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import { AuthContext } from '../context/AuthWrapper';
import { useRouter } from 'next/router';
import Link from 'next/link'
import { Tooltip } from '@mui/material';

const ResponsiveAppBar = ({userdata}) => { //accepting userdata from feed to show as avatar

  const { logout } = React.useContext(AuthContext);
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async()=>{
    await logout();
    router.push('/login');  //instead in react use -> import useNavigate and use navigate('/login') and attach onCilck listener on component
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl" className='navbar'>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
            }}
          >
            <Image src={insta} height={55} width={200}></Image>
            {/* here we can write height and wdth in JSX withour style={{}} as Image tag is of next */}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
          </Box>

          <Box sx={{ flexGrow: 0 }} className='navicons-container'>
            <Link href={'/'}><HomeIcon fontSize='large' className='navicons' /></Link>
            {/* <ExploreIcon fontSize='large' className='navicons' /> */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* for inline css in mui we use sx */}
                <Avatar alt="Remy Sharp" src={userdata?.photourl} sx={{ margin: "0.5rem" }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

{/* to make only 1 func when onClick we use onClick={handleCloseUserMenu}, to make more than 1 func. to execute we use arrow func. */}
              <MenuItem onClick={handleCloseUserMenu}>
                <Link href="/profile">
                  <Typography textAlign="center">Profile</Typography>
                </Link>
                {/* //in React import useNavigate from react-router-dom and call it and store it in var history then use history('/profile') */}

              </MenuItem>
              <MenuItem onClick={()=>{
                handleLogout()
                handleCloseUserMenu()
              }}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
