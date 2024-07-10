import { useState } from "react";
import styles from "./Statistics.module.css";
import WidgetTableStats from "@/components/Widgets/WidgetTableStats/WidgetTableStats";
import useAxios from "@/mk/hooks/useAxios";
import { DepartmentsMaps } from "@/components/Maps/Country/DepartmentsMaps";
import WidgetResume from "@/components/Widgets/WidgetResume/WidgetResume";

const paramInitial: any = {
  perPage: 10,
  page: 1,
  fullType: "L",
};
const Statistics = () => {
  const [params, setParams] = useState(paramInitial);
  const [level, setLevel] = useState(0);
  const { data: dashboard } = useAxios("/dashboard", "GET", {
    fullType: "L",
    searchBy: "",
  });
  const reload: any = null;
  const statistics = {
    data: [
      {
        id: 1,
        code: "01",
        name: "Santa Cruz",
        habitantes: 11673029,
        habilitados: 11673029,
        affiliate_count: 11673029,
      },
      {
        id: 2,
        code: "02",
        name: "La Paz",
        habitantes: 11673029,
        habilitados: 11673029,
        affiliate_count: 11673029,
      },
      {
        id: 3,
        code: "03",
        name: "Cochabamba",
        habitantes: 11673029,
        habilitados: 11673029,
        affiliate_count: 11673029,
      },
      {
        id: 4,
        code: "04",
        name: "Oruro",
        habitantes: 11673029,
        habilitados: 11673029,
        affiliate_count: 11673029,
      },
      {
        id: 5,
        code: "05",
        name: "Potosi",
        habitantes: 11673029,
        habilitados: 11673029,
        affiliate_count: 11673029,
      },
      {
        id: 6,
        code: "06",
        name: "Tarija",
        habitantes: 11673029,
        habilitados: 11673029,
        affiliate_count: 11673029,
      },
      {
        id: 7,
        code: "07",
        name: "Chuquisaca",
        habitantes: 11673029,
        habilitados: 11673029,
        affiliate_count: 11673029,
      },
      {
        id: 8,
        code: "08",
        name: "Beni",
        habitantes: 11673029,
        habilitados: 11673029,
        affiliate_count: 11673029,
      },
      {
        id: 9,
        code: "09",
        name: "Pando",
        habitantes: 11673029,
        habilitados: 11673029,
        affiliate_count: 11673029,
      },
    ],
  };
  let dataDpto = dashboard?.data?.dptos.map((dpto: any) => {
    return {
      id: dpto?.id,
      titulo: dpto?.name,
      habitantes: dpto?.habitantes,
      habilitados: dpto?.habilitados,
      afiliados: dpto?.affiliate_count,
    };
  });
  // const accessInfo = () =>{

  //   if(level < 3){setLevel(level+1)}
  //   return
  // }

  return (
    <div className={styles["statistics"]}>
      <h1>Datos electorales históricos de Bolivia</h1>
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "64px",
          marginTop: "32px",
          marginBottom: "32px",
        }}
      >
        <div>
          <DepartmentsMaps
            level={level}
            setLevel={setLevel}
            params={params}
            setParams={setParams}
            tooltipsData={dataDpto}
            isClicker={true}
          />
        </div>
        <div>
          <WidgetResume
            data={statistics?.data}
            level={level}
            setLevel={setLevel}
            params={params}
            setParams={setParams}
          />
        </div>
      </section>
      <section>
        <WidgetTableStats
          data={statistics?.data}
          level={level}
          setLevel={setLevel}
          params={params}
          setParams={setParams}
        />
      </section>
    </div>
  );
};

export default Statistics;
