import React from "react";
import styles from "./WidgetResume.module.css";
import WidgetResumeVotes from "./WidgetResumeVotes";

const WidgetResumen = ({ data, params }: any) => {
  const [paramsValue, setParams] = params;
  const { level } = paramsValue;
  const { data: dataInner } = data || {};
  const { table: tableData, name: tableName } = dataInner || {};
  
  console.log('tabledata',tableData);
  let totalCircunscripciones = tableData?.reduce((acc: any, item: any) => {
    return acc + item.total;
  }, 0);
  const labels: any = [
    "Departamento", // 0
    "Circunscripción", // 1
    "Recinto", // 2
    "Mesa", // 3
  ];
  return <div>


  {level < 2 && <div className={styles.container}>
    <section>
      <div>
        {level === 0 && "Resumen general a nivel nacional"}
        {level === 1 && "Resumen general a nivel departamental"}
      </div>
      <div>
        {level === 0 && "Bolivia"}
        {level === 0 && tableName}
      </div>
      <div className={styles["container-card"]}>
        <div className={styles["cardInfo"]}>
          <h2>{labels[level]}</h2>
          { tableData && <p>{ tableData?.length}</p>}
        </div>
        <div className={styles["cardInfo"]}>
          <h2>{labels[level + 1]}</h2>
          { tableData && <p>{totalCircunscripciones}</p>}
        </div>
        <div className={styles["cardInfo"]}>
          <h2>{labels[level + 2]}</h2>

        </div>
      </div>
    </section>
  </div>}
   {/* {level >= 2 && <WidgetResumeVotes 
    title={"Datos de las elecciones del 2020"}
   // subtitle={selectedCircunscripcion?.titulo}
    dataCircunscripciones={data?.table}
    total_entidad2={data?.total_entidad2}
   />} */}


    
    </div>;
};

export default WidgetResumen;
