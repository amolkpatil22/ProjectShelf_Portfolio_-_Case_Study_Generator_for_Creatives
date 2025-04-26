import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../pages/landing/Landing';

const Navigation: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
        </Routes>
    );
};

export default Navigation;