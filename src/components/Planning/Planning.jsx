import { useState } from 'react';
import { DAYS, SLOTS } from '../../data/planningTemplate.js';
import { usePlanning } from '../../hooks/usePlanning.js';
import PlanningAI from './PlanningAI.jsx';
import './Planning.css';

export default function Planning() {
  const { planning, updateSlot, setDayItems, updateItem, resetDay } = usePlanning();
  const todayIndex = (new Date().getDay() + 6) % 7; // Monday = 0
  const [activeDay, setActiveDay] = useState(DAYS[todayIndex]);

  const daySlots = planning[activeDay] || {};
  const customItems = daySlots._items || null;

  return (
    <div className="planning-body">
      <div className="planning-days">
        {DAYS.map((day) => (
          <button
            key={day}
            className={`planning-day-tab ${day === activeDay ? 'active' : ''}`}
            onClick={() => setActiveDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      {/* ── Générateur « Ma journée idéale » ── */}
      <PlanningAI activeDay={activeDay} onGenerated={(items) => setDayItems(activeDay, items)} />

      {customItems && customItems.length > 0 ? (
        <>
          {/* ── Planning personnalisé généré ── */}
          <div className="pai-custom-head">
            <span className="pai-custom-title">✨ Ton planning de {activeDay}</span>
            <button className="pai-reset" onClick={() => resetDay(activeDay)}>↩ Planning classique</button>
          </div>
          {customItems.map((item, i) => (
            <div key={i} className={`slot-card ${item.done ? 'done' : ''}`}>
              <div
                className={`checkbox ${item.done ? 'checked' : ''}`}
                style={item.done ? { background: 'var(--indigo)' } : undefined}
                onClick={() => updateItem(activeDay, i, { done: !item.done })}
              >
                {item.done ? '✓' : ''}
              </div>
              <span className="slot-time">{item.time}</span>
              <span className="slot-emoji">{item.emoji}</span>
              <div className="slot-content">
                <div className="slot-label">{item.label}</div>
                <input
                  className={`slot-input ${item.done ? 'done-text' : ''}`}
                  value={item.text}
                  onChange={(e) => updateItem(activeDay, i, { text: e.target.value })}
                />
              </div>
            </div>
          ))}
        </>
      ) : (
        SLOTS.map((slot) => {
          const value = daySlots[slot.key] || { text: slot.defaultText, done: false };
          return (
            <div key={slot.key} className={`slot-card ${value.done ? 'done' : ''}`}>
              <div
                className={`checkbox ${value.done ? 'checked' : ''}`}
                style={value.done ? { background: 'var(--indigo)' } : undefined}
                onClick={() => updateSlot(activeDay, slot.key, { done: !value.done })}
              >
                {value.done ? '✓' : ''}
              </div>
              <span className="slot-emoji">{slot.emoji}</span>
              <div className="slot-content">
                <div className="slot-label">{slot.label}</div>
                <input
                  className={`slot-input ${value.done ? 'done-text' : ''}`}
                  value={value.text}
                  onChange={(e) => updateSlot(activeDay, slot.key, { text: e.target.value })}
                />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
