import config from '../config';
import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import Theme from '../utils/theme';
import { AppBar, Box,
    Button, IconButton, ToggleButtonGroup, ToggleButton,
    Container, Menu, MenuItem,
    Toolbar, Typography, Tooltip, Divider,
    SwipeableDrawer,
    List, ListItem, ListSubheader, ListItemText, ListItemButton, ListItemIcon,
    alpha, useScrollTrigger } from '@mui/material';
import { GitHub, SettingsOutlined, CloseOutlined, DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';

const Header:React.FC = () => {
    const palette = useTheme().palette;
    const scrolled = useScrollTrigger({ // スクロール検知
        disableHysteresis: true
    });
    const darkModeContext = Theme.useDarkMode();
    const changeDarkMode = (event: React.MouseEvent<HTMLElement>, darkMode: boolean) => {
        darkModeContext.setDarkMode(darkMode);
    };
    const [settingMenuState, setSettingMenuState] = React.useState(false);

    return (
    <>
    <AppBar position="sticky" enableColorOnDark sx={(theme) => ({
        background: alpha(theme.palette.background.paper, 0.2),
        backdropFilter: "blur(2px)",
        // height: 80,
        color: theme.palette.text.primary,
        borderBottomStyle: 'solid',
        borderColor: alpha(theme.palette.primary.light, 0.1),
        borderWidth: 1
    })}>
        {/* <Container maxWidth="xxl"> */}
        <Toolbar
        disableGutters
        sx={{
            '@media all': {
                minHeight: 60,
            },
            // margin: '7.5px'
        }}>
        
        <Box component='div' sx={{
            display: 'flex',
            flexGrow: 1
        }}>
            <Box component='img' src={config.imagePath.logo} sx={{
                marginLeft: 2,
                marginRight: 2,
                height: 40,
                }} />
            <Box sx={{
                display: {
                    xs: 'none',
                    sm: 'block'
                }
            }}>
                <Typography
                lineHeight='20px'
                fontSize='20px'
                fontFamily='ZEROxProto'
                textAlign='right'
                >
                    <Box
                    component='a'
                    href='/'
                    color={(theme)=>(theme.palette.text.primary)}>
                        react-theme-template
                    </Box>
                </Typography>
                <Typography
                lineHeight='20px'
                fontSize='20px'
                fontFamily='ZEROxProto'
                textAlign='right'
                >
                    <Box
                    component='a'
                    href='https://kuwa.app/'
                    color={(theme)=>(alpha(theme.palette.text.primary, 0.6))}>
                        kuwa.app
                    </Box>
                </Typography>
            </Box>
        </Box>

        <Tooltip title='GitHub'>
            <IconButton
            size='small'
            sx={(theme)=>({
                marginRight: 1,
                borderStyle: 'solid',
                borderColor: alpha(theme.palette.primary.light, 0.2),
                borderWidth: 1,
                borderRadius: 2,
                height: 32
            })}>
                <a href='https://github.com/kuwacom' target='_brank'>
                    <GitHub fontSize='small' color='primary' />
                </a>
            </IconButton>
        </Tooltip>
        <Tooltip title='設定'>
            <IconButton
            size='small'
            onClick={() => setSettingMenuState(true)}
            sx={(theme)=>({
                marginRight: 2,
                borderStyle: 'solid',
                borderColor: alpha(theme.palette.primary.light, 0.2),
                borderWidth: 1,
                borderRadius: 2,
                height: 32
            })}>
                <SettingsOutlined fontSize='small' color='primary' />
            </IconButton>
        </Tooltip>

            {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {config.pages.map((page) => (
                <Button
                    key={page}
                    sx={{ my: 2, display: 'block' }}
                >
                    {page}
                </Button>
                ))}
            </Box> */}
            
        </Toolbar>
    {/* </Container> */}
    </AppBar>
    
    
    {/* 設定メニュー */}
    <SwipeableDrawer
    anchor='right'
    open={settingMenuState}
    onClose={() => setSettingMenuState(false)}
    onOpen={() => setSettingMenuState(true)}
    sx={{
        backdropFilter: "blur(2px)",
    }}
    PaperProps={{
        sx: (theme) => ({
            backdropFilter: "blur(2px)",
            background: alpha(theme.palette.background.paper, 0.8),
            borderLeftStyle: 'solid',
            borderColor: alpha(theme.palette.primary.light, 0.1),
            borderWidth: 1
        }),
    }}
    >
        <Box>
        <List
        // これすることで一番上の隙間をなくせる
        subheader={<li />}
        >
            <ListItem>
                <ListItemText
                    primary="設定"
                />
                <Divider orientation='vertical' variant='middle' flexItem />
                <Tooltip title="閉じる">
                <IconButton onClick={() => setSettingMenuState(false)}>
                    <CloseOutlined color='primary'/>
                </IconButton>
                </Tooltip>
            </ListItem>
            <Divider />

            <ListSubheader>カラーテーマ</ListSubheader>
            <ListItem>
            <ToggleButtonGroup
            color='primary'
            value={palette.mode == 'dark'}
            exclusive
            onChange={changeDarkMode}
            aria-label='theme'
            >
            <ToggleButton value={true}><DarkModeOutlined />Dark</ToggleButton>
            <ToggleButton value={false}><LightModeOutlined />Light</ToggleButton>
            </ToggleButtonGroup>
            </ListItem>
        
        </List>
        </Box>
    </SwipeableDrawer>
    </>
    )
}

export default Header;