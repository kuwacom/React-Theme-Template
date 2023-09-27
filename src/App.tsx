import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CssBaseline, ThemeProvider, useMediaQuery, GlobalStyles } from '@mui/material';

import Header from './components/Header';
import Home from './pages/Home';
import Theme from './Theme';

const App: React.FC = () => {
    const [darkMode, setDarkMode] = React.useState(false);    
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    
    React.useEffect(() => {
        if (localStorage.getItem('darkMode') === 'true') {
            setDarkMode(true);
        } else if (localStorage.getItem('darkMode') === 'false') {
            setDarkMode(false);
        } else if (prefersDarkMode) { // クライアントのtheme
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
    }, [prefersDarkMode]);
    
    const colorMode = React.useMemo(
        () => ({
            toggleDarkMode: () => {
                setDarkMode((prevDarkMode: boolean) => {
                    if (prevDarkMode) {
                        localStorage.setItem('darkMode', 'false');
                        return false;
                    } else {
                        localStorage.setItem('darkMode', 'true');
                        return true;
                    }
                });
            },
            setDarkMode: (darkMode: Boolean) => {
                setDarkMode(() => {
                    if (darkMode) {
                        localStorage.setItem('darkMode', 'true');
                        return true;
                    } else {
                        localStorage.setItem('darkMode', 'false');
                        return false;
                    }
                });
            },
            state: darkMode,
        }),
        []
    );
    
    return (
        <Theme.DarkModeContext.Provider value={colorMode}>
        <ThemeProvider theme={Theme.Theme(darkMode)}>
        <CssBaseline />
        <GlobalStyles styles={(theme) => ({
            a: {
                color: theme.palette.secondary.light,
                textDecoration: 'none',
                transition: '0.2s'
            },
            'a:hover': {
                color: theme.palette.secondary.dark
            }
        })} />
            <Header />
            
            <BrowserRouter>
            <Routes>
                
                <Route path="/" Component={Home} />
                {/* <Router.Route path="/a" Component={App} /> */}

            </Routes>
            </BrowserRouter>
        
        </ThemeProvider>
        </Theme.DarkModeContext.Provider>
    )
}

export default App;