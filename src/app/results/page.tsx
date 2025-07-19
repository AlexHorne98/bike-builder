"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import styles from "../page.module.css";

export default function ResultsPage() {
  const params = useSearchParams();
  const bikeSize = params.get("bikeSize") || "";
  const riderWeight = params.get("riderWeight") || "";
  const comfortAero = Number(params.get("comfortAero") || 50);
  const budget = params.get("budget") || "";

  return (
    <div className={styles.resultsLayout}>
      <div className={styles.resultsImage}>
        <Image src="/bike.png" alt="Bike preview" width={340} height={200} style={{ borderRadius: 12, objectFit: 'contain', background: '#f8f8f8' }} />
      </div>
      <div className={styles.resultsSidebar}>
        <h2 style={{ marginBottom: 8 }}>Recommended Build</h2>
        <ul>
          <li><strong>Frame:</strong> Aero Carbon Frame</li>
          <li><strong>Wheels:</strong> Lightweight Alloy Wheels</li>
          <li><strong>Handlebars:</strong> Compact Drop Bars</li>
          <li><strong>Saddle:</strong> Comfort Gel Saddle</li>
          <li><strong>Groupset:</strong> Shimano 105</li>
        </ul>
        <div className={styles.resultsSummary}>
          <div><strong>Bike Size:</strong> {bikeSize}</div>
          <div><strong>Rider Weight:</strong> {riderWeight} kg</div>
          <div><strong>Riding Style:</strong> {comfortAero <= 33 ? "Comfort" : comfortAero >= 67 ? "Aero" : "Balanced"} ({comfortAero}/100)</div>
          <div><strong>Budget:</strong> ${budget}</div>
        </div>
      </div>
    </div>
  );
} 