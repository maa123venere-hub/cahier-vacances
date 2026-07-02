import { useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import ProtectedRoute from './components/Auth/ProtectedRoute.jsx';
import AdminRoute from './components/Auth/AdminRoute.jsx';
import CahierVacances from './components/CahierVacances/CahierVacances.jsx';
import AuthPage from './pages/AuthPage.jsx';
import { useAuth } from './context/AuthContext.jsx';
import { useDailyReminder } from './hooks/useDailyReminder.js';

// Lazy-load heavy pages — only downloaded when the user navigates there
const PlanningPage      = lazy(() => import('./pages/PlanningPage.jsx'));
const RepasPage         = lazy(() => import('./pages/RepasPage.jsx'));
const SportPage         = lazy(() => import('./pages/SportPage.jsx'));
const BibliothequePage  = lazy(() => import('./pages/BibliothequePage.jsx'));
const AssistantPage     = lazy(() => import('./pages/AssistantPage.jsx'));
const RecompensesPage   = lazy(() => import('./pages/RecompensesPage.jsx'));
const StatistiquesPage  = lazy(() => import('./pages/StatistiquesPage.jsx'));
const ProfilePage       = lazy(() => import('./pages/ProfilePage.jsx'));
const SettingsPage      = lazy(() => import('./pages/SettingsPage.jsx'));
const AdminPage         = lazy(() => import('./pages/AdminPage.jsx'));
const PrivacyPage       = lazy(() => import('./pages/PrivacyPage.jsx'));
const AuthActionPage    = lazy(() => import('./pages/AuthActionPage.jsx'));

function PageLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: 'var(--text-muted)', fontSize: 14 }}>
      Chargement…
    </div>
  );
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  useDailyReminder();

  function openMenu() { setSidebarOpen(true); }
  function closeMenu() { setSidebarOpen(false); }

  return (
    <div id="app">
      {user && <Sidebar open={sidebarOpen} onClose={closeMenu} />}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/action" element={<AuthActionPage />} />
          <Route path="/confidentialite" element={<PrivacyPage />} />
          <Route path="/" element={<ProtectedRoute><CahierVacances onMenuClick={openMenu} /></ProtectedRoute>} />
          <Route path="/planning" element={<ProtectedRoute><PlanningPage onMenuClick={openMenu} /></ProtectedRoute>} />
          <Route path="/repas" element={<ProtectedRoute><RepasPage onMenuClick={openMenu} /></ProtectedRoute>} />
          <Route path="/sport" element={<ProtectedRoute><SportPage onMenuClick={openMenu} /></ProtectedRoute>} />
          <Route path="/bibliotheque" element={<ProtectedRoute><BibliothequePage onMenuClick={openMenu} /></ProtectedRoute>} />
          <Route path="/assistant" element={<ProtectedRoute><AssistantPage onMenuClick={openMenu} /></ProtectedRoute>} />
          <Route path="/recompenses" element={<ProtectedRoute><RecompensesPage onMenuClick={openMenu} /></ProtectedRoute>} />
          <Route path="/statistiques" element={<ProtectedRoute><StatistiquesPage onMenuClick={openMenu} /></ProtectedRoute>} />
          <Route path="/profil" element={<ProtectedRoute><ProfilePage onMenuClick={openMenu} /></ProtectedRoute>} />
          <Route path="/parametres" element={<ProtectedRoute><SettingsPage onMenuClick={openMenu} /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminPage onMenuClick={openMenu} /></AdminRoute>} />
        </Routes>
      </Suspense>
    </div>
  );
}
