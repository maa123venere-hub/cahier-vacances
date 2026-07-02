import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header.jsx';
import PrivacyPolicy from '../components/Legal/PrivacyPolicy.jsx';

export default function PrivacyPage() {
  const navigate = useNavigate();
  return (
    <div className="page-fade">
      <Header label="🔒 Légal" title="Politique de confidentialité" onMenuClick={() => navigate(-1)} />
      <PrivacyPolicy />
    </div>
  );
}
