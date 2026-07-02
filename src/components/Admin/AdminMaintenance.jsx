import { useAdminMaintenance, PROJECT_ID } from '../../hooks/useAdminMaintenance.js';
import './AdminMaintenance.css';

const FIREBASE_LINKS = [
  { icon: '📦', label: 'Firestore — données & règles',     href: `https://console.firebase.google.com/project/${PROJECT_ID}/firestore` },
  { icon: '⚡', label: 'Cloud Functions — logs',           href: `https://console.firebase.google.com/project/${PROJECT_ID}/functions` },
  { icon: '👤', label: 'Authentication — comptes',         href: `https://console.firebase.google.com/project/${PROJECT_ID}/authentication/users` },
  { icon: '🗄️', label: 'Storage — fichiers',              href: `https://console.firebase.google.com/project/${PROJECT_ID}/storage` },
  { icon: '📊', label: 'Analytics',                        href: `https://console.firebase.google.com/project/${PROJECT_ID}/analytics` },
  { icon: '🔔', label: 'Cloud Messaging (notifications)',  href: `https://console.firebase.google.com/project/${PROJECT_ID}/messaging` },
  { icon: '🚨', label: 'App Check & Security rules',       href: `https://console.firebase.google.com/project/${PROJECT_ID}/appcheck` },
  { icon: '📈', label: 'Performance',                      href: `https://console.firebase.google.com/project/${PROJECT_ID}/performance` },
];

function fmtTs(ts) {
  if (!ts?.toDate) return '—';
  return ts.toDate().toLocaleString('fr-FR', {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
}

const LOG_COLORS = { error: '#dc2626', warn: '#d97706', info: '#2563eb' };
const LOG_ICONS  = { error: '🔴', warn: '🟡', info: '🔵' };

export default function AdminMaintenance() {
  const {
    logs, logsLoading,
    backupBusy, backupStatus, runBackup,
    exportBusy, exportUsersCSV, exportSessionsCSV,
  } = useAdminMaintenance();

  return (
    <div className="admin-maintenance">

      {/* ── Export ── */}
      <section className="maint-section">
        <div className="maint-section__header">
          <span className="maint-section__icon">📥</span>
          <div>
            <div className="maint-section__title">Export de données</div>
            <div className="maint-section__desc">Télécharge les données au format CSV pour analyse externe.</div>
          </div>
        </div>
        <div className="maint-export-btns">
          <button
            className="maint-btn maint-btn--outline"
            onClick={exportUsersCSV}
            disabled={exportBusy}
          >
            {exportBusy ? '…' : '👥 Exporter les utilisateurs (CSV)'}
          </button>
          <button
            className="maint-btn maint-btn--outline"
            onClick={exportSessionsCSV}
            disabled={exportBusy}
          >
            {exportBusy ? '…' : '✏️ Exporter les sessions (CSV)'}
          </button>
        </div>
      </section>

      {/* ── Backup ── */}
      <section className="maint-section">
        <div className="maint-section__header">
          <span className="maint-section__icon">💾</span>
          <div>
            <div className="maint-section__title">Backup complet Firestore</div>
            <div className="maint-section__desc">
              Exporte l'intégralité des collections (utilisateurs, curriculum, annonces, défis) en JSON.
              Le fichier peut servir à restaurer manuellement les données.
            </div>
          </div>
        </div>
        <button
          className="maint-btn maint-btn--primary"
          onClick={runBackup}
          disabled={backupBusy}
        >
          {backupBusy ? '⏳ Export en cours…' : '💾 Lancer le backup JSON'}
        </button>
        {backupStatus && (
          <div className={`maint-status ${backupStatus.startsWith('⚠️') ? 'maint-status--error' : ''}`}>
            {backupStatus}
          </div>
        )}
        <div className="maint-notice">
          ℹ️ Pour une restauration complète incluant Firebase Auth, utilisez la console Firebase ou les outils CLI (<code>firebase import</code>). Ce backup couvre uniquement Firestore.
        </div>
      </section>

      {/* ── Error logs ── */}
      <section className="maint-section">
        <div className="maint-section__header">
          <span className="maint-section__icon">📋</span>
          <div>
            <div className="maint-section__title">Logs d'événements</div>
            <div className="maint-section__desc">50 derniers événements enregistrés dans <code>errorLogs</code>.</div>
          </div>
        </div>

        {logsLoading && <div className="maint-loading">Chargement des logs…</div>}

        {!logsLoading && logs.length === 0 && (
          <div className="maint-empty">
            ✅ Aucun log enregistré. Les backups et erreurs critiques apparaîtront ici.
          </div>
        )}

        {!logsLoading && logs.length > 0 && (
          <div className="maint-logs">
            {logs.map((log) => (
              <div key={log.id} className="maint-log-row" style={{ '--log-color': LOG_COLORS[log.level] || '#888' }}>
                <span className="maint-log-icon">{LOG_ICONS[log.level] || '⚪'}</span>
                <div className="maint-log-body">
                  <span className="maint-log-msg">{log.message || '(sans message)'}</span>
                  {log.detail && <span className="maint-log-detail">{log.detail}</span>}
                </div>
                <span className="maint-log-ts">{fmtTs(log.createdAt)}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Firebase monitoring ── */}
      <section className="maint-section">
        <div className="maint-section__header">
          <span className="maint-section__icon">🔥</span>
          <div>
            <div className="maint-section__title">Monitoring Firebase</div>
            <div className="maint-section__desc">Accès direct aux consoles Firebase pour surveiller l'infrastructure.</div>
          </div>
        </div>
        <div className="maint-links-grid">
          {FIREBASE_LINKS.map((link) => (
            <a
              key={link.href}
              className="maint-link"
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              <span className="maint-link__icon">{link.icon}</span>
              <span className="maint-link__label">{link.label}</span>
              <span className="maint-link__arrow">↗</span>
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}
