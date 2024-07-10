import { useState } from "react";
import styles from "./Statistics.module.css";
import WidgetTableStats from "@/components/Widgets/WidgetTableStats/WidgetTableStats";
import useAxios from "@/mk/hooks/useAxios";
import { DepartmentsMaps } from "@/components/Maps/Country/DepartmentsMaps";

const paramInitial: any = {
  perPage: 10,
  page: 1,
  fullType: "L",
};
const Statistics = () => {
  const [params, setParams] = useState(paramInitial);
  const [level, setLevel] = useState(0);
  const [selectedDepartment, setSelectedDepartment]: any = useState(null);
  const { data: dashboard } = useAxios("/dashboard", "GET", {
    fullType: "L",
    searchBy: "",
  });

  const statistics = {
    data: [
      {
        id: 1,
        code: "09",
        name: "Pando",
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
        code: "08",
        name: "Beni",
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
        code: "03",
        name: "Cochabamba",
        habitantes: 11673029,
        habilitados: 11673029,
        affiliate_count: 11673029,
      },
      {
        id: 6,
        code: "05",
        name: "Potosi",
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
        code: "06",
        name: "Tarija",
        habitantes: 11673029,
        habilitados: 11673029,
        affiliate_count: 11673029,
      },
      {
        id: 9,
        code: "01",
        name: "Santa Cruz",
        habitantes: 11673029,
        habilitados: 11,
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
  const onClickLevel = (row: any) => {
    setParams({ ...params, searchBy: row.id, level: level + 1 });
    if (level < 3) {
      setLevel(level + 1);
    }
    setSelectedDepartment(row);
  };
  const onClickBack = () => {
    if (level > 0) {
      setLevel(level - 1);
    }
  };

  return (
    <div className={styles["statistics"]}>
      <div>
        <DepartmentsMaps
          level={level}
          setLevel={setLevel}
          params={params}
          setParams={setParams}
          onClickLevel={onClickLevel}
          onClickBack={onClickBack}
          tooltipsData={statistics?.data}
          isClicker={true}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
        />
      </div>
      <div>
        <WidgetTableStats
          data={statistics?.data}
          title={
            level == 0
              ? "Departamentos"
              : level == 1
              ? "Circunscripciones"
              : "Recintos electorales"
          }
          level={level}
          setLevel={setLevel}
          onClickLevel={onClickLevel}
          params={params}
          setParams={setParams}
        />
      </div>
    </div>
  );
};

export default Statistics;
