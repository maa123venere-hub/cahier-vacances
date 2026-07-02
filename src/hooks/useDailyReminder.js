import { useEffect } from 'react';
import { useSettings } from './useSettings.js';
import { useDone } from './useDone.js';
import { todayKey } from '../utils/date.js';

const REMINDER_KEY = 'lastReminder2k26';

// Best-effort local reminder: only fires while the app is open in a browser tab.
// A true push notification (working even when the app is closed) would require
// setting up Firebase Cloud Messaging with a service worker — not implemented yet.
export function useDailyReminder() {
  const { settings } = useSettings();
  const { done } = useDone();

  useEffect(() => {
    if (!settings.notifications) return;
    if (typeof Notification === 'undefined') return;
    if (Notification.permission !== 'granted') return;

    const today = todayKey();
    if (localStorage.getItem(REMINDER_KEY) === today) return;

    const hasDoneToday = Object.values(done).some(Boolean);
    if (hasDoneToday) return;

    const timer = setTimeout(() => {
      new Notification('📚 Calendrier 2k26', {
        body: "Il est temps de réviser ! Tu n'as pas encore terminé de journée aujourd'hui.",
        icon: '/icon-192.svg',
      });
      localStorage.setItem(REMINDER_KEY, today);
    }, 3000);

    return () => clearTimeout(timer);
  }, [settings.notifications, done]);
}
