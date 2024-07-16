import { formatNumber } from '@/mk/utils/numbers';
import styles from './InfoCard.module.css'

type InfoCardProps = {
  icon?: any;
  title: string;
  value: string | number;
  ext?:string
}
const InfoCard = ({icon,title,value,ext=''}:InfoCardProps) => {
  return (
    <div className={styles['cardInfoResumeVotes']}>
    {icon}
    <div>{title}</div>
    <div>{formatNumber(value,0)} {' ' + ext}</div>
</div>
  )
}

export default InfoCard