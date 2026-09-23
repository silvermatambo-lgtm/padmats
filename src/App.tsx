import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PWAInstall from './components/PWAInstall';
import MobileBottomMenu from './components/MobileBottomMenu';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Home from './pages/Home';
import ContentPage from './pages/ContentPage';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

function ServiceWorkerRegistrar(){useEffect(()=>{if('serviceWorker'in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}))}},[]);return null}
export default function App(){return <BrowserRouter><ServiceWorkerRegistrar/><LoadingScreen/><div className="min-h-screen flex flex-col"><Navbar/><main className="flex-1"><Routes>
<Route path="/" element={<Home/>}/>
<Route path="/namibia" element={<ContentPage type="namibia"/>}/><Route path="/namibia/self-drive" element={<ContentPage type="selfdrive"/>}/><Route path="/stay-in-namibia" element={<ContentPage type="stay"/>}/><Route path="/car-hire-4x4" element={<ContentPage type="car"/>}/><Route path="/journeys" element={<ContentPage type="journeys"/>}/><Route path="/seven-churches-2027" element={<ContentPage type="churches"/>}/><Route path="/travel-guides" element={<ContentPage type="guides"/>}/><Route path="/plan-book" element={<ContentPage type="plan"/>}/><Route path="/about" element={<ContentPage type="about"/>}/><Route path="/legal" element={<ContentPage type="legal"/>}/><Route path="/contact" element={<Contact/>}/><Route path="/admin" element={<Admin/>}/><Route path="*" element={<Home/>}/>
</Routes></main><Footer/></div><FloatingWhatsApp/><PWAInstall/><MobileBottomMenu/><ScrollToTop/></BrowserRouter>}
