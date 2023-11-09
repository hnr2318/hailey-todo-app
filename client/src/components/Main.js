import * as React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ChecklistIcon from '@mui/icons-material/Checklist';
import NotesIcon from '@mui/icons-material/Notes';
import TaskIcon from '@mui/icons-material/Task';
import { NavLink, useLocation } from 'react-router-dom';
import { CssBaseline, Tooltip, Avatar, Typography, Toolbar, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Drawer, Divider, Box, AppBar, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const drawerWidth = 240;

export default function Main(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [lists, setLists] = useState(() => JSON.parse(localStorage.getItem("lists")) ?? []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
        setLists(() => JSON.parse(localStorage.getItem("lists")))
    }, [useLocation().pathname])

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem disablePadding>
                    <NavLink className="navLinks" to="/">
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </NavLink>
                </ListItem>
                <ListItem disablePadding>
                    <NavLink className="navLinks" to="/collection/lists">
                        <ListItemButton>
                            <ListItemIcon>
                                <ChecklistIcon />
                            </ListItemIcon>
                            <ListItemText primary="Manage Lists" />
                        </ListItemButton>
                    </NavLink>
                </ListItem>
                <ListItem disablePadding>
                    <NavLink className="navLinks" to="/collection/tasks">
                        <ListItemButton>
                            <ListItemIcon>
                                <TaskIcon />
                            </ListItemIcon>
                            <ListItemText primary="Manage Tasks" />
                        </ListItemButton>
                    </NavLink>
                </ListItem>
                <ListItem disablePadding>
                    <NavLink className="navLinks" to="/collection/notes">
                        <ListItemButton>
                            <ListItemIcon>
                                <NotesIcon />
                            </ListItemIcon>
                            <ListItemText primary="Manage Notes" />
                        </ListItemButton>
                    </NavLink>
                </ListItem>
            </List>
            <Divider />
            <List>
                {lists && lists.map((list) => (
                    <ListItem key={list._id} disablePadding>
                        <NavLink className="navLinks" to={`/single/list/${list._id}`}>
                            <ListItemButton>
                                <ListItemIcon>
                                <ArrowRightIcon/>
                            </ListItemIcon>
                                <ListItemText primary={list.name} />
                            </ListItemButton>
                        </NavLink>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar style={{ justifyContent: 'right' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box style={{ display: 'flex' }}>
                        {Object.keys(props.user).length === 0 ? <>
                            <NavLink className="horSpace navLinks" to="/signup"><Typography variant="h6" style={{ color: "white" }}>Signup</Typography></NavLink>
                            <NavLink className="horSpace navLinks" to="/login"><Typography variant="h6" style={{ color: "white" }}>Login</Typography></NavLink>
                        </>
                            :
                            <Tooltip title="View Profile">
                                <NavLink className="horSpace" to="/me">
                                    <IconButton sx={{ p: 0 }}>
                                        <Avatar alt={props.user.name} src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </NavLink>
                            </Tooltip>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
            </Box>
        </Box>
    );
}

Main.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

