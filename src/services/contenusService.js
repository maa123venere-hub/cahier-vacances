import {
  collection, doc, getDocs, setDoc, deleteDoc,
  writeBatch, serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config.js';

// ── Paths ──────────────────────────────────────────────────────
const joursCol = (niveau) => collection(db, 'contenus', niveau, 'jours');
const semainesCol = (niveau) => collection(db, 'contenus', niveau, 'semaines');
const jourDoc = (niveau, id) => doc(db, 'contenus', niveau, 'jours', id);
const semaineDoc = (niveau, idx) => doc(db, 'contenus', niveau, 'semaines', String(idx));

// ── Read ───────────────────────────────────────────────────────
export async function fetchJours(niveau) {
  const snap = await getDocs(joursCol(niveau));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function fetchSemaines(niveau) {
  const snap = await getDocs(semainesCol(niveau));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ── Write ──────────────────────────────────────────────────────
export async function saveJour(niveau, id, data) {
  await setDoc(jourDoc(niveau, id), {
    ...data,
    id,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

export async function deleteJour(niveau, id) {
  await deleteDoc(jourDoc(niveau, id));
}

export async function saveSemaine(niveau, index, data) {
  await setDoc(semaineDoc(niveau, index), {
    ...data,
    index: Number(index),
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

// ── Seed ───────────────────────────────────────────────────────
// Writes all seed data to Firestore in batches of 500.
// Only runs if the collection is empty (idempotent guard).
export async function seedContenus(niveau, seedJours, seedSemaines, force = false) {
  if (!force) {
    const existing = await getDocs(joursCol(niveau));
    if (!existing.empty) return { skipped: true, count: existing.size };
  }

  const BATCH_SIZE = 400;
  let count = 0;

  // Seed semaines
  const semBatches = [];
  for (let i = 0; i < seedSemaines.length; i += BATCH_SIZE) {
    const b = writeBatch(db);
    seedSemaines.slice(i, i + BATCH_SIZE).forEach((s) => {
      b.set(semaineDoc(niveau, s.index), { ...s, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
    });
    semBatches.push(b);
  }
  for (const b of semBatches) await b.commit();

  // Seed jours
  const jourBatches = [];
  for (let i = 0; i < seedJours.length; i += BATCH_SIZE) {
    const b = writeBatch(db);
    seedJours.slice(i, i + BATCH_SIZE).forEach((j) => {
      b.set(jourDoc(niveau, j.id), { ...j, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
      count++;
    });
    jourBatches.push(b);
  }
  for (const b of jourBatches) await b.commit();

  return { skipped: false, count };
}
