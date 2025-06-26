import { Metadata } from 'next'
import DehnungsstreifenContent from './content'

export const metadata: Metadata = {
  title: 'Dehnungsstreifen entfernen in Geretsried | Zaira Beauty',
  description: 'Reduzieren Sie sichtbar Dehnungsstreifen mit RF Microneedling bei Zaira Beauty in Geretsried. Verbessern Sie Ihre Hautelastizität und -festigkeit.',
  keywords: ['Dehnungsstreifen entfernen', 'Schwangerschaftsstreifen', 'RF Microneedling', 'Hautstraffung', 'Kollagenproduktion', 'Zaira Beauty', 'Geretsried'],
  openGraph: {
    title: 'Behandlung von Dehnungsstreifen in Geretsried | Zaira Beauty',
    description: 'Effektive Reduzierung von Dehnungsstreifen für eine glattere Haut mit RF Microneedling.',
    url: 'https://zairabeauty.de/dehnungsstreifen',
  },
};

const DehnungsstreifenPage = () => {
    return <DehnungsstreifenContent />
}

export default DehnungsstreifenPage 