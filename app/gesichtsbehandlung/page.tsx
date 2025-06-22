import { Metadata } from 'next'
import GesichtsbehandlungContent from './content';

export const metadata: Metadata = {
  title: 'Gesichtsbehandlungen in Geretsried | Aquafacial, Lifting | Zaira Beauty',
  description: 'Gönnen Sie sich eine luxuriöse Gesichtsbehandlung bei Zaira Beauty in Geretsried. Von Aquafacial über Kollagenbehandlungen bis zum Yellow Peel.',
  keywords: ['Gesichtsbehandlung', 'Aquafacial', 'Kollagen', 'Lifting', 'Yellow Peel', 'Hautreinigung', 'Kosmetikstudio Geretsried', 'Zaira Beauty'],
  openGraph: {
    title: 'Professionelle Gesichtsbehandlungen in Geretsried | Zaira Beauty',
    description: 'Verwöhnen Sie Ihre Haut mit unseren exklusiven Gesichtsbehandlungen für ein strahlendes Aussehen.',
    url: 'https://zairabeauty.de/gesichtsbehandlung',
  },
};

export default function GesichtsbehandlungPage() {
    return <GesichtsbehandlungContent />;
} 