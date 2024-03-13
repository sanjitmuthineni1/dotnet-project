import { Badge, ShoppingCart } from "@mui/icons-material";
import { AppBar, Typography, Toolbar, Switch, List, ListItem, IconButton, Box } from "@mui/material";
import { NavLink } from "react-router-dom";


const midLink = [
    {title: 'catalog', path: '/catalog'},
    {title: 'about', path: '/about'},
    {title: 'contact', path: '/contact'}
]

const rightLink = [
    {title: 'login', path: '/login'},
    {title: 'register', path: '/register'},
]

const navStyles = {
    color: 'inherit',
    textDecoration: 'none', 
    fontSize: 18,
    '&:hover': {
        color: '#9E9E9E'
    },
    '&.active': {
        color: '#9E9E9E'
    }
}


interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}
export default function Header({darkMode, handleThemeChange}: Props) {
    return (
        <AppBar position='static' sx={{mb: 4}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

                <Box display='flex' alignItems='center'>
                    <Typography variant='h6' component={NavLink}
                    to='/'
                    sx={navStyles}
                    >
                        SANJIT'S GOLF SHOP
                    </Typography>
                    <Switch checked={darkMode} onChange={handleThemeChange}/>
                </Box>

                <Box display='flex' alignItems='center'>
                    <List sx={{display: 'flex'}}>
                        {midLink.map(({title, path}) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Box display='flex' alignItems='center'> 
                    <IconButton size='large' edge='start' color='inherit' sx={{mr: 2}}>
                            <Badge>
                                <ShoppingCart />
                            </Badge>
                    </IconButton>
                    <List sx={{display: 'flex'}}>
                        {rightLink.map(({title, path}) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Toolbar>
        </AppBar>
    )
}