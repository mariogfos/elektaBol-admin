import { Card } from "@/mk/components/ui/Card/Card"
import GraphBase from "@/mk/components/ui/Graphs/GraphBase"
import styles from "./WidgetResume.module.css"
import { Avatar } from "@/mk/components/ui/Avatar/Avatar"
import { IconCamera } from "@/components/layout/icons/IconsBiblioteca"
import ProgresiveBar from "@/mk/components/ui/ProgresiveBar/ProgresiveBar"

const WidgetResumeWinnerParty = ({ data, title }: any) => {
  const deta = {
    values: [
      { name: "Category 1", value: 1, values: [1, 50] },


    ],
  };


  return (
    <Card className={styles['widgetResumeWinner']} >
      <h1>{title}</h1>
      <div>
        {data?.map((item: any, i: number) =>
          <div style={{ width: '100%' }} key={i} >

            <div style={data?.length > 1 ? { width: 247 } : { width: '100%' }}>
              <div>
                <Avatar name={item.name} />
                <div>{item.title}</div>
                <div>{item.votes} votos obtenidos</div>
              </div>
              <div style={{ width: "100%" }}>
                <ProgresiveBar
                  color={item.color}
                  total={100}
                  actualValue={item.votes}
                  titleActualValue={`${item.votes} Votos`}
                />
              </div>
            </div>
          </div>)}
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