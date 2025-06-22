import { Metadata } from 'next'
import ClearIntimPeelContent from './content';

export const metadata: Metadata = {
  title: 'Clear Intimpeel in Geretsried | Intim-Aufhellung | Zaira Beauty',
  description: 'Diskrete und professionelle Behandlung zur Aufhellung im Intimbereich oder bei Po-Akne. Zaira Beauty in Geretsried bietet sichere Lösungen für ein ebenmäßiges Hautbild.',
  keywords: ['Clear Intimpeel', 'Intim-Aufhellung', 'Po-Akne', 'Hyperpigmentierung Intimbereich', 'diskrete Kosmetik', 'Zaira Beauty', 'Geretsried'],
  openGraph: {
    title: 'Clear Intimpeel & Po-Akne Behandlung in Geretsried | Zaira Beauty',
    description: 'Spezialisierte Behandlungen für den Intimbereich und Po. Sicher und diskret für ein gleichmäßiges Hautbild.',
    url: 'https://zairabeauty.de/clear-intimpeel',
  },
};

export default function ClearIntimPeelPage() {
    return <ClearIntimPeelContent />;
} 