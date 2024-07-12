import { use, useEffect, useState } from "react";
import styles from "./Statistics.module.css";
import WidgetTableStats from "@/components/Widgets/WidgetTableStats/WidgetTableStats";
import useAxios from "@/mk/hooks/useAxios";
import { DepartmentsMaps } from "@/components/Maps/Country/DepartmentsMaps";
import WidgetResume from "@/components/Widgets/WidgetResume/WidgetResume";
import useCrud from "@/mk/hooks/useCrud/useCrud";
import t from "@/mk/utils/traductor";
import DataModal from "@/mk/components/ui/DataModal/DataModal";
import CircunscripcionesSczMaps from "@/components/Maps/Circunscripcion/CircunscripcionesSczMaps";

const paramInitial: any = {
  searchBy: "",
};
const Statistics = () => {
  const [params, setParams] = useState(paramInitial);
  const [level, setLevel] = useState(0);
  const [selectedDepartment, setSelectedDepartment]: any = useState(null);
  const [selectedCircunscripcion, setSelectedCircunscripcion]: any =
    useState(null);
  const { data: stads, reLoad } = useAxios("/estads", "POST", {
    ...paramInitial,
  });

  const [dataFormatted, setDataFormatted]: any = useState([]);

  console.log("stads", stads?.data);

  useEffect(() => {
    let data: any = [];
    stads?.data.data.map((item: any) => {
      stads?.data.entidad.map((entidad: any) => {
        if (item.id === entidad.dpto_id) {
          data.push({ ...item, circuns_count: entidad.circuns_count });
        }
      });
    });
    setDataFormatted(data);
  }, [stads?.data]);

  useEffect(() => {
    reLoad(params);
  }, [params]);

  const onClickLevel = (row: any) => {
    setParams({ ...params, searchBy: row.id, level: level + 1 });

    if (level === 0) {
      setSelectedDepartment(row);
      setLevel(level + 1);
    }
    if (level === 1) {
      setSelectedCircunscripcion(row);
      setLevel(level + 1);
    }
    if (level < 3) {
      setLevel(level + 1);
    }
  };
  const onClickBack = () => {
    // setParams({ ...params, level: level - 1 });
    if (level > 0) {
      setLevel(level - 1);
    }
    if (level === 1) {
      setParams({
        ...params,
        searchBy: selectedDepartment.id,
        level: level - 1,
      });
      setSelectedDepartment(null);
    }
    if (level === 2) {
      setSelectedCircunscripcion(null);
    }
  };
  console.log(level);
  return (
    <div className={styles["statistics"]}>
      <h1>
        {selectedDepartment ? null : "Datos electorales históricos de Bolivia"}
      </h1>
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
          {/* {level == 0 && ( */}
          <DepartmentsMaps
            level={level}
            setLevel={setLevel}
            params={params}
            setParams={setParams}
            tooltipsData={level == 0 ? dataFormatted : stads?.data.data}
            isClicker={true}
            onClickLevel={onClickLevel}
            onClickBack={onClickBack}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            selectedCircunscripcion={selectedCircunscripcion}
            setSelectedCircunscripcion={setSelectedCircunscripcion}
          />
          {/* )} */}
          {/* {level == 1 && (
            <CircunscripcionesSczMaps tooltipsData={stads?.data.data} />
          )} */}
        </div>
        <div>
          <WidgetResume
            data={dataFormatted}
            dataExtra={stads?.data.total_entidad2}
            level={level}
            setLevel={setLevel}
            params={params}
            setParams={setParams}
          />
        </div>
      </section>
      <section>
        <WidgetTableStats
          data={level == 0 ? dataFormatted : stads?.data.data}
          title={
            level == 0
              ? "Departamentos"
              : level == 1
              ? "Circunscripciones"
              : level == 2
              ? "Recintos electorales"
              : "Mesas electorales"
          }
          level={level}
          setLevel={setLevel}
          onClickLevel={onClickLevel}
          params={params}
          setParams={setParams}
        />
      </section>
    </div>
  );
};

export default Statistics;
