import { AppBar, Typography, Toolbar, FormGroup, FormControlLabel, Switch } from "@mui/material";

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}
export default function Header({darkMode, handleThemeChange}: Props) {
    return (
        <AppBar position='static' sx={{mb: 4}}>
            <Toolbar>
                <Typography variant='h6'>
                    SANJIT'S GOLF SHOP
                </Typography>
                <Switch checked={darkMode} onChange={handleThemeChange}/>
            </Toolbar>
        </AppBar>
    )
}