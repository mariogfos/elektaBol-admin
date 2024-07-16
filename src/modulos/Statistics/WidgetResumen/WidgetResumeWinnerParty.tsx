import { Card } from "@/mk/components/ui/Card/Card";
import GraphBase from "@/mk/components/ui/Graphs/GraphBase";
import styles from "./WidgetResume.module.css";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import { IconCamera } from "@/components/layout/icons/IconsBiblioteca";
import ProgresiveBar from "@/mk/components/ui/ProgresiveBar/ProgresiveBar";
import DonutChart from "@/mk/components/DonutChart/DonutChart";

const WidgetResumeWinnerParty = ({ data, title, subtitle, style ,total}: any) => {
 console.log(data,'data desde w')
 const calculatePercentage:any = (totalVotes:  number, votes: number) => {
  if (!totalVotes) return 0;
  return ((votes / totalVotes) * 100).toFixed(2);
};



  return (
    <Card className={styles["widgetResumeWinner"]}>
      <div>
        <h1>{title}</h1>
        <div>{subtitle}</div>
      </div>
      <div style={style}>
        {data?.map((item: any, i: number) => (
          <div style={{ width: "100%" }} key={i}>
            <div style={data?.length > 1 ? { width: 247 } : { width: "100%" }}>
              <div>
                <Avatar src={''}
                 name={item.name} />
                <div>{item.title}</div>
                <div>{item.total_votos} votos obtenidos</div>
              </div>
              <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                 <DonutChart percentage={parseFloat(calculatePercentage(3000, Number(item.total_votos)))}  color={item.color} size={100} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default WidgetResumeWinnerParty;
