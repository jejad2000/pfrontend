import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotesPage from '../pages/NotesPage';

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
        path="/notes"
        element={
            <ProtectedRoute>
                <NotesPage />
            </ProtectedRoute>
        }
        />
    </Routes>
);

export default AppRoutes;