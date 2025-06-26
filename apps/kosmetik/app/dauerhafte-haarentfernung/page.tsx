import { Metadata } from 'next'
import HairRemovalContent from './content'

export const metadata: Metadata = {
  title: 'Dauerhafte Haarentfernung in Geretsried | Laser & IPL | Zaira Beauty',
  description: 'Genießen Sie glatte Haut mit dauerhafter Haarentfernung bei Zaira Beauty in Geretsried. Moderne Laser- und IPL-Technologie für alle Körperbereiche.',
  keywords: ['Dauerhafte Haarentfernung', 'Laser-Haarentfernung', 'IPL', 'glatte Haut', 'Haare entfernen', 'Kosmetikstudio Geretsried', 'Zaira Beauty'],
  openGraph: {
    title: 'Dauerhafte Haarentfernung in Geretsried | Zaira Beauty',
    description: 'Sagen Sie Rasur und Waxing adé. Dauerhaft glatte Haut mit moderner Laser-Technologie.',
    url: 'https://zairabeauty.de/dauerhafte-haarentfernung',
  },
};

const HairRemovalPage = () => {
    return <HairRemovalContent />
}

export default HairRemovalPage 