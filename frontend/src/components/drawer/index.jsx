import * as React from "react";
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

import { Hometasks } from "../hometasks";
import { Dashboards } from "../dashboards";
import { Ideas } from "../ideas";

const drawerWidth = 240;

const tabs = [
  {
    id: 1,
    name: "Дэшборды",
  },
  {
    id: 2,
    name: "Домашки",
  },
  {
    id: 3,
    name: "Идеи",
  },
];

export const ClippedDrawer = () => {
  const [tab, setTab] = React.useState(1);

  const handleTabChange = (tabId) => {
    setTab(tabId);
  };

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
                <ListItemButton onClick={() => handleTabChange(currentTab.id)}>
                  <ListItemIcon>
                    {currentTab.id === 1 ? (
                      <DashboardIcon />
                    ) : currentTab.id === 2 ? (
                      <HomeIcon />
                    ) : (
                      currentTab.id === 3 && <EmojiObjectsIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={currentTab.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["Настройки", "Выход"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <SettingsIcon /> : <ExitToAppIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        {tab === 1 && <Dashboards />}
        {tab === 2 && <Hometasks />}
        {tab === 3 && <Ideas />}
      </Box>
    </Box>
  );
};
