import Header from '../components/Header/Header.jsx';
import AssistantIA from '../components/AssistantIA/AssistantIA.jsx';

export default function AssistantPage({ onMenuClick }) {
  return (
    <div className="page-fade">
      <Header label="🤖 Aide" title="Assistant IA" subtitle="Pose tes questions sur tes leçons" onMenuClick={onMenuClick} />
      <AssistantIA />
    </div>
  );
}
