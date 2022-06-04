import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import logo from "../../assets/nFactorialLogo.png";
import { Link as RouterLink, Outlet } from "react-router-dom";
import { Link } from "@mui/material";

export const PublicAppBar = () => {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img src={logo} alt="logo" width={50} height={50} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Summer School
            </Typography>

            <Box display="flex" flexDirection="column" alignItems="center">
              <Button
                style={{ color: "white" }}
                component={RouterLink}
                to="/signup"
              >
                Зарегистрироваться!
              </Button>

              <Box display="flex" justifyContent="center">
                <Typography style={{ fontSize: "10px", color: "white" }}>
                  Уже зарегистированы?
                </Typography>
                <Link
                  style={{
                    marginLeft: "1rem",
                    fontSize: "10px",
                    color: "white",
                  }}
                  component={RouterLink}
                  to="/login"
                >
                  Войти
                </Link>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
};
