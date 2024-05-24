import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import logo from "../../assets/logo.svg";
import { Divider } from "@mui/material";

const pages = ["Home", "Resturants", "why us"];
const settings = ["Profile", "Logout"];

function NavBar() {
  const isUser = true;
  const cartitems = 8;
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "inherit" }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters sx={{height:"112px"}}>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              justifyContent: "start",
              flexGrow: 100,
            }}
          >
            <Button>
              <img src={logo} alt="" />
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "#0a0a0a" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              <Divider/>
                {!isUser&&<MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" color="primary">log in</Typography>
                </MenuItem>}
                {isUser&&
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" color="primary">log out</Typography>
                </MenuItem>
                }
            </Menu>
          </Box>
          <Button
            sx={{ display: { xs: "flex", md: "none" },position:"absolute", left:"50%" , translate:"-50%" ,mr: 3, flexGrow: 100 }}
          >
            <img src={logo} alt="" />
          </Button>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  marginInline: "1rem",
                  display: "block",
                  color: "#0a0a0a",
                  fontWeight: "700",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Button >
            <svg
              width="24"
              height="64"
              viewBox="0 0 24 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 38C15.89 38 15 38.89 15 40C15 40.5304 15.2107 41.0391 15.5858 41.4142C15.9609 41.7893 16.4696 42 17 42C17.5304 42 18.0391 41.7893 18.4142 41.4142C18.7893 41.0391 19 40.5304 19 40C19 39.4696 18.7893 38.9609 18.4142 38.5858C18.0391 38.2107 17.5304 38 17 38ZM1 22V24H3L6.6 31.59L5.24 34.04C5.09 34.32 5 34.65 5 35C5 35.5304 5.21071 36.0391 5.58579 36.4142C5.96086 36.7893 6.46957 37 7 37H19V35H7.42C7.3537 35 7.29011 34.9737 7.24322 34.9268C7.19634 34.8799 7.17 34.8163 7.17 34.75C7.17 34.7 7.18 34.66 7.2 34.63L8.1 33H15.55C16.3 33 16.96 32.58 17.3 31.97L20.88 25.5C20.95 25.34 21 25.17 21 25C21 24.7348 20.8946 24.4804 20.7071 24.2929C20.5196 24.1054 20.2652 24 20 24H5.21L4.27 22M7 38C5.89 38 5 38.89 5 40C5 40.5304 5.21071 41.0391 5.58579 41.4142C5.96086 41.7893 6.46957 42 7 42C7.53043 42 8.03914 41.7893 8.41421 41.4142C8.78929 41.0391 9 40.5304 9 40C9 39.4696 8.78929 38.9609 8.41421 38.5858C8.03914 38.2107 7.53043 38 7 38Z"
                fill="#111111"
              />
            </svg>
            {!!cartitems && (
              <Box
                sx={{
                  height: "24px",
                  width: "24px",
                  borderRadius: "50%",
                  bgcolor: "black",
                  color: "white",
                }}
              >
                {cartitems}
              </Box>
            )}
          </Button>
          {isUser && (
            <Button >
              <svg
                width="24"
                height="64"
                viewBox="0 0 24 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.6499 40.6251C21.5841 40.7391 21.4894 40.8338 21.3753 40.8997C21.2613 40.9655 21.1319 41.0001 21.0002 41.0001H3.00021C2.86862 41 2.73938 40.9652 2.62548 40.8993C2.51157 40.8335 2.417 40.7388 2.35127 40.6248C2.28553 40.5108 2.25094 40.3815 2.25098 40.2499C2.25101 40.1183 2.28566 39.9891 2.35146 39.8751C3.77927 37.4067 5.97958 35.6367 8.54739 34.7976C7.27724 34.0415 6.29041 32.8893 5.73845 31.518C5.18648 30.1468 5.09991 28.6322 5.49203 27.207C5.88414 25.7818 6.73326 24.5247 7.90898 23.6287C9.0847 22.7328 10.522 22.2476 12.0002 22.2476C13.4784 22.2476 14.9157 22.7328 16.0914 23.6287C17.2672 24.5247 18.1163 25.7818 18.5084 27.207C18.9005 28.6322 18.8139 30.1468 18.262 31.518C17.71 32.8893 16.7232 34.0415 15.453 34.7976C18.0208 35.6367 20.2211 37.4067 21.649 39.8751C21.7149 39.989 21.7497 40.1183 21.7499 40.25C21.7501 40.3816 21.7156 40.511 21.6499 40.6251Z"
                  fill="#111111"
                />
              </svg>
            </Button>
          )}
          {!isUser && (
            <>
              {" "}
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  width: "192px",
                  borderRadius: "50px",
                  marginInline: "1rem",
                  display: { xs: "none", lg: "flex" },
                }}
              >
                sign up
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: "192px",
                  borderRadius: "50px",
                  marginInline: "1rem",
                  display: { xs: "none", md: "flex" },
                }}
              >
                sign in
              </Button>
            </>
          )}
          {isUser && (
            <>
              {" "}
              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: "192px",
                  borderRadius: "50px",
                  marginInline: "1rem",
                  display: { xs: "none", md: "flex" },
                }}
              >
                sign out
              </Button>
            </>
          )}

          {/* <Box sx={{ flexGrow: 0, display: { md: "none", xs: "flex" } }}>
            {isUser && (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
