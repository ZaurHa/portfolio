import { Metadata } from 'next'
import LashBrowContent from './content';

export const metadata: Metadata = {
  title: 'Lashlifting & Browlifting in Geretsried | Perfekte Augen | Zaira Beauty',
  description: 'Für den perfekten Augenaufschlag: Professionelles Lashlifting, Browlifting und Henna Brows bei Zaira Beauty in Geretsried. Langanhaltend und ausdrucksstark.',
  keywords: ['Lashlifting', 'Wimpernlifting', 'Browlifting', 'Augenbrauenlifting', 'Henna Brows', 'wache Augen', 'Zaira Beauty', 'Geretsried'],
  openGraph: {
    title: 'Lashlifting & Browlifting in Geretsried | Zaira Beauty',
    description: 'Verleihen Sie Ihren Wimpern und Brauen den perfekten Schwung und Ausdruck.',
    url: 'https://zairabeauty.de/lashlifting-browlifting',
  },
};

export default function LashBrowPage() {
    return <LashBrowContent />;
} 