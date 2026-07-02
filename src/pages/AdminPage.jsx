import { useState } from 'react';
import Header from '../components/Header/Header.jsx';
import AdminLayout from '../components/Admin/AdminLayout.jsx';
import AdminStats from '../components/Admin/AdminStats.jsx';
import AdminUsers from '../components/Admin/AdminUsers.jsx';
import AdminContent from '../components/Admin/AdminContent.jsx';
import AdminTools from '../components/Admin/AdminTools.jsx';
import AdminAdvancedStats from '../components/Admin/AdminAdvancedStats.jsx';
import AdminMaintenance from '../components/Admin/AdminMaintenance.jsx';
import AdminDashboard from '../components/Admin/AdminDashboard.jsx';

const TAB_LABELS = {
  dashboard:   'Dashboard',
  users:       'Utilisateurs',
  content:     'Contenu',
  tools:       'Outils',
  stats:       'Statistiques',
  maintenance: 'Maintenance',
};

function ComingSoon({ tab }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary, #888)' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🚧</div>
      <h2 style={{ marginBottom: '8px', color: 'var(--text-primary, #111)' }}>{TAB_LABELS[tab]}</h2>
      <p>Cette section sera disponible dans la prochaine étape.</p>
    </div>
  );
}

export default function AdminPage({ onMenuClick }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  function renderTab() {
    if (activeTab === 'dashboard') return <AdminStats />;
    if (activeTab === 'users') return <AdminUsers />;
    if (activeTab === 'content') return <AdminContent />;
    if (activeTab === 'tools') return <AdminTools />;
    if (activeTab === 'stats') return <AdminAdvancedStats />;
    if (activeTab === 'maintenance') return <AdminMaintenance />;
    return <ComingSoon tab={activeTab} />;
  }

  return (
    <div className="page-fade">
      <Header
        label="🛡️ Administration"
        title={TAB_LABELS[activeTab]}
        subtitle="Accès réservé"
        onMenuClick={onMenuClick}
      />
      <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderTab()}
      </AdminLayout>
    </div>
  );
}
