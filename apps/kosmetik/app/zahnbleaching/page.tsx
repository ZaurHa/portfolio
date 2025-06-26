import { Metadata } from 'next'
import ZahnbleachingContent from './content'

export const metadata: Metadata = {
  title: 'Zahnbleaching in Geretsried | Strahlend weiße Zähne | Zaira Beauty',
  description: 'Erhalten Sie ein strahlend weißes Lächeln mit unserem professionellen und schonenden Zahnbleaching bei Zaira Beauty in Geretsried. Sicher und effektiv.',
  keywords: ['Zahnbleaching', 'Zähne aufhellen', 'weißes Lächeln', 'kosmetisches Zahnbleaching', 'Zahnaufhellung', 'Zaira Beauty', 'Geretsried'],
  openGraph: {
    title: 'Professionelles Zahnbleaching in Geretsried | Zaira Beauty',
    description: 'Schenken Sie sich ein strahlendes, selbstbewusstes Lächeln mit unserem sicheren Zahnbleaching.',
    url: 'https://zairabeauty.de/zahnbleaching',
  },
};

const ZahnbleachingPage = () => {
    return <ZahnbleachingContent />
}

export default ZahnbleachingPage 