import { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { uploadExerciseFile } from '../../services/storage.js';
import { correctExercise } from '../../services/aiCorrection.js';
import './UploadExercise.css';

export default function UploadExercise({ dayKey, exerciseLabel, lecon, onResult }) {
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const photoInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  function pickFile(e) {
    setFile(e.target.files?.[0] || null);
  }

  async function handleSubmit() {
    if (!text.trim() && !file) {
      setError('Écris ta réponse ou ajoute une photo/un PDF avant de lancer la correction.');
      return;
    }
    setError('');
    setBusy(true);
    try {
      let fileUrl = null;
      let fileType = null;
      if (file) {
        fileUrl = await uploadExerciseFile(user.uid, dayKey, file);
        fileType = file.type;
      }
      const result = await correctExercise({ text, fileUrl, fileType, exerciseLabel, lecon });
      onResult({ text, fileUrl, fileType, ...result });
      setText('');
      setFile(null);
    } catch (err) {
      setError("La correction IA n'a pas pu être réalisée. Réessaie dans un instant.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="upload-wrap">
      <textarea
        className="upload-textarea"
        placeholder="Écris directement ta réponse ici…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="upload-actions">
        <button className="upload-file-btn" onClick={() => photoInputRef.current?.click()}>📷 Ajouter une photo</button>
        <button className="upload-file-btn" onClick={() => pdfInputRef.current?.click()}>📄 Ajouter un PDF</button>
      </div>
      <input ref={photoInputRef} type="file" accept="image/*" hidden onChange={pickFile} />
      <input ref={pdfInputRef} type="file" accept="application/pdf" hidden onChange={pickFile} />

      {file && <div className="upload-file-name">📎 {file.name}</div>}

      <button className="upload-submit" onClick={handleSubmit} disabled={busy}>
        {busy ? 'Correction en cours…' : '✨ Corriger avec l\'IA'}
      </button>

      {error && <div className="upload-error">{error}</div>}
    </div>
  );
}
