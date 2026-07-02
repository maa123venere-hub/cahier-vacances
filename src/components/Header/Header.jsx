export default function Header({ label, title, subtitle, onMenuClick, children }) {
  return (
    <div className="header">
      <button className="hamburger-btn" onClick={onMenuClick} aria-label="Menu">☰</button>
      {label && <div className="app-label">{label}</div>}
      {title && <div className="app-title">{title}</div>}
      {subtitle && <div className="app-sub">{subtitle}</div>}
      {children}
    </div>
  );
}
