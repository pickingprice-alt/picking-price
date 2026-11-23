import React from 'react';
import {createRoot} from 'react-dom/client';
import Workspace from '../app/market/workspace';
import AdminApp from '../app/market/admin-app';
import LoginPage from '../app/pages/login';
import SignupPage from '../app/pages/signup';
import ForgotPasswordPage from '../app/pages/forgot-password';
import LegalPage from '../app/pages/legal';
import '../app/globals.css';

// One page for the whole site: the screen is picked from the address.
const path = location.pathname.replace(/\/+$/, '') || '/';
const product = path.match(/^\/product\/([^/]+)$/);
if (product) location.replace('/?product=' + encodeURIComponent(decodeURIComponent(product[1])));
const screens: Record<string, React.ReactNode> = {
    '/admin': <AdminApp/>,
    '/login': <LoginPage/>,
    '/signup': <SignupPage/>,
    '/forgot-password': <ForgotPasswordPage/>,
    '/privacy': <LegalPage kind="privacy"/>,
    '/terms': <LegalPage kind="terms"/>,
};
const titles: Record<string, string> = { '/privacy': 'Privacy Policy — Picking Price', '/terms': 'Terms of Service — Picking Price' };
if (titles[path]) document.title = titles[path];
if (!product) createRoot(document.getElementById('root')!).render(screens[path] ?? <Workspace/>);

// Load Botpress chatbot
const script1 = document.createElement('script');
script1.src = 'https://cdn.botpress.cloud/webchat/v5.0/inject.js';
document.body.appendChild(script1);

const script2 = document.createElement('script');
script2.src = 'https://files.bpcontent.cloud/2026/11/23/13/20261123133015-C6I6ABV7.js';
script2.defer = true;
document.body.appendChild(script2);
