import Header from '../components/Header/Header.jsx';
import Profile from '../components/Profile/Profile.jsx';

export default function ProfilePage({ onMenuClick }) {
  return (
    <div className="page-fade">
      <Header label="👤 Compte" title="Mon compte" onMenuClick={onMenuClick} />
      <Profile />
    </div>
  );
}
