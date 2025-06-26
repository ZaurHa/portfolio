import { Metadata } from 'next'
import HairGrowthContent from './content';

export const metadata: Metadata = {
  title: 'Behandlung bei Haarausfall in Geretsried | Zaira Beauty',
  description: 'Effektive Hilfe bei Haarausfall für Männer und Frauen. Zaira Beauty in Geretsried kombiniert Microneedling mit Stammzellen und Lasertherapie für volles Haar.',
  keywords: ['Haarausfall', 'Haarwachstum anregen', 'Geheimratsecken', 'dünnes Haar', 'Microneedling Kopfhaut', 'Lasertherapie Haare', 'Zaira Beauty', 'Geretsried'],
  openGraph: {
    title: 'Hilfe bei Haarausfall in Geretsried | Zaira Beauty',
    description: 'Unsere "Hair Growth"-Behandlung aktiviert die Haarwurzeln und fördert neues, kräftiges Haarwachstum.',
    url: 'https://zairabeauty.de/haarausfall-behandlung',
  },
};

export default function HairGrowthPage() {
    return <HairGrowthContent />;
} 