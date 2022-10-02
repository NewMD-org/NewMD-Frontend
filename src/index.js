import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/Login';
import { LogoutPage } from './pages/Logout';
import { TablePage } from './pages/Table';


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route index element={<Navigate to="/login" />} />
                <Route path='/*' element={<Navigate to="/login" />} />
                <Route path='/'>
                    <Route path='login' index element={<LoginPage />} />
                    <Route path='logout' index element={<LogoutPage />} />
                    <Route path='table' index element={<TablePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);