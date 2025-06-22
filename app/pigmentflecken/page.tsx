import { Metadata } from 'next'
import PigmentfleckenContent from './content';

export const metadata: Metadata = {
  title: 'Pigmentflecken entfernen in Geretsried | Zaira Beauty',
  description: 'Reduzieren Sie Pigmentflecken und Altersflecken mit modernen Behandlungen wie Lasertherapie und Spezial-Peelings bei Zaira Beauty in Geretsried.',
  keywords: ['Pigmentflecken entfernen', 'Altersflecken', 'Hyperpigmentierung', 'Lasertherapie', 'Anti Pigment Peel', 'Microneedling', 'Zaira Beauty', 'Geretsried'],
  openGraph: {
    title: 'Behandlung von Pigmentflecken in Geretsried | Zaira Beauty',
    description: 'Für einen ebenmäßigen und strahlenden Teint ohne störende Pigmentflecken.',
    url: 'https://zairabeauty.de/pigmentflecken',
  },
};

export default function PigmentfleckenPage() {
    return <PigmentfleckenContent />;
} 