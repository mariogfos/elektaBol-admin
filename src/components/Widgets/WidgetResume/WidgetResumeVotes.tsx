import { IconCheck, IconElectoralParty, IconPercentage, IconVotes, IconWhiteVotes, IconX } from "@/components/layout/icons/IconsBiblioteca"
import { Card } from "@/mk/components/ui/Card/Card"
import styles from "./WidgetResume.module.css"
import { formatNumber } from "@/mk/utils/numbers";
type PropsType = {
    title: string;
    subtitle?: string;
    total_entidad?:any;
    total_entidad2?:any;
}

const WidgetResumeVotes = ({title,subtitle,total_entidad,total_entidad2}:PropsType) => {
    console.log('data',total_entidad,total_entidad2);
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
            <div>{formatNumber((Number(total_entidad2.nulos) + Number(total_entidad2.blancos) + Number(total_entidad2.validos)),0 )} </div>
        </div>
        <div className={styles['cardInfoResumeVotes']}>
            <IconPercentage color={'var(--cBlackV2)'}/>
            <div>Participación</div>
            <div>3333 %</div>
        </div>
        <div className={styles['cardInfoResumeVotes']}>
            <IconCheck color={'var(--cBlackV2)'}/>
            <div>Votos válidos</div>
            <div>{formatNumber(total_entidad2.validos,0)}</div>
        </div>
        
        <div className={styles['cardInfoResumeVotes']}>
            <IconX color={'var(--cBlackV2)'}/>
            <div>Votos nulos</div>
            <div>{formatNumber(total_entidad2.nulos,0)}</div>
        </div>
       <div className={styles['cardInfoResumeVotes']}>
            <IconWhiteVotes color={'var(--cBlackV2)'}/>
            <div>Votos blancos</div>
            <div>{formatNumber(total_entidad2.blancos,0)}</div>
        </div>
   
     </div> 
    </Card>
  )
}

export default WidgetResumeVotes