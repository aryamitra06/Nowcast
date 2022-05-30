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

const App = () => {
    return (
        <>
            <BrowserRouter>
                    <Navbar />
                <Container maxWidth="lg">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/auth" element={<Auth />}/>
                        <Route path="/post/:id" element={<PostDetails/>}/>
                        <Route path="/search" element={<Home />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </>
    )
}

export default App;