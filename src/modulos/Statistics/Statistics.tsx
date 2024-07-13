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
import WidgetResumeVotes from "@/components/Widgets/WidgetResume/WidgetResumeVotes";
import WidgetResumeWinnerParty from "@/components/Widgets/WidgetResume/WidgetResumeWinnerParty";

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

  console.log("stads", stads?.data,'selecCric',selectedCircunscripcion);

  useEffect(() => {
    let data: any = [];
    stads?.data.data.map((item: any) => {
      stads?.data.entidad.map((entidad: any) => {
        if (item.id === entidad.id) {
          data.push({ ...item, total: entidad.total });
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
      className={styles['topSection']} 
        // style={{
        //   display: "flex",
        //   justifyContent: "center",
        //   alignItems: "center",
        //   gap: "64px",
        //   marginTop: "32px",
        //   marginBottom: "32px",
        // }}
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


        {level < 2 && <div>
          <WidgetResume
            data={dataFormatted}
            dataExtra={stads?.data.total_entidad2}
            level={level}
            setLevel={setLevel}
            params={params}
            setParams={setParams}
          />


        </div>}

        {level >= 2 && (
          <div className={styles['topWidgets']}>
            <WidgetResumeVotes  title={'Datos de las elecciones del 2020'} subtitle={ selectedCircunscripcion?.titulo } total_entidad = {stads?.data?.total_entidad} total_entidad2={ stads?.data?.total_entidad2} />
            <WidgetResumeWinnerParty data={[{name:'eliot',title:'Creemos',votes:98,color:'red'}]} title={'Partido ganador'}  subtitle={level === 2?selectedCircunscripcion?.titulo:'' }/>
          </div>
        )
        }
      </section>
      <section>
 {  level < 3 &&    <WidgetTableStats
          data={dataFormatted}
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
        /> }
        {level === 3 && <div style={{ width: "100%", display: "flex" }}> 
        <WidgetResumeWinnerParty data={[{name:'eliot',title:'Comunidad Ciudadana',votes:32,color:'green'},{name:'eliot',title:'MAS - IPSP',votes:52,color:'blue'},{name:'eliot',title:'PAN - BOL',votes:56,color:'white'},{name:'eliot',title:'Juntos',votes:29,color:'yellow'}]} title={'Otros resultados'}/>
       </div>}
      
      </section>
    </div>
  );
};

export default Statistics;
