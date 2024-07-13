import { IconCheck, IconElectoralParty, IconPercentage, IconVotes, IconWhiteVotes, IconX } from "@/components/layout/icons/IconsBiblioteca"
import { Card } from "@/mk/components/ui/Card/Card"
import styles from "./WidgetResume.module.css"
import { formatNumber } from "@/mk/utils/numbers";
type PropsType = {
    title: string;
    subtitle?: string;
    dataCircunscripciones?:any;
    total_entidad2?:any;
}

const WidgetResumeVotes = ({title,subtitle,dataCircunscripciones,total_entidad2}:PropsType) => {
    console.log('data',dataCircunscripciones,total_entidad2);
    const totalHabilitados = dataCircunscripciones?.reduce((acc: number, curr: any) => acc + Number(curr.habilitados), 0) || 0;
    const totalEmitidos = Number(total_entidad2.nulos) + Number(total_entidad2.blancos) + Number(total_entidad2.validos)

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
            <div>{formatNumber(totalHabilitados,0)}</div>
        </div>
        <div className={styles['cardInfoResumeVotes']}>
            <IconVotes color={'var(--cBlackV2)'}/>
            <div>Votos emitidos</div>
            <div>{formatNumber(totalEmitidos,0 )} </div>
        </div>
        <div className={styles['cardInfoResumeVotes']}>
            <IconPercentage color={'var(--cBlackV2)'}/>
            <div>Participación</div>
            <div>{formatNumber(( totalEmitidos / totalHabilitados ) * 100)}%</div>
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