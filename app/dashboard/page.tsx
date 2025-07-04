"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { Line, Pie, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
} from "chart.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { v4 as uuidv4 } from 'uuid';
import { toast, Toaster } from 'react-hot-toast';
import { useTheme } from 'next-themes';
import Link from "next/link";
import { usePathname } from "next/navigation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

// Erweiterte Datenstrukturen
interface KpiData {
  id: string;
  name: string;
  value: number;
  diff: number;
  target: number;
  category: string;
  product: string;
  region: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  trend: number[];
  lastUpdated: string;
}

interface FilterState {
  period: string;
  categories: string[];
  products: string[];
  regions: string[];
  status: string[];
  searchTerm: string;
}

// Erweiterte Optionen für Filter
const CATEGORY_OPTIONS = [
  { value: 'all', label: 'Alle Kategorien' },
  { value: 'revenue', label: 'Umsatz' },
  { value: 'users', label: 'Nutzer' },
  { value: 'conversion', label: 'Conversion' },
  { value: 'engagement', label: 'Engagement' },
  { value: 'retention', label: 'Retention' },
  { value: 'performance', label: 'Performance' }
];

const PRODUCT_OPTIONS = [
  { value: 'all', label: 'Alle Produkte' },
  { value: 'web', label: 'Web App' },
  { value: 'mobile', label: 'Mobile App' },
  { value: 'api', label: 'API Services' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'crm', label: 'CRM System' }
];

const REGION_OPTIONS = [
  { value: 'all', label: 'Alle Regionen' },
  { value: 'de', label: 'Deutschland' },
  { value: 'eu', label: 'Europa' },
  { value: 'us', label: 'USA' },
  { value: 'asia', label: 'Asien' },
  { value: 'global', label: 'Global' }
];

const STATUS_OPTIONS = [
  { value: 'all', label: 'Alle Status' },
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'warning', label: 'Warning' },
  { value: 'critical', label: 'Critical' }
];

// Erweiterte Dummy-Daten-Generator
function generateAdvancedDashboardData(period: string): { kpis: KpiData[]; charts: any; summary: any } {
  const baseData = getDashboardData(period);
  
  const kpis: KpiData[] = [
    {
      id: uuidv4(),
      name: "Umsatz",
      value: baseData.kpis.revenue.value,
      diff: baseData.kpis.revenue.diff,
      target: baseData.kpis.revenue.value * 1.2,
      category: "revenue",
      product: "web",
      region: "de",
      status: baseData.kpis.revenue.diff > 5 ? 'excellent' : baseData.kpis.revenue.diff > 0 ? 'good' : 'warning',
      trend: baseData.line,
      lastUpdated: new Date().toISOString()
    },
    {
      id: uuidv4(),
      name: "Aktive Nutzer",
      value: baseData.kpis.users.value,
      diff: baseData.kpis.users.diff,
      target: baseData.kpis.users.value * 1.15,
      category: "users",
      product: "mobile",
      region: "global",
      status: baseData.kpis.users.diff > 3 ? 'excellent' : baseData.kpis.users.diff > 0 ? 'good' : 'warning',
      trend: baseData.line.map(x => x * 0.1),
      lastUpdated: new Date().toISOString()
    },
    {
      id: uuidv4(),
      name: "Conversion Rate",
      value: baseData.kpis.conversion.value,
      diff: baseData.kpis.conversion.diff,
      target: 5.0,
      category: "conversion",
      product: "web",
      region: "eu",
      status: baseData.kpis.conversion.value > 4.5 ? 'excellent' : baseData.kpis.conversion.value > 3.5 ? 'good' : 'warning',
      trend: baseData.line.map(x => (x / 1000) * 0.1),
      lastUpdated: new Date().toISOString()
    },
    {
      id: uuidv4(),
      name: "Churn Rate",
      value: baseData.kpis.churn.value,
      diff: baseData.kpis.churn.diff,
      target: 1.0,
      category: "retention",
      product: "api",
      region: "us",
      status: baseData.kpis.churn.value < 1.0 ? 'excellent' : baseData.kpis.churn.value < 2.0 ? 'good' : 'critical',
      trend: baseData.line.map(x => (x / 10000) * 0.5),
      lastUpdated: new Date().toISOString()
    },
    {
      id: uuidv4(),
      name: "Traffic",
      value: baseData.kpis.traffic.value,
      diff: baseData.kpis.traffic.diff,
      target: baseData.kpis.traffic.value * 1.25,
      category: "performance",
      product: "analytics",
      region: "global",
      status: baseData.kpis.traffic.diff > 10 ? 'excellent' : baseData.kpis.traffic.diff > 5 ? 'good' : 'warning',
      trend: baseData.line.map(x => x * 2),
      lastUpdated: new Date().toISOString()
    },
    {
      id: uuidv4(),
      name: "Engagement",
      value: baseData.kpis.engagement.value,
      diff: baseData.kpis.engagement.diff,
      target: 75,
      category: "engagement",
      product: "mobile",
      region: "de",
      status: baseData.kpis.engagement.value > 70 ? 'excellent' : baseData.kpis.engagement.value > 60 ? 'good' : 'warning',
      trend: baseData.line.map(x => (x / 1000) * 0.5 + 60),
      lastUpdated: new Date().toISOString()
    }
  ];

  return {
    kpis,
    charts: {
      line: baseData.line,
      pie: baseData.pie,
      gauge: baseData.gauge,
      bar: [1200, 1900, 3000, 2500, 3200, 4000, 3800, 4200]
    },
    summary: {
      totalRevenue: kpis.reduce((sum, kpi) => kpi.category === 'revenue' ? sum + kpi.value : sum, 0),
      totalUsers: kpis.reduce((sum, kpi) => kpi.category === 'users' ? sum + kpi.value : sum, 0),
      avgConversion: kpis.filter(kpi => kpi.category === 'conversion').reduce((sum, kpi) => sum + kpi.value, 0) / kpis.filter(kpi => kpi.category === 'conversion').length,
      totalTraffic: kpis.reduce((sum, kpi) => kpi.category === 'performance' ? sum + kpi.value : sum, 0)
    }
  };
}

// Dummy-Daten-Generator für verschiedene Zeiträume
function getDashboardData(period: string) {
  switch (period) {
    case "7d":
      return {
        kpis: {
          revenue: { value: 12340, diff: 8 },
          users: { value: 1234, diff: 2 },
          conversion: { value: 4.2, diff: 0.3 },
          churn: { value: 1.1, diff: -0.2 },
          traffic: { value: 23456, diff: 5 },
          engagement: { value: 67, diff: 1.5 },
        },
        gauge: { current: 32.7, target: 30 },
        line: [1200, 1900, 3000, 2500, 3200, 4000, 3800],
        pie: [32, 28, 18, 12, 10],
      };
    case "30d":
      return {
        kpis: {
          revenue: { value: 54321, diff: 5 },
          users: { value: 4321, diff: 1 },
          conversion: { value: 4.0, diff: 0.1 },
          churn: { value: 1.3, diff: -0.1 },
          traffic: { value: 65432, diff: 3 },
          engagement: { value: 65, diff: 1.2 },
        },
        gauge: { current: 120.2, target: 110 },
        line: [4000, 4200, 4100, 4300, 4400, 4500, 4600],
        pie: [30, 30, 20, 10, 10],
      };
    case "quarter":
      return {
        kpis: {
          revenue: { value: 154321, diff: 12 },
          users: { value: 14321, diff: 4 },
          conversion: { value: 4.5, diff: 0.5 },
          churn: { value: 1.0, diff: -0.3 },
          traffic: { value: 165432, diff: 8 },
          engagement: { value: 70, diff: 2.1 },
        },
        gauge: { current: 320.7, target: 300 },
        line: [10000, 12000, 11000, 13000, 14000, 15000, 16000],
        pie: [28, 32, 18, 12, 10],
      };
    case "year":
      return {
        kpis: {
          revenue: { value: 654321, diff: 20 },
          users: { value: 54321, diff: 7 },
          conversion: { value: 5.0, diff: 0.8 },
          churn: { value: 0.9, diff: -0.5 },
          traffic: { value: 765432, diff: 15 },
          engagement: { value: 75, diff: 3.5 },
        },
        gauge: { current: 1320.7, target: 1300 },
        line: [20000, 22000, 21000, 23000, 24000, 25000, 26000],
        pie: [25, 35, 20, 10, 10],
      };
    default:
      return getDashboardData("7d");
  }
}

// Hilfsfunktion für zufällige Dummy-Daten
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDashboardData(period: string) {
  const base = getDashboardData(period);
  return {
    kpis: {
      revenue: { value: getRandomInt(10000, 700000), diff: +(Math.random() * 20 - 5).toFixed(1) },
      users: { value: getRandomInt(1000, 60000), diff: +(Math.random() * 10 - 2).toFixed(1) },
      conversion: { value: +(Math.random() * 2 + 3).toFixed(1), diff: +(Math.random() * 1 - 0.5).toFixed(1) },
      churn: { value: +(Math.random() * 1.5 + 0.5).toFixed(1), diff: +(Math.random() * 0.7 - 0.3).toFixed(1) },
      traffic: { value: getRandomInt(10000, 900000), diff: +(Math.random() * 20 - 5).toFixed(1) },
      engagement: { value: +(Math.random() * 20 + 60).toFixed(1), diff: +(Math.random() * 5 - 1).toFixed(1) },
    },
    gauge: { current: +(Math.random() * 1500 + 20).toFixed(1), target: +(Math.random() * 1500 + 20).toFixed(1) },
    line: Array(7).fill(0).map(() => getRandomInt(1000, 26000)),
    pie: Array(5).fill(0).map(() => getRandomInt(8, 40)),
  };
}

// KPI-Tooltip-Komponente
function KpiTooltip({ text, children }: { text: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <span className="absolute z-50 left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-2 rounded-lg bg-black text-xs text-white whitespace-nowrap shadow-lg">
          {text}
        </span>
      )}
    </span>
  );
}

// Modal-Komponente für KPI-Details
function KpiModal({ open, onClose, kpi, name, diff, history }: {
  open: boolean;
  onClose: () => void;
  kpi: number | string;
  name: string;
  diff: number;
  history: number[];
}) {
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);
  
  if (!open) return null;
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="neumorph-modal p-8 min-w-[90vw] max-w-lg w-full relative"
        style={{ maxWidth: 400 }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-[#b0b0b0] hover:text-[#e0e0e0] text-xl transition-colors" aria-label="Schließen">×</button>
        <h2 className="text-2xl font-bold mb-2 text-[#e0e0e0]">{name}</h2>
        <div className="text-4xl font-extrabold mb-1 flex items-center text-[#e0e0e0]">
          {typeof kpi === 'number' ? kpi.toLocaleString() : kpi} 
          <TrendArrow diff={diff} />
        </div>
        <div className={`mb-4 text-lg ${diff >= 0 ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>
          {diff >= 0 ? '+' : ''}{diff}% im Vergleich
        </div>
        <div className="h-24">
          <Line
            data={{
              labels: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
              datasets: [{
                label: name,
                data: history,
                borderColor: "#4a9eff",
                backgroundColor: "rgba(74, 158, 255, 0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: 2,
                pointBackgroundColor: "#4a9eff",
              }],
            }}
            options={{
              plugins: { legend: { display: false } },
              scales: {
                x: { display: false },
                y: { display: false },
              },
              responsive: true,
              maintainAspectRatio: false,
            }}
            height={80}
          />
        </div>
      </div>
    </div>
  );
}

// Spinner-Komponente
function Spinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

// Theme-Icons
function SunIcon() {
  return <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15a5 5 0 100-10 5 5 0 000 10zm0 2a7 7 0 110-14 7 7 0 010 14zm0-18a1 1 0 011 1v2a1 1 0 11-2 0V0a1 1 0 011-1zm0 18a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm10-8a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zm-18 0a1 1 0 01-1 1H0a1 1 0 110-2h2a1 1 0 011 1zm15.07 7.07a1 1 0 01-1.41 0l-1.42-1.42a1 1 0 111.42-1.42l1.41 1.42a1 1 0 010 1.42zm-12.14 0a1 1 0 010-1.42l1.42-1.42a1 1 0 111.42 1.42L3.93 17.07a1 1 0 01-1.42 0zm12.14-12.14a1 1 0 010 1.42l-1.42 1.42a1 1 0 11-1.42-1.42l1.42-1.42a1 1 0 011.42 0zm-12.14 0a1 1 0 011.42 0l1.42 1.42a1 1 0 11-1.42 1.42L3.93 2.93a1 1 0 01-1.42 0z"/></svg>;
}

function MoonIcon() {
  return <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>;
}

// Trend-Pfeil-Komponente
function TrendArrow({ diff }: { diff: number }) {
  if (diff > 0) return <span className="inline-block text-[#4ade80] ml-1" aria-label="Steigend">▲</span>;
  if (diff < 0) return <span className="inline-block text-[#f87171] ml-1" aria-label="Fallend">▼</span>;
  return null;
}

type KpiKey = 'revenue' | 'users' | 'conversion' | 'churn' | 'traffic' | 'engagement';

// Sidebar-Icons
function DashboardIcon() { 
  return <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="9" rx="2"/><rect x="14" y="3" width="7" height="5" rx="2"/><rect x="14" y="12" width="7" height="9" rx="2"/><rect x="3" y="16" width="7" height="5" rx="2"/></svg>; 
}

function ReportIcon() { 
  return <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2"/><path d="M21 21V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14"/><rect x="7" y="3" width="10" height="4" rx="2"/></svg>; 
}

function SettingsIcon() { 
  return <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33h.09A1.65 1.65 0 007 3.09V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51h.09a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.09a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>; 
}

function UserIcon() { 
  return <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.38 8.38 0 0113 0"/></svg>; 
}

function BellIcon() { 
  return <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>; 
}

// ProgressBar-Komponente
function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="w-full h-2 bg-white/10 rounded-full mt-3">
      <div 
        className="h-2 rounded-full transition-all duration-300" 
        style={{ width: `${Math.min(100, Math.abs(value))}%`, background: color }} 
      />
    </div>
  );
}

// Theme Toggle Component
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Theme wechseln"
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const a = ((angle - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(a),
    y: cy + r * Math.sin(a),
  };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M", start.x, start.y,
    "A", r, r, 0, arcSweep, 1, end.x, end.y
  ].join(" ");
}

function AnimatedGaugeChart({ value, target, duration = 1200 }: { value: number; target: number; duration?: number }) {
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const percentage = Math.max(0, Math.min((value / target) * 100, 100));

  useEffect(() => {
    let start: number | null = null;
    let frame: number;
    function animate(ts: number) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setAnimatedPercent(progress * percentage);
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setAnimatedPercent(percentage);
      }
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [percentage, duration]);

  const startAngle = 135;
  const totalAngle = 270;
  const endAngle = startAngle + (totalAngle * (animatedPercent / 100));

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 200 120" className="w-full h-full">
        {/* Background arc */}
        <path
          d={describeArc(100, 100, 80, startAngle, startAngle + totalAngle)}
          fill="none"
          stroke="#404040"
          strokeWidth="16"
          strokeLinecap="round"
        />
        {/* Progress arc */}
        {animatedPercent > 0 && (
          <path
            d={describeArc(100, 100, 80, startAngle, endAngle)}
            fill="none"
            stroke="#4ade80"
            strokeWidth="16"
            strokeLinecap="round"
          />
        )}
        {/* Center text */}
        <text x="100" y="80" textAnchor="middle" fontSize="40" fontWeight="bold" fill="#e0e0e0">
          {Math.round(animatedPercent)}%
        </text>
        <text x="100" y="105" textAnchor="middle" fontSize="28" fill="#b0b0b0">
          {value.toLocaleString()}
        </text>
      </svg>
    </div>
  );
}

// MultiSelect Component
function MultiSelect({ options, selected, onChange, placeholder }: {
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const selectedLabels = selected.map(s => options.find(opt => opt.value === s)?.label).filter(Boolean);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="neumorph-input w-full px-3 py-2 text-sm text-left focus:outline-none flex items-center justify-between"
      >
        <span className={selectedLabels.length > 0 ? 'text-[#e0e0e0]' : 'text-[#b0b0b0]'}>
          {selectedLabels.length > 0 ? selectedLabels.join(', ') : placeholder}
        </span>
        <svg className="w-4 h-4 text-[#b0b0b0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 neumorph-card border border-[#404040] rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <label key={option.value} className="flex items-center px-3 py-2 hover:bg-[#404040] cursor-pointer">
              <input
                type="checkbox"
                checked={selected.includes(option.value)}
                onChange={() => handleToggle(option.value)}
                className="mr-2 rounded border-[#404040] text-[#4a9eff] focus:ring-[#4a9eff]"
              />
              <span className="text-sm text-[#e0e0e0]">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

// FilterChip Component
function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium neumorph-button-primary">
      {label}
      <button
        onClick={onRemove}
        className="ml-1 hover:bg-[#5aa9ff] rounded-full p-0.5 transition-colors"
      >
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </span>
  );
}

// FilterBar Component
function FilterBar({ filters, setFilters, flat }: {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  flat?: boolean;
}) {
  const clearAllFilters = () => {
    setFilters({
      ...filters,
      categories: [],
      products: [],
      regions: [],
      status: [],
      searchTerm: ''
    });
  };

  const hasActiveFilters = filters.categories.length > 0 || filters.products.length > 0 || 
                          filters.regions.length > 0 || filters.status.length > 0 || filters.searchTerm;

  return (
    <div className={`neumorph-filter p-6 mb-8 ${flat ? 'flat' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#e0e0e0]">Filter & Suche</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-[#4a9eff] hover:text-[#5aa9ff] transition-colors"
          >
            Alle Filter löschen
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold mb-1 text-[#b0b0b0]">Kategorie</label>
          <MultiSelect
            options={CATEGORY_OPTIONS.filter(opt => opt.value !== 'all')}
            selected={filters.categories}
            onChange={(values) => setFilters({ ...filters, categories: values })}
            placeholder="Kategorie wählen"
          />
        </div>
        
        <div>
          <label className="block text-xs font-semibold mb-1 text-[#b0b0b0]">Produkt</label>
          <MultiSelect
            options={PRODUCT_OPTIONS.filter(opt => opt.value !== 'all')}
            selected={filters.products}
            onChange={(values) => setFilters({ ...filters, products: values })}
            placeholder="Produkt wählen"
          />
        </div>
        
        <div>
          <label className="block text-xs font-semibold mb-1 text-[#b0b0b0]">Region</label>
          <MultiSelect
            options={REGION_OPTIONS.filter(opt => opt.value !== 'all')}
            selected={filters.regions}
            onChange={(values) => setFilters({ ...filters, regions: values })}
            placeholder="Region wählen"
          />
        </div>
        
        <div>
          <label className="block text-xs font-semibold mb-1 text-[#b0b0b0]">Status</label>
          <MultiSelect
            options={STATUS_OPTIONS.filter(opt => opt.value !== 'all')}
            selected={filters.status}
            onChange={(values) => setFilters({ ...filters, status: values })}
            placeholder="Status wählen"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Suche nach KPIs..."
            value={filters.searchTerm}
            onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
            className="neumorph-input w-full px-3 py-2 text-sm focus:outline-none"
          />
        </div>
      </div>
      
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.categories.map(cat => (
            <FilterChip
              key={`cat-${cat}`}
              label={`Kategorie: ${CATEGORY_OPTIONS.find(opt => opt.value === cat)?.label}`}
              onRemove={() => setFilters({ ...filters, categories: filters.categories.filter(c => c !== cat) })}
            />
          ))}
          {filters.products.map(prod => (
            <FilterChip
              key={`prod-${prod}`}
              label={`Produkt: ${PRODUCT_OPTIONS.find(opt => opt.value === prod)?.label}`}
              onRemove={() => setFilters({ ...filters, products: filters.products.filter(p => p !== prod) })}
            />
          ))}
          {filters.regions.map(region => (
            <FilterChip
              key={`region-${region}`}
              label={`Region: ${REGION_OPTIONS.find(opt => opt.value === region)?.label}`}
              onRemove={() => setFilters({ ...filters, regions: filters.regions.filter(r => r !== region) })}
            />
          ))}
          {filters.status.map(status => (
            <FilterChip
              key={`status-${status}`}
              label={`Status: ${STATUS_OPTIONS.find(opt => opt.value === status)?.label}`}
              onRemove={() => setFilters({ ...filters, status: filters.status.filter(s => s !== status) })}
            />
          ))}
          {filters.searchTerm && (
            <FilterChip
              key="search"
              label={`Suche: "${filters.searchTerm}"`}
              onRemove={() => setFilters({ ...filters, searchTerm: '' })}
            />
          )}
        </div>
      )}
    </div>
  );
}

// KpiDataTable Component
function KpiDataTable({ kpis, onKpiClick, flat }: { kpis: KpiData[]; onKpiClick: (kpi: KpiData) => void; flat?: boolean }) {
  const [sortField, setSortField] = useState<keyof KpiData>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const sortedKpis = useMemo(() => {
    return [...kpis].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      return 0;
    });
  }, [kpis, sortField, sortDirection]);

  const handleSort = (field: keyof KpiData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'neumorph-success';
      case 'good': return 'neumorph-button-primary';
      case 'warning': return 'neumorph-warning';
      case 'critical': return 'neumorph-danger';
      default: return 'neumorph-button';
    }
  };

  const SortIcon = ({ field }: { field: keyof KpiData }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <div className={`neumorph-table ${flat ? 'flat' : ''}`}>
      <div className="px-6 py-4 neumorph-table-header">
        <h3 className="text-lg font-semibold text-[#e0e0e0]">KPI Details</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#404040]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#b0b0b0] uppercase tracking-wider cursor-pointer hover:bg-[#505050] transition-colors" onClick={() => handleSort('name')}>
                Name <SortIcon field="name" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#b0b0b0] uppercase tracking-wider cursor-pointer hover:bg-[#505050] transition-colors" onClick={() => handleSort('value')}>
                Wert <SortIcon field="value" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#b0b0b0] uppercase tracking-wider cursor-pointer hover:bg-[#505050] transition-colors" onClick={() => handleSort('diff')}>
                Änderung <SortIcon field="diff" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#b0b0b0] uppercase tracking-wider cursor-pointer hover:bg-[#505050] transition-colors" onClick={() => handleSort('category')}>
                Kategorie <SortIcon field="category" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#b0b0b0] uppercase tracking-wider cursor-pointer hover:bg-[#505050] transition-colors" onClick={() => handleSort('status')}>
                Status <SortIcon field="status" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#b0b0b0] uppercase tracking-wider">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody className="bg-[#333333] divide-y divide-[#404040]">
            {sortedKpis.map((kpi) => (
              <tr key={kpi.id} className="hover:bg-[#404040] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#e0e0e0]">
                  {kpi.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#e0e0e0]">
                  {kpi.value.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`font-medium ${kpi.diff >= 0 ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>
                    {kpi.diff >= 0 ? '+' : ''}{kpi.diff}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#e0e0e0]">
                  {CATEGORY_OPTIONS.find(opt => opt.value === kpi.category)?.label}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(kpi.status)}`}>
                    {STATUS_OPTIONS.find(opt => opt.value === kpi.status)?.label}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#e0e0e0]">
                  <button
                    onClick={() => onKpiClick(kpi)}
                    className="text-[#4a9eff] hover:text-[#5aa9ff] font-medium transition-colors"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// FallbackIcon Component
function FallbackIcon({ text }: { text: string }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-12 text-[#b0b0b0]">
      <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
      </svg>
      <p className="text-lg font-medium text-[#e0e0e0]">{text}</p>
      <p className="text-sm">Versuchen Sie andere Filter zu verwenden</p>
    </div>
  );
}

export default function Dashboard() {
  const { theme } = useTheme();
  const pathname = usePathname();
  const [period, setPeriod] = useState("7d");
  const [data, setData] = useState(generateAdvancedDashboardData("7d"));
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  // Erweiterte Filter-States
  const [filters, setFilters] = useState<FilterState>({
    period: "7d",
    categories: [],
    products: [],
    regions: [],
    status: [],
    searchTerm: ""
  });

  // Modal-Logik
  const [modalOpen, setModalOpen] = useState(false);
  const [modalKpi, setModalKpi] = useState<KpiData | null>(null);

  // Gefilterte KPIs
  const filteredKpis = useMemo(() => {
    return data.kpis.filter(kpi => {
      // Kategorie Filter
      if (filters.categories.length > 0 && !filters.categories.includes(kpi.category)) {
        return false;
      }
      
      // Produkt Filter
      if (filters.products.length > 0 && !filters.products.includes(kpi.product)) {
        return false;
      }
      
      // Region Filter
      if (filters.regions.length > 0 && !filters.regions.includes(kpi.region)) {
        return false;
      }
      
      // Status Filter
      if (filters.status.length > 0 && !filters.status.includes(kpi.status)) {
        return false;
      }
      
      // Suchfilter
      if (filters.searchTerm && !kpi.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }, [data.kpis, filters]);

  // KPI-Detail-Handler
  const handleKpiClick = (kpi: KpiData) => {
    setModalKpi(kpi);
    setModalOpen(true);
  };

  // Aktualisieren-Button
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setData(generateAdvancedDashboardData(period));
      setLoading(false);
    }, 600);
  };

  // Period Change Handler
  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
    setData(generateAdvancedDashboardData(newPeriod));
  };

  const lineData = useMemo(() => ({
    labels: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
    datasets: [
      {
        label: "Umsatz",
        data: data.charts.line,
        borderColor: "#4a9eff",
        backgroundColor: "rgba(74, 158, 255, 0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#4a9eff",
      },
    ],
  }), [data.charts.line]);

  const pieData = useMemo(() => ({
    labels: ["SEO", "Ads", "Social", "Direct", "Referral"],
    datasets: [
      {
        label: "Traffic-Quellen",
        data: data.charts.pie,
        backgroundColor: [
          "#4a9eff",
          "#fbbf24",
          "#a78bfa",
          "#f87171",
          "#4ade80",
        ],
        borderWidth: 1,
      },
    ],
  }), [data.charts.pie]);

  const barData = useMemo(() => ({
    labels: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Monatlicher Umsatz",
        data: data.charts.bar,
        backgroundColor: "rgba(74, 158, 255, 0.8)",
        borderColor: "#4a9eff",
        borderWidth: 1,
      },
    ],
  }), [data.charts.bar]);

  // Custom Gauge Chart (Halbkreis) als Doughnut
  const gaugeData = useMemo(() => ({
    labels: ["Erreicht", "Rest"],
    datasets: [
      {
        data: [data.charts.gauge.current, data.charts.gauge.target - data.charts.gauge.current > 0 ? data.charts.gauge.target - data.charts.gauge.current : 0],
        backgroundColor: ["#4ade80", "#404040"],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
        cutout: "80%",
      },
    ],
  }), [data.charts.gauge.current, data.charts.gauge.target]);

  const gaugeOptions = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    circumference: 180,
    rotation: 270,
    cutout: "80%",
    responsive: true,
    maintainAspectRatio: false,
  };

  // Erweiterte Exportfunktion
  const handleExport = async (type: 'png' | 'pdf' | 'csv') => {
    if (type === 'csv') {
      // CSV Export für KPI-Daten
      const csvContent = [
        ['Name', 'Wert', 'Änderung (%)', 'Kategorie', 'Produkt', 'Region', 'Status'],
        ...filteredKpis.map(kpi => [
          kpi.name,
          kpi.value.toString(),
          kpi.diff.toString(),
          CATEGORY_OPTIONS.find(opt => opt.value === kpi.category)?.label || '',
          PRODUCT_OPTIONS.find(opt => opt.value === kpi.product)?.label || '',
          REGION_OPTIONS.find(opt => opt.value === kpi.region)?.label || '',
          STATUS_OPTIONS.find(opt => opt.value === kpi.status)?.label || ''
        ])
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `kpi-data-${period}-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      window.URL.revokeObjectURL(url);
      toast.success('KPI-Daten als CSV exportiert');
      return;
    }

    if (!dashboardRef.current) return;
    
    try {
      setLoading(true);
      const canvas = await html2canvas(dashboardRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#2a2a2a'
      });
      
      if (type === 'png') {
        const link = document.createElement('a');
        link.download = `dashboard-${period}-${new Date().toISOString().split('T')[0]}.png`;
        link.href = canvas.toDataURL();
        link.click();
        toast.success('Dashboard als PNG exportiert');
      } else if (type === 'pdf') {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('landscape', 'mm', 'a4');
        const imgWidth = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`dashboard-${period}-${new Date().toISOString().split('T')[0]}.pdf`);
        toast.success('Dashboard als PDF exportiert');
      }
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Export fehlgeschlagen');
    } finally {
      setLoading(false);
    }
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#e0e0e0',
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: '#404040',
        },
        ticks: {
          color: '#e0e0e0',
        }
      },
      y: {
        grid: {
          color: '#404040',
        },
        ticks: {
          color: '#e0e0e0',
        }
      }
    }
  };

  // Pie Chart Optionen ohne Achsen/Grid
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: '#e0e0e0',
        }
      }
    }
    // Keine scales nötig
  };

  return (
    <div className="flex min-h-screen bg-[#18181b] transition-colors duration-300">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col items-center py-8 px-4 gap-8 bg-[#23232a] border-r border-[#23232a] min-w-[80px] shadow-lg">
        <div className="mb-8">
          <img src="/brandwerkx.webp" alt="Logo" className="w-10 h-10 rounded-full border-2 border-[#4a9eff] shadow-lg" />
        </div>
        <nav className="flex flex-col gap-8 text-[#b0b0b0]">
          <Link href="/dashboard" passHref legacyBehavior>
            <a className={pathname === "/dashboard" ? "text-[#4a9eff] bg-[#23232a] rounded-lg shadow-md" : "hover:text-[#4a9eff] transition-colors"} aria-label="Dashboard" title="Dashboard">
              <DashboardIcon />
            </a>
          </Link>
          <Link href="/reports" passHref legacyBehavior>
            <a className={pathname === "/reports" ? "text-[#4a9eff] bg-[#23232a] rounded-lg shadow-md" : "hover:text-[#4a9eff] transition-colors"} aria-label="Reports" title="Reports">
              <ReportIcon />
            </a>
          </Link>
          <Link href="/settings" passHref legacyBehavior>
            <a className={pathname === "/settings" ? "text-[#4a9eff] bg-[#23232a] rounded-lg shadow-md" : "hover:text-[#4a9eff] transition-colors"} aria-label="Settings" title="Settings">
              <SettingsIcon />
            </a>
          </Link>
        </nav>
        <div className="flex-1" />
        <Link href="/profile" passHref legacyBehavior>
          <a className={pathname === "/profile" ? "text-[#4a9eff] bg-[#23232a] rounded-lg shadow-md" : "hover:text-[#4a9eff] transition-colors"} aria-label="User" title="Profil">
            <UserIcon />
          </a>
        </Link>
      </aside>

      {/* Main Content */}
      <main ref={dashboardRef} className="flex-1 flex flex-col min-h-screen pb-16 md:pb-0">
        {loading && <Spinner />}
        
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[#23232a] border-b border-[#23232a] shadow-lg">
          <div className="max-w-[1440px] mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#4a9eff] rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-white">
                      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                  </div>
                  <div className="hidden sm:block">
                    <h1 className="text-xl font-bold text-[#e0e0e0]">Executive Dashboard</h1>
                    <p className="text-sm text-[#b0b0b0]">Überblick & Analytics</p>
                  </div>
                  <div className="sm:hidden">
                    <h1 className="text-lg font-bold text-[#e0e0e0]">Dashboard</h1>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={period}
                  onChange={(e) => handlePeriodChange(e.target.value)}
                  className="bg-[#23232a] border border-[#404040] rounded-lg px-3 py-2 text-sm text-[#e0e0e0] focus:outline-none"
                >
                  <option value="7d">Letzte 7 Tage</option>
                  <option value="30d">Letzte 30 Tage</option>
                  <option value="quarter">Letztes Quartal</option>
                  <option value="year">Dieses Jahr</option>
                </select>
                <button
                  onClick={handleRefresh}
                  className="p-2 text-[#b0b0b0] hover:text-[#4a9eff] bg-[#23232a] rounded-lg border border-[#404040] shadow-md transition-colors"
                  aria-label="Aktualisieren"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                </button>
                <div className="relative">
                  <button
                    onClick={() => handleExport('png')}
                    className="p-2 text-[#b0b0b0] hover:text-[#4a9eff] bg-[#23232a] rounded-lg border border-[#404040] shadow-md transition-colors"
                    aria-label="Export"
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#4a9eff] scrollbar-track-[#23232a]">
          <div className="w-full py-8">
            {/* Filterbar */}
            <div className="mb-8">
              <FilterBar filters={filters} setFilters={setFilters} flat />
            </div>
            {/* KPI-Karten: Grid */}
            <div className="grid gap-x-8 gap-y-10 mb-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {filteredKpis.length === 0 ? (
                <FallbackIcon text="Keine KPIs für die gewählten Filter" />
              ) : filteredKpis.map(kpi => (
                <div 
                  key={kpi.id}
                  className="bg-[#23232a] border border-[#404040] rounded-xl shadow-lg h-full min-h-[120px] flex flex-col justify-between p-4 cursor-pointer hover:border-[#4a9eff] transition"
                  onClick={() => handleKpiClick(kpi)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-semibold text-[#e0e0e0]">{kpi.name}</h3>
                    <KpiTooltip text={`${kpi.name} - ${CATEGORY_OPTIONS.find(opt => opt.value === kpi.category)?.label}`}>
                      <svg width="16" height="16" fill="none" stroke="#b0b0b0" strokeWidth="2" viewBox="0 0 24 24" className="ml-1"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="1"/></svg>
                    </KpiTooltip>
                  </div>
                  <div className="text-xl font-bold text-[#e0e0e0] mb-1">{kpi.value.toLocaleString()}</div>
                  <div className="flex items-center gap-2 mb-1">
                    <TrendArrow diff={kpi.diff} />
                    <span className={`text-xs font-medium ${kpi.diff >= 0 ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>{kpi.diff >= 0 ? '+' : ''}{kpi.diff}%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#b0b0b0]">
                    <span>{CATEGORY_OPTIONS.find(opt => opt.value === kpi.category)?.label}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${kpi.status === 'excellent' ? 'bg-[#4ade80] text-white' : kpi.status === 'good' ? 'bg-[#4a9eff] text-white' : kpi.status === 'warning' ? 'bg-[#fbbf24] text-white' : 'bg-[#f87171] text-white'}`}>{STATUS_OPTIONS.find(opt => opt.value === kpi.status)?.label}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Charts: Grid */}
            <div className="grid gap-x-10 gap-y-12 mb-10 grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
              <div className="bg-[#23232a] border border-[#404040] rounded-xl shadow-lg min-h-[320px] min-w-[320px] w-full mx-auto flex flex-col">
                <h3 className="text-base font-semibold text-[#e0e0e0] mb-2">Revenue Trend</h3>
                <div className="flex-1">
                  <Line data={lineData} options={chartOptions} />
                </div>
              </div>
              <div className="bg-[#23232a] border border-[#404040] rounded-xl shadow-lg min-h-[320px] min-w-[320px] w-full mx-auto flex flex-col">
                <h3 className="text-base font-semibold text-[#e0e0e0] mb-2">Traffic Sources</h3>
                <div className="flex-1">
                  <Pie data={pieData} options={pieOptions} />
                </div>
              </div>
              <div className="bg-[#23232a] border border-[#404040] rounded-xl shadow-lg min-h-[320px] min-w-[320px] w-full mx-auto flex flex-col md:col-span-2">
                <h3 className="text-base font-semibold text-[#e0e0e0] mb-2">Monatlicher Umsatz</h3>
                <div className="flex-1">
                  <Bar data={barData} options={chartOptions} />
                </div>
              </div>
              <div className="bg-[#23232a] border border-[#404040] rounded-xl shadow-lg min-h-[320px] min-w-[320px] w-full mx-auto flex flex-col md:col-span-2">
                <h3 className="text-base font-semibold text-[#e0e0e0] mb-2">Revenue Target</h3>
                <div className="flex-1 flex items-center justify-center">
                  <AnimatedGaugeChart value={data.charts.gauge.current} target={data.charts.gauge.target} />
                </div>
              </div>
            </div>
            {/* Tabelle */}
            <section className="mb-8">
              <KpiDataTable kpis={filteredKpis} onKpiClick={handleKpiClick} flat />
            </section>
          </div>
        </main>
      </main>
      {/* Bottom Navigation für Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center bg-[#23232a] border-t border-[#23232a] h-16 md:hidden shadow-lg">
        <Link href="/dashboard" passHref legacyBehavior>
          <a className={pathname === "/dashboard" ? "text-[#4a9eff] bg-[#23232a] rounded-lg shadow-md flex flex-col items-center" : "hover:text-[#4a9eff] transition-colors flex flex-col items-center"} aria-label="Dashboard" title="Dashboard">
            <DashboardIcon />
            <span className="text-xs mt-1">Dashboard</span>
          </a>
        </Link>
        <Link href="/reports" passHref legacyBehavior>
          <a className={pathname === "/reports" ? "text-[#4a9eff] bg-[#23232a] rounded-lg shadow-md flex flex-col items-center" : "hover:text-[#4a9eff] transition-colors flex flex-col items-center"} aria-label="Reports" title="Reports">
            <ReportIcon />
            <span className="text-xs mt-1">Reports</span>
          </a>
        </Link>
        <Link href="/settings" passHref legacyBehavior>
          <a className={pathname === "/settings" ? "text-[#4a9eff] bg-[#23232a] rounded-lg shadow-md flex flex-col items-center" : "hover:text-[#4a9eff] transition-colors flex flex-col items-center"} aria-label="Settings" title="Settings">
            <SettingsIcon />
            <span className="text-xs mt-1">Settings</span>
          </a>
        </Link>
        <Link href="/profile" passHref legacyBehavior>
          <a className={pathname === "/profile" ? "text-[#4a9eff] bg-[#23232a] rounded-lg shadow-md flex flex-col items-center" : "hover:text-[#4a9eff] transition-colors flex flex-col items-center"} aria-label="Profil" title="Profil">
            <UserIcon />
            <span className="text-xs mt-1">Profil</span>
          </a>
        </Link>
      </nav>
      {/* KPI Modal */}
      {modalKpi && (
        <KpiModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          kpi={modalKpi.value}
          name={modalKpi.name}
          diff={modalKpi.diff}
          history={modalKpi.trend}
        />
      )}

      {/* Toast Notifications */}
      <Toaster position="top-right" />
    </div>
  );
} 