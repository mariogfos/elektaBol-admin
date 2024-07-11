import { IconCheck, IconElectoralParty, IconPercentage, IconVotes, IconWhiteVotes, IconX } from "@/components/layout/icons/IconsBiblioteca"
import { Card } from "@/mk/components/ui/Card/Card"
import styles from "./WidgetResume.module.css"


const WidgetResumeVotes = () => {
  return (
    <Card className={styles['widgetResumeVotes']}>
        <div>Resumen de votos</div>
    <div>  
        <div className={styles['cardInfoResumeVotes']}>
            <IconElectoralParty color={'var(--cBlackV2)'}/>
            <div>Padrón electoral</div>
            <div>3000</div>
        </div>
        <div className={styles['cardInfoResumeVotes']}>
            <IconVotes color={'var(--cBlackV2)'}/>
            <div>Votos emitidos</div>
            <div>sasassas</div>
        </div>
        <div className={styles['cardInfoResumeVotes']}>
            <IconCheck color={'var(--cBlackV2)'}/>
            <div>Votos válidos</div>
            <div>sasassas</div>
        </div>
        <div className={styles['cardInfoResumeVotes']}>
            <IconX color={'var(--cBlackV2)'}/>
            <div>Votos nulos</div>
            <div>sasassas</div>
        </div>
       <div className={styles['cardInfoResumeVotes']}>
            <IconWhiteVotes color={'var(--cBlackV2)'}/>
            <div>Votos blancos</div>
            <div>sasassas</div>
        </div>
        <div className={styles['cardInfoResumeVotes']}>
            <IconPercentage color={'var(--cBlackV2)'}/>
            <div>Participación</div>
            <div>sasassas</div>
        </div>
     </div> 
    </Card>
  )
}

export default WidgetResumeVotes