import React, { useEffect, useState } from "react";
import styles from "./WidgetResume.module.css";
import WidgetResumeVotes from "./WidgetResumeVotes";
import WidgetResumeWinnerParty from "./WidgetResumeWinnerParty";
import DataModal from "@/mk/components/ui/DataModal/DataModal";

const WidgetResumen = ({ data, params ,openModal}: any) => {
  const [paramsValue, setParams] = params;
 
  const { level } = paramsValue;
  
   const calculateTotalHabilitados = () => {
    let totalHab = 0;
    data?.data?.tabla?.map((item: any) => {
      totalHab += item.habilitados;
    });
    return totalHab;
   };
  console.log('totalHab',calculateTotalHabilitados());

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
        {level === 0 && data?.data?.tabla?.name}
      </div>
      <div className={styles["container-card"]}>
        <div className={styles["cardInfo"]}>
          <h2>{labels[level]}</h2>
          { data?.data?.tabla && <p>{ data?.data?.tabla?.length}</p>}
        </div>
        <div className={styles["cardInfo"]}>
          <h2>{labels[level + 1]}</h2>
         { data?.data?.tabla && <p>{calculateTotalHabilitados()}</p>} 
        </div>
        <div className={styles["cardInfo"]}>
          <h2>{labels[level + 2]}</h2>
          {/* {typeof data?.data?.extras == "number" && <p>{data?.data?.extras}</p>} */}
        </div>
      </div>
    </section>
  </div>}
   { level >= 2 && <div className={styles["topWidgets"]}>
    
   
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
             onClick={openModal}
             total={calculateTotalHabilitados()}
           />
   
   </div>} 


    
    </div>;
};

export default WidgetResumen;
