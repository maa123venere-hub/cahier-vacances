import { useState } from 'react';
import './AdminLayout.css';

const TABS = [
  { id: 'dashboard',    icon: '📊', label: 'Dashboard' },
  { id: 'users',        icon: '👥', label: 'Utilisateurs' },
  { id: 'content',      icon: '📚', label: 'Contenu' },
  { id: 'tools',        icon: '🛠️', label: 'Outils' },
  { id: 'stats',        icon: '📈', label: 'Statistiques' },
  { id: 'maintenance',  icon: '⚙️', label: 'Maintenance' },
];

export default function AdminLayout({ activeTab, onTabChange, children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`admin-layout ${collapsed ? 'admin-layout--collapsed' : ''}`}>
      <aside className="admin-sidebar">
        <div className="admin-sidebar__header">
          <span className="admin-sidebar__logo">🛡️</span>
          {!collapsed && <span className="admin-sidebar__title">Admin</span>}
          <button
            className="admin-sidebar__toggle"
            onClick={() => setCollapsed((c) => !c)}
            aria-label="Réduire la sidebar"
          >
            {collapsed ? '›' : '‹'}
          </button>
        </div>

        <nav className="admin-sidebar__nav">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`admin-nav-item ${activeTab === tab.id ? 'admin-nav-item--active' : ''}`}
              onClick={() => onTabChange(tab.id)}
              title={collapsed ? tab.label : undefined}
            >
              <span className="admin-nav-item__icon">{tab.icon}</span>
              {!collapsed && <span className="admin-nav-item__label">{tab.label}</span>}
              {!collapsed && activeTab === tab.id && (
                <span className="admin-nav-item__indicator" />
              )}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          {!collapsed && (
            <span className="admin-sidebar__badge">Panneau Admin v2</span>
          )}
        </div>
      </aside>

      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}
