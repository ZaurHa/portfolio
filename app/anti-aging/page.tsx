import { Metadata } from 'next'
import AntiAgingContent from './content'

export const metadata: Metadata = {
  title: 'Anti-Aging Behandlungen in Geretsried | Jünger aussehen | Zaira Beauty',
  description: 'Entdecken Sie effektive Anti-Aging Behandlungen wie Microneedling, RF-Lifting und Mesotherapie bei Zaira Beauty in Geretsried. Für eine straffe, jugendliche Haut.',
  keywords: ['Anti-Aging', 'Faltenreduzierung', 'Hautverjüngung', 'Microneedling', 'RF-Lifting', 'Mesotherapie', 'Kosmetikstudio Geretsried', 'Zaira Beauty'],
  openGraph: {
    title: 'Anti-Aging Behandlungen in Geretsried | Zaira Beauty',
    description: 'Reduzieren Sie Falten und verjüngen Sie Ihre Haut mit unseren professionellen Anti-Aging Methoden.',
    url: 'https://zairabeauty.de/anti-aging',
  },
};

const AntiAgingPage = () => {
    return <AntiAgingContent />
}

export default AntiAgingPage 