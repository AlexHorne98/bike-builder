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
  {
    name: "Lightweight Alloy Wheels",
    image: "/bike.png",
    price: 800,
    weight: 1500,
    rim: "Alloy Clincher",
    tyreWidth: 28,
    recommendedPressure: (riderWeight: number) => Math.round(90 + (riderWeight - 70) * 0.7),
  },
  {
    name: "Aero Carbon Wheels",
    image: "/bike.png",
    price: 1800,
    weight: 1350,
    rim: "Deep Carbon Tubeless",
    tyreWidth: 25,
    recommendedPressure: (riderWeight: number) => Math.round(100 + (riderWeight - 70) * 0.8),
  },
  {
    name: "Endurance Wheels",
    image: "/bike.png",
    price: 1000,
    weight: 1600,
    rim: "Wide Alloy Clincher",
    tyreWidth: 32,
    recommendedPressure: (riderWeight: number) => Math.round(80 + (riderWeight - 70) * 0.6),
  },
];
const HANDLEBARS = [
  { name: "Compact Drop Bars", image: "/bike.png", price: 300, weight: 250 },
  { name: "Aero Bars", image: "/bike.png", price: 500, weight: 320 },
  { name: "Endurance Bars", image: "/bike.png", price: 350, weight: 280 },
];

// Helper for front/rear pressure (inspired by SILCA)
function calcTyrePressure(riderWeight: number, tyreWidth: number) {
  // Assume 55% rear, 45% front weight distribution for road bikes
  const rearWeight = riderWeight * 0.55;
  const frontWeight = riderWeight * 0.45;
  // Base pressure formula: (weight in kg / tyre width in mm) * factor
  // Factor is tuned for road tyres, adjust as needed
  const factor = 1.1;
  const rearPsi = Math.round((rearWeight / tyreWidth) * factor * 10);
  const frontPsi = Math.round((frontWeight / tyreWidth) * factor * 10);
  return { frontPsi, rearPsi };
}

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

  const riderWeightNum = Number(riderWeight) || 75;
  const tyreWidth = selectedWheels.tyreWidth || 28;
  const { frontPsi, rearPsi } = calcTyrePressure(riderWeightNum, tyreWidth);

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
            <li><strong>Rim:</strong> {selectedWheels.rim}</li>
            <li><strong>Tyre Width:</strong> {selectedWheels.tyreWidth} mm</li>
            <li><strong>Recommended Pressure:</strong> Front {frontPsi} psi / Rear {rearPsi} psi</li>
          </ul>
          <div style={{ fontSize: 13, color: '#888', marginTop: 8, marginBottom: 8, lineHeight: 1.5 }}>
            <strong>How is this calculated?</strong><br />
            Tyre pressures are optimized for your weight and tyre width, using a front/rear split inspired by the <a href="https://silca.cc/pages/pro-tire-pressure-calculator?srsltid=AfmBOopV2OzvY2aWtLo41Jsc_jmWPO_NlRlKNHRUBPdXHH_EynP7DgCk" target="_blank" rel="noopener noreferrer">SILCA Pro Calculator</a>. For best results, always check your rim and tyre manufacturer’s limits.
          </div>
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