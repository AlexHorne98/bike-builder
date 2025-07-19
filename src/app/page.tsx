"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [bikeSize, setBikeSize] = useState("");
  const [riderWeight, setRiderWeight] = useState("");
  const [comfortAero, setComfortAero] = useState(50);
  const [budget, setBudget] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      bikeSize,
      riderWeight,
      comfortAero: String(comfortAero),
      budget
    }).toString();
    router.push(`/results?${params}`);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Bike Builder</h1>
      <p className={styles.description}>Build your ideal and optimized bike. Enter your details below to get started.</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="bikeSize">Bike Size</label>
          <input
            id="bikeSize"
            type="text"
            value={bikeSize}
            onChange={e => setBikeSize(e.target.value)}
            placeholder="e.g. 54cm"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="riderWeight">Rider Weight (kg)</label>
          <input
            id="riderWeight"
            type="number"
            value={riderWeight}
            onChange={e => setRiderWeight(e.target.value)}
            placeholder="e.g. 75"
            required
            min={0}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="comfortAero">Riding Style Preference</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 13, color: '#888' }}>Comfort</span>
            <input
              id="comfortAero"
              type="range"
              min={0}
              max={100}
              value={comfortAero}
              onChange={e => setComfortAero(Number(e.target.value))}
              style={{ flex: 1 }}
            />
            <span style={{ fontSize: 13, color: '#888' }}>Aero</span>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="budget">Budget ($)</label>
          <input
            id="budget"
            type="number"
            value={budget}
            onChange={e => setBudget(e.target.value)}
            placeholder="e.g. 2000"
            required
            min={0}
            step={100}
          />
        </div>
        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );
}
