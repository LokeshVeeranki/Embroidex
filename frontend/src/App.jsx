import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';

// Global Components
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import ScrollToTop from './ScrollToTop';

// Auth
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Home from './pages/home/Home';
import AboutUs from './pages/about-us/AboutUs';
import Contact from './pages/contact/Contact';
import MachinesListing from './pages/machines/MachinesListing';
import MachineDetails from './pages/machines/MachineDetails';

// Admin Pages
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import MachineManagement from './pages/dashboard/MachineManagement';
import UserManagement from './pages/dashboard/UserManagement';
import AddMachine from './pages/dashboard/AddMachine';
import ContactManagement from './pages/dashboard/ContactManagement';


// ─── Layout: Public pages (with Header + Footer) ──────────────────────────────
const PublicLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);


// ─── Protected Route: Admin only ───────────────────────────────────────────────
const AdminRoute = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/" replace />;

  return <Outlet />;
};

// ─── Protected Route: Any logged-in user ───────────────────────────────────────
const UserRoute = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};


// ─── Routes (inside AuthProvider) ─────────────────────────────────────────────
const AppRoutes = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>

        {/* ── Public Routes (Header + Footer) ── */}
        <Route element={<PublicLayout />}>
          <Route path="/"               element={<Home />} />
          <Route path="/about-us"       element={<AboutUs />} />
          <Route path="/contact"        element={<Contact />} />
          <Route path="/machines"       element={<MachinesListing />} />
          <Route path="/machines/:id"   element={<MachineDetails />} />
        </Route>

        {/* ── Auth Routes (no Header/Footer) ── */}
        <Route path="/login"  element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ── Admin Routes (admin only) ── */}
        <Route element={<AdminRoute />}>
          <Route path="/dashboard"    element={<Dashboard />} />
          <Route path="/machines-list" element={<MachineManagement />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/contact-management" element={<ContactManagement />} />
        </Route>

        {/* ── User Routes (any logged-in user) ── */}
        <Route element={<UserRoute />}>
          <Route path="/add-machine"  element={<AddMachine />} />
        </Route>

      </Routes>
    </Router>
  );
};


// ─── App: AuthProvider wraps everything ───────────────────────────────────────
const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;