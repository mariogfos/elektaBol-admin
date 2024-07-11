import { Card } from "@/mk/components/ui/Card/Card"
import GraphBase from "@/mk/components/ui/Graphs/GraphBase"
import styles from "./WidgetResume.module.css"
import { Avatar } from "@/mk/components/ui/Avatar/Avatar"
import { IconCamera } from "@/components/layout/icons/IconsBiblioteca"

const WidgetResumeWinnerParty = () => {
  return (
    <Card className={styles['widgetResumeWinner']}>
        <div>Partido ganador</div>
        <div>
            <div>
                
            <Avatar />
            <div>Titulo del partido</div>
            <div>Num de votos</div>
            </div>
            <div>
            <IconCamera/>
            </div>
        </div>


{/* <GraphBase
              data={[]}
              chartTypes={["pie"]}
              options={{
                height: 240,
                colors: ['#F58220','#FFD700', '#00E38C', '#FF5B4D', '#4C98DF','#39ACEC','#F58220','#DA5D5D','#E1C151'],
              }}
            /> */}
    </Card>
  )
}

export default WidgetResumeWinnerParty