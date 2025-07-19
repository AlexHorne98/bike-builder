"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [bikeSize, setBikeSize] = useState("");
  const [riderWeight, setRiderWeight] = useState("");
  const [comfortAero, setComfortAero] = useState(50); // 0 = Comfort, 100 = Aero
  const [budget, setBudget] = useState("");
  const [submitted, setSubmitted] = useState<{
    bikeSize: string;
    riderWeight: string;
    comfortAero: number;
    budget: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted({ bikeSize, riderWeight, comfortAero, budget });
  };

  return (
    <div className={styles.wrapper}>
      <Image src="/bike.png" alt="Bike preview" width={320} height={180} style={{ marginBottom: 24, borderRadius: 12, objectFit: 'contain', background: '#f8f8f8' }} />
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
      {submitted && (
        <div className={styles.result}>
          <h3>Recommended Build</h3>
          <ul style={{ margin: '1.5rem 0', padding: 0, listStyle: 'none', fontSize: '1.05rem', color: '#333' }}>
            <li><strong>Frame:</strong> Aero Carbon Frame</li>
            <li><strong>Wheels:</strong> Lightweight Alloy Wheels</li>
            <li><strong>Handlebars:</strong> Compact Drop Bars</li>
            <li><strong>Saddle:</strong> Comfort Gel Saddle</li>
            <li><strong>Groupset:</strong> Shimano 105</li>
          </ul>
          <h4>Summary</h4>
          <p>Bike Size: {submitted.bikeSize}</p>
          <p>Rider Weight: {submitted.riderWeight} kg</p>
          <p>Riding Style: {submitted.comfortAero <= 33 ? "Comfort" : submitted.comfortAero >= 67 ? "Aero" : "Balanced"} ({submitted.comfortAero}/100)</p>
          <p>Budget: ${submitted.budget}</p>
        </div>
      )}
    </div>
  );
}
