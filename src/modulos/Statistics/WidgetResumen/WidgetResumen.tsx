import { useEffect, useState } from "react";
import styles from "./WidgetResume.module.css";
import WidgetResumeVotes from "./WidgetResumeVotes";
import WidgetResumeWinnerParty from "./WidgetResumeWinnerParty";

const WidgetResumen = ({ data, params, dataExtra }: any) => {
  const [paramsValue, setParams] = params;
  const { level } = paramsValue;

  const calculateTotalHabilitados = () => {
    let total = 0;
    data.forEach((item: any) => {
      total += item?.total;
    });

    return total;
  };

  const labels: any = [
    "Departamento", // 0
    "Circunscripción", // 1
    "Recinto", // 2
    "Mesa", // 3
  ];
  return (
    <div>
      {level < 2 && (
        <div className={styles.container}>
          <section>
            <div>
              {level === 0 && "Resumen general a nivel nacional"}
              {level === 1 && "Resumen general a nivel departamental"}
            </div>
            <div>
              {level === 0 && "Bolivia"}
              {level === 0 && data?.data?.tabla?.name}
            </div>
            <div className={styles["container-card"]}>
              <div className={styles["cardInfo"]}>
                <h2>{labels[level]}</h2>
                {data && <p>{data?.length}</p>}
              </div>
              <div className={styles["cardInfo"]}>
                <h2>{labels[level + 1]}</h2>
                {data && <p>{calculateTotalHabilitados()}</p>}
              </div>
              <div className={styles["cardInfo"]}>
                <h2>{labels[level + 2]}</h2>
                {typeof dataExtra == "number" && <p>{dataExtra}</p>}
              </div>
            </div>
          </section>
        </div>
      )}
      {level >= 2 && (
        <div className={styles["topWidgets"]}>
          <WidgetResumeVotes
            title={"Datos de las elecciones del 2020"}
            // subtitle={selectedCircunscripcion?.titulo}
            data={data?.tabla}
            extras={data?.extras}
            total={calculateTotalHabilitados()}
          />
          <WidgetResumeWinnerParty
            data={[data?.extras?.winner]}
            title={"Partido ganador"}
            //subtitle={level === 2 ? selectedCircunscripcion?.titulo : ""}
            total={calculateTotalHabilitados()}
          />
        </div>
      )}
    </div>
  );
};

export default WidgetResumen;
