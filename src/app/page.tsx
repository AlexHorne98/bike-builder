"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [bikeSize, setBikeSize] = useState("");
  const [riderWeight, setRiderWeight] = useState("");
  const [submitted, setSubmitted] = useState<{ bikeSize: string; riderWeight: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted({ bikeSize, riderWeight });
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
        <button type="submit" className={styles.button}>Submit</button>
      </form>
      {submitted && (
        <div className={styles.result}>
          <h3>Submitted Values</h3>
          <p>Bike Size: {submitted.bikeSize}</p>
          <p>Rider Weight: {submitted.riderWeight} kg</p>
        </div>
      )}
    </div>
  );
}
