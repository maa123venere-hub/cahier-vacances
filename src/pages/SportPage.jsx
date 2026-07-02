import Header from '../components/Header/Header.jsx';
import Sport from '../components/Sport/Sport.jsx';

export default function SportPage({ onMenuClick }) {
  return (
    <div className="page-fade">
      <Header label="🏃 Bien-être" title="Sport" subtitle="Programme quotidien" onMenuClick={onMenuClick} />
      <Sport />
    </div>
  );
}
