import { useEffect, useRef, useState } from 'react';
import { useAssistantChat } from '../../hooks/useAssistantChat.js';
import './AssistantIA.css';

const SUGGESTIONS = [
  'Explique-moi les classes grammaticales',
  'Donne-moi un exercice sur le COD',
  'Réexplique l\'imparfait autrement',
  'Donne-moi un indice pour la dictée',
];

export default function AssistantIA() {
  const { messages, sendMessage, busy, error } = useAssistantChat();
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, busy]);

  function handleSend(text = input) {
    if (!text.trim()) return;
    sendMessage(text);
    setInput('');
  }

  return (
    <div className="chat-body">
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-empty">
            🤖 Pose-moi une question sur tes leçons : « explique-moi », « donne-moi un exercice », « corrige ma phrase », « donne-moi un indice »…
            <div className="chat-suggestions">
              {SUGGESTIONS.map((s) => (
                <button key={s} className="chat-suggestion-btn" onClick={() => handleSend(s)}>{s}</button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`chat-bubble ${m.role}`}>{m.content}</div>
        ))}

        {busy && (
          <div className="chat-bubble assistant typing">
            <span className="chat-dot" /><span className="chat-dot" /><span className="chat-dot" />
          </div>
        )}
        <div ref={endRef} />
      </div>

      {error && <div className="chat-error">{error}</div>}

      <div className="chat-input-bar">
        <input
          className="chat-input"
          placeholder="Écris ta question…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="chat-send-btn" onClick={() => handleSend()} disabled={busy || !input.trim()}>➤</button>
      </div>
    </div>
  );
}
