import React from 'react';
import { Container } from '@mui/material';
import './App.css'
import Navbar from './components/Navbar/Navbar';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MyProfile from './components/Profile/MyProfile';
import UserProfile from './components/Profile/UserProfile';
import Error from './components/404ErrorPage/Error';

import { Toaster } from 'react-hot-toast';


const App = () => {

    function osTheme() {
        let primarytheme = "";
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            primarytheme = "dark";
        }
        else {
            primarytheme = "light"
        }
        return primarytheme;
    }

    const [colscheme, setcolscheme] = React.useState(osTheme());

    const prefersDarkMode = useMediaQuery(`(prefers-color-scheme: ${colscheme})`);
    const theme = React.useMemo(() => createTheme({
        palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
            primary: {
                main: "#FD5D5D",
            },
        },
    }),
        [prefersDarkMode],
    );

    return (
        <>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Navbar colscheme={colscheme} setcolscheme={setcolscheme} />
                    <Container maxWidth="lg">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/auth" element={<Auth />} />
                            <Route path="/post/:id" element={<PostDetails />} />
                            <Route path="/search" element={<Home />} />
                            <Route path="/myprofile" element={<MyProfile />} />
                            <Route path="/profile/:userId" element={<UserProfile />} />
                            <Route path='/*' element={<Error />} />
                        </Routes>
                        <Toaster position="bottom-center" reverseOrder={false} toastOptions={{ duration: 5000 }} />
                    </Container>
                </ThemeProvider>
            </BrowserRouter>
        </>
    )
}

export default App;