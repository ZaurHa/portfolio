import { Metadata } from 'next'
import BBGlowContent from './content'

export const metadata: Metadata = {
  title: 'BB-Glow Behandlung in Geretsried | Makelloser Teint | Zaira Beauty',
  description: 'Erleben Sie die revolutionäre BB-Glow Behandlung bei Zaira Beauty in Geretsried. Für ein ebenmäßiges Hautbild, verfeinerte Poren und einen frischen Glow ohne Make-up.',
  keywords: ['BB-Glow', 'Meso-Needling', 'semi-permanentes Make-up', 'ebenmäßiger Teint', 'Poren verfeinern', 'Zaira Beauty', 'Geretsried'],
  openGraph: {
    title: 'BB-Glow Behandlung in Geretsried | Zaira Beauty',
    description: 'Makelloser Teint und frischer Glow ohne Make-up dank unserer BB-Glow Behandlung.',
    url: 'https://zairabeauty.de/bb-glow',
  },
};

const BBGlowPage = () => {
    return <BBGlowContent />
}

export default BBGlowPage 