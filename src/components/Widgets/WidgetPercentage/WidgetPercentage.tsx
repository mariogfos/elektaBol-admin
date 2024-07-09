import { useEffect, useState } from "react";
import { Card } from "@/mk/components/ui/Card/Card";
import styles from "./WidgetPercentage.module.css";
import { getDateStrMes, getUTCNow } from "@/mk/utils/date";
import Table from "@/mk/components/ui/Table/Table";
import GraphBase from "@/mk/components/ui/Graphs/GraphBase";

interface WidgetPercentageProps {
  data: any;
  // user:any,
  title?: string;
  subtitle?: string;
}

const WidgetPercentage = ({ data }: WidgetPercentageProps) => {
  // console.log(data,'data desde wid%')
  const [dataFormatted, setDataFormatted] = useState([]);
  const [graphData, setGraphData] = useState({ labels: [], values: [] });

  useEffect(() => {
    if (data?.answers) {
      const { answers } = data;
      const labels: any = [];
      const values: any = [];
      const formattedData: any = [];

      let totalResponses = 0;
      answers.forEach((answer: any) => {
        totalResponses += answer.sanswers_count;
      });

      answers.forEach((answer: any) => {
        const percentage = (answer.sanswers_count / totalResponses) * 100;
        const formattedPercentage = Number.isNaN(percentage)
          ? "0 %"
          : `${percentage.toFixed(2)} %`;
        labels.push(answer.name);
        values.push({
          name: answer.name,
          values: [percentage],
        });
        formattedData.push({
          ...answer,
          percentage: formattedPercentage,
        });
      });

      const newGraphData = {
        labels: labels,
        values: values,
      };

      setDataFormatted(formattedData);
      setGraphData(newGraphData);
    }
  }, [data]);

  const calcPercentage = (total: any, valor: any) => {
    if (total === 0) {
      return 0;
    }
    return (valor / total) * 100;
  };

  return (
    <div className={styles["widgetPercentage"]}>
        {data?.answers && data.answers.length > 0 ? (
      <div>
        <div className="tTitle" style={{marginBottom:16}}>{data?.data?.name}</div>
        <div className={styles["widgetPercentageContent"]}>
          
          <div style={{justifyContent:data?.answers?.length >=5 ?'':'center'}} className={styles["cardsInfoContainer"]}>
            {data?.answers?.sort((a:any, b:any) => b.sanswers_count - a.sanswers_count) .map((item: any, index: any) => (
              <div className={styles["cardInfo"]} key={index}>             
                <div>{item.name}</div>
                <div>{item.sanswers_count}</div>
              </div>
            ))}
       
          </div>
          <div className={styles["percentagePie"]}>
            <GraphBase
              data={graphData}
              chartTypes={["pie"]}
              options={{
                height: 240,
                colors: ['#F58220','#FFD700', '#00E38C', '#FF5B4D', '#4C98DF','#39ACEC','#F58220','#DA5D5D','#E1C151'],
              }}
            />
          </div>
        </div>
      </div>):<div style={{padding:16,textAlign:"center"}} className="tSubtitle">No hay datos para mostrar</div>}
    </div>
  );
};

export default WidgetPercentage;
