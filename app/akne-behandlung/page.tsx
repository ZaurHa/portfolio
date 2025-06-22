import { Metadata } from 'next'
import AkneContent from './content'

export const metadata: Metadata = {
  title: 'Aknebehandlung in Geretsried | Hilfe bei Akne & Narben | Zaira Beauty',
  description: 'Effektive Aknebehandlung und Aknenarben-Reduzierung bei Zaira Beauty in Geretsried. Mit Fruchtsäurepeeling, Microneedling & mehr zu reiner Haut.',
  keywords: ['Aknebehandlung', 'Aknenarben', 'unreine Haut', 'Fruchtsäurepeeling', 'Microneedling', 'Hautbild verbessern', 'Zaira Beauty', 'Geretsried'],
  openGraph: {
    title: 'Aknebehandlung in Geretsried | Zaira Beauty',
    description: 'Professionelle Hilfe bei Akne und Aknenarben für ein klares und reines Hautbild.',
    url: 'https://zairabeauty.de/akne-behandlung',
  },
};

const AknePage = () => {
    return <AkneContent />
}

export default AknePage 