import { useEffect, useState } from "react";
import { Card } from "@/mk/components/ui/Card/Card";
import styles from "./viewSurveys.module.css";
import { getDateStrMes, getUTCNow } from "@/mk/utils/date";
import Table from "@/mk/components/ui/Table/Table";
import GraphBase from "@/mk/components/ui/Graphs/GraphBase";

const ViewSurveys = ({ data, user }: any) => {
  // console.log(JSON.stringify(data,null,4),'dataaa')
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
          : `${Math.round(percentage)} %`;
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

  function calcPercentage(total: any, valor: any) {
    if (total === 0) {
      return 0;
    }
    return (valor / total) * 100;
  }

  const [levelOfLocate, setLevelOfLocate] = useState(
    user?.role?.level <= 2
      ? "General"
      : user?.role?.level <= 3
      ? "Departamental"
      : "Localidad"
  );

  return (
    <div>
      <div className={styles.headerViewSurveys}>
        <div>
          <div className="tSubtitle">
            Publicada el {getDateStrMes(data?.data?.created_at)}
          </div>
          <div className="tTitle">{data?.data?.name}</div>
        </div>
      </div>
      <Card>
        <div>Nivel {levelOfLocate}</div>
        <div className="tSubtitle">
          Resumen hasta {getDateStrMes(getUTCNow())}
        </div>
        <div className={styles["cardsInfoContainer"]}>
          <div className={styles["cardInfo"]}>
            <div>Alcance estimado</div>
            <div>{data.alcanceEst}</div>
          </div>
          <div className={styles["cardInfo"]}>
            <div>Alcance real</div>
            <div>{data.alcanceReal}</div>
          </div>
          <div className={styles["cardInfo"]}>
            <div>Participación</div>
            <div>{Math.round(calcPercentage(data.alcanceEst, data.alcanceReal))} %</div>
          </div>
        </div>
        <Table
          data={dataFormatted}
          className={"V1"}
          header={[
            {
              key: "name",
              responsive: "",
              label: "Respuesta",
              width: "100%",
            },
            {
              key: "sanswers_count",
              responsive: "",
              label: "Total de Votos",
            },
            {
              key: "percentage",
              responsive: "",
              label: "Porcentaje",
            },
          ]}
        />
      </Card>
      <Card>
        <div className="tTitle">Estadísticas</div>
        <GraphBase
          data={graphData}
          chartTypes={["pie"]}
          options={{
            height: 256,
            colors: ["#FFD700", "#00E38C", "#FF5B4D", "#4C98DF"],
          }}
        />
      </Card>
    </div>
  );
};

export default ViewSurveys;
