"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "../page.module.css";
import { useState } from "react";

// Dummy data for components
const FRAMES = [
  { name: "Aero Carbon Frame", image: "/bike.png", price: 2500, weight: 900 },
  { name: "Endurance Carbon Frame", image: "/bike.png", price: 2200, weight: 950 },
  { name: "Lightweight Alloy Frame", image: "/bike.png", price: 1200, weight: 1200 },
];
const WHEELS = [
  { name: "Lightweight Alloy Wheels", image: "/bike.png", price: 800, weight: 1500 },
  { name: "Aero Carbon Wheels", image: "/bike.png", price: 1800, weight: 1350 },
  { name: "Endurance Wheels", image: "/bike.png", price: 1000, weight: 1600 },
];
const HANDLEBARS = [
  { name: "Compact Drop Bars", image: "/bike.png", price: 300, weight: 250 },
  { name: "Aero Bars", image: "/bike.png", price: 500, weight: 320 },
  { name: "Endurance Bars", image: "/bike.png", price: 350, weight: 280 },
];

export default function ResultsPage() {
  const params = useSearchParams();
  const bikeSize = params.get("bikeSize") || "";
  const riderWeight = params.get("riderWeight") || "";
  const comfortAero = Number(params.get("comfortAero") || 50);
  const budget = params.get("budget") || "";

  // Selection state
  const [selectedFrame, setSelectedFrame] = useState(FRAMES[0]);
  const [selectedWheels, setSelectedWheels] = useState(WHEELS[0]);
  const [selectedHandlebars, setSelectedHandlebars] = useState(HANDLEBARS[0]);

  const totalPrice = selectedFrame.price + selectedWheels.price + selectedHandlebars.price;
  const totalWeight = selectedFrame.weight + selectedWheels.weight + selectedHandlebars.weight;

  return (
    <>
      <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 32 }}>
        <Link href="/" style={{ color: '#222', textDecoration: 'none', fontWeight: 500, fontSize: 16, border: '1px solid #ececec', borderRadius: 8, padding: '8px 18px', background: '#fafafa', transition: 'background 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.02)' }}>
          ← Back to Start
        </Link>
      </div>
      <div className={styles.resultsLayout}>
        <div className={styles.resultsImage}>
          <Image src={selectedFrame.image} alt="Bike preview" width={340} height={200} style={{ borderRadius: 12, objectFit: 'contain', background: '#f8f8f8' }} />
        </div>
        <div className={styles.resultsSidebar}>
          <h2 style={{ marginBottom: 8 }}>Configure Your Build</h2>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 500 }}>Frame:</label>
            <select value={selectedFrame.name} onChange={e => setSelectedFrame(FRAMES.find(f => f.name === e.target.value) || FRAMES[0])} style={{ width: '100%', marginTop: 6, marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #ececec' }}>
              {FRAMES.map(frame => (
                <option key={frame.name} value={frame.name}>{frame.name} (${frame.price})</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 500 }}>Wheels:</label>
            <select value={selectedWheels.name} onChange={e => setSelectedWheels(WHEELS.find(w => w.name === e.target.value) || WHEELS[0])} style={{ width: '100%', marginTop: 6, marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #ececec' }}>
              {WHEELS.map(wheel => (
                <option key={wheel.name} value={wheel.name}>{wheel.name} (${wheel.price})</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 500 }}>Handlebars:</label>
            <select value={selectedHandlebars.name} onChange={e => setSelectedHandlebars(HANDLEBARS.find(h => h.name === e.target.value) || HANDLEBARS[0])} style={{ width: '100%', marginTop: 6, marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #ececec' }}>
              {HANDLEBARS.map(bar => (
                <option key={bar.name} value={bar.name}>{bar.name} (${bar.price})</option>
              ))}
            </select>
          </div>
          <ul>
            <li><strong>Frame:</strong> {selectedFrame.name}</li>
            <li><strong>Wheels:</strong> {selectedWheels.name}</li>
            <li><strong>Handlebars:</strong> {selectedHandlebars.name}</li>
          </ul>
          <div className={styles.resultsSummary}>
            <div><strong>Bike Size:</strong> {bikeSize}</div>
            <div><strong>Rider Weight:</strong> {riderWeight} kg</div>
            <div><strong>Riding Style:</strong> {comfortAero <= 33 ? "Comfort" : comfortAero >= 67 ? "Aero" : "Balanced"} ({comfortAero}/100)</div>
            <div><strong>Budget:</strong> ${budget}</div>
            <div style={{ marginTop: 10 }}><strong>Total Price:</strong> ${totalPrice}</div>
            <div><strong>Total Weight:</strong> {totalWeight} g</div>
          </div>
        </div>
      </div>
    </>
  );
} 