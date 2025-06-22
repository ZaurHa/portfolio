import { Metadata } from 'next'
import SchroepftherapieContent from './content';

export const metadata: Metadata = {
  title: 'Schröpftherapie & Massage in Geretsried | Zaira Beauty',
  description: 'Lösen Sie Verspannungen und lindern Sie Migräne mit unserer Schröpftherapie und speziellen Massagen bei Zaira Beauty in Geretsried.',
  keywords: ['Schröpftherapie', 'Schröpfmassage', 'Anti-Migräne Massage', 'Verspannungen lösen', 'Durchblutung fördern', 'Zaira Beauty', 'Geretsried'],
  openGraph: {
    title: 'Schröpftherapie gegen Verspannungen in Geretsried | Zaira Beauty',
    description: 'Effektive Schröpfmassagen zur Linderung von Schmerzen und zur Förderung der Entspannung.',
    url: 'https://zairabeauty.de/schroepftherapie',
  },
};

export default function SchroepftherapiePage() {
    return <SchroepftherapieContent />;
} 