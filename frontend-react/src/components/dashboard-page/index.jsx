import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

import { Hometasks } from "../hometasks";
import { Dashboards } from "../dashboards";
import { Ideas } from "../ideas";
import { HometaskPage } from "../hometask-page";
import { Submissions } from "../submissions";

import { useGetOnlyMeQuery } from "../../slices/getAllUsersSlice";

const drawerWidth = 240;

const tabs = [
  {
    name: "Дэшборды",
    id: "dashboards",
    icon: <DashboardIcon htmlColor="#e01425" />,
  },
  {
    id: "hometasks",
    name: "Домашки",
    icon: <HomeIcon htmlColor="#e01425" />,
  },
  {
    id: "ideas",
    name: "Идеи",
    icon: <EmojiObjectsIcon htmlColor="#e01425" />,
  },
];

export const DashboardPage = () => {
  const { data } = useGetOnlyMeQuery();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{ backgroundColor: (theme) => theme.nfaDefaultColor }}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            nFactorial Incubator
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {tabs.map((currentTab) => (
              <ListItem key={currentTab.id} disablePadding>
                <ListItemButton component={Link} to={currentTab.id}>
                  <ListItemIcon>{currentTab.icon}</ListItemIcon>
                  <ListItemText primary={currentTab.name} />
                </ListItemButton>
              </ListItem>
            ))}
            {data && data.role === "mentor" && (
              <ListItem disablePadding>
                <ListItemButton component={Link} to="submissions">
                  <ListItemIcon>
                    <DriveFileRenameOutlineIcon htmlColor="#e01425" />
                  </ListItemIcon>
                  <ListItemText primary="Материалы" />
                </ListItemButton>
              </ListItem>
            )}
          </List>

          <Divider />
          <List>
            {["Настройки", "Выход"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? (
                      <SettingsIcon htmlColor="#e01425" />
                    ) : (
                      <ExitToAppIcon htmlColor="#e01425" />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/*">
            <Route index element={<Dashboards />} />
            <Route path="dashboards" element={<Dashboards />} />

            <Route path="hometasks" element={<Hometasks />}>
              <Route path=":hometaskID" element={<HometaskPage />}></Route>
            </Route>

            <Route path="ideas" element={<Ideas />} />
            <Route path="submissions" element={<Submissions />} />
          </Route>
        </Routes>
      </Box>
    </Box>
  );
};
