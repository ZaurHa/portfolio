import { Metadata } from 'next'
import RueckenreinigungContent from './content';

export const metadata: Metadata = {
  title: 'Rückenreinigung in Geretsried | Gegen Unreinheiten | Zaira Beauty',
  description: 'Professionelle Rückenreinigung bei Zaira Beauty in Geretsried. Wir behandeln Unreinheiten und Akne am Rücken für eine klare und glatte Haut.',
  keywords: ['Rückenreinigung', 'Rückenakne', 'Unreinheiten Rücken', 'Aquafacial Rücken', 'Microneedling Rücken', 'Schälkur', 'Zaira Beauty', 'Geretsried'],
  openGraph: {
    title: 'Rückenreinigung für reine Haut in Geretsried | Zaira Beauty',
    description: 'Befreien Sie Ihren Rücken von Unreinheiten mit unseren effektiven Behandlungen.',
    url: 'https://zairabeauty.de/rueckenreinigung',
  },
};

export default function RueckenreinigungPage() {
    return <RueckenreinigungContent />;
} 