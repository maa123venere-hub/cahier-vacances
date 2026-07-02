import { useState } from 'react';
import { useAnnouncements } from '../../hooks/useAnnouncements.js';
import { useMyMessages } from '../../hooks/useMyMessages.js';
import './AnnouncementBanner.css';

export default function AnnouncementBanner() {
  const { announcements } = useAnnouncements();
  const { messages, markRead } = useMyMessages();
  const [dismissedAnnounce, setDismissedAnnounce] = useState(null);

  const latestAnnouncement = announcements[0];
  const showAnnouncement = latestAnnouncement && dismissedAnnounce !== latestAnnouncement.id;
  const unreadMessage = messages.find((m) => !m.read);

  return (
    <>
      {showAnnouncement && (
        <div className="announce-banner">
          <span className="announce-icon">📣</span>
          <div className="announce-text">
            <div className="announce-title">{latestAnnouncement.title}</div>
            <div className="announce-body">{latestAnnouncement.text}</div>
          </div>
          <button className="announce-close" onClick={() => setDismissedAnnounce(latestAnnouncement.id)}>✕</button>
        </div>
      )}

      {unreadMessage && (
        <div className="message-banner">
          <span className="message-icon">✉️</span>
          <div className="message-text">
            <div className="message-title">Message de l'équipe</div>
            <div className="message-body">{unreadMessage.text}</div>
          </div>
          <button className="message-close" onClick={() => markRead(unreadMessage.id)}>✕</button>
        </div>
      )}
    </>
  );
}
