import { IconCheck, IconElectoralParty, IconPercentage, IconVotes, IconWhiteVotes, IconX } from "@/components/layout/icons/IconsBiblioteca"
import { Card } from "@/mk/components/ui/Card/Card"
import styles from "./WidgetResume.module.css"
type PropsType = {
    title: string;
    subtitle?: string;
    
}

const WidgetResumeVotes = ({title,subtitle}:PropsType) => {
  return (
    <Card className={styles['widgetResumeVotes']}>
        <div>
        <div>{title}</div>
        <div>{subtitle}</div>
        </div>
    <div>  
        <div className={styles['cardInfoResumeVotes']}>
            <IconElectoralParty color={'var(--cBlackV2)'}/>
            <div>Padrón electoral</div>
            <div>3000</div>
        </div>
        <div className={styles['cardInfoResumeVotes']}>
            <IconVotes color={'var(--cBlackV2)'}/>
            <div>Votos emitidos</div>
            <div>200</div>
        </div>
        <div className={styles['cardInfoResumeVotes']}>
            <IconPercentage color={'var(--cBlackV2)'}/>
            <div>Participación</div>
            <div>3333 %</div>
        </div>
        <div className={styles['cardInfoResumeVotes']}>
            <IconCheck color={'var(--cBlackV2)'}/>
            <div>Votos válidos</div>
            <div>76467</div>
        </div>
        
        <div className={styles['cardInfoResumeVotes']}>
            <IconX color={'var(--cBlackV2)'}/>
            <div>Votos nulos</div>
            <div>10000000</div>
        </div>
       <div className={styles['cardInfoResumeVotes']}>
            <IconWhiteVotes color={'var(--cBlackV2)'}/>
            <div>Votos blancos</div>
            <div>20000</div>
        </div>
   
     </div> 
    </Card>
  )
}

export default WidgetResumeVotes