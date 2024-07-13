import { useEffect, useState } from "react";
import styles from "./Statistics.module.css";
import WidgetTableStats from "@/components/Widgets/WidgetTableStats/WidgetTableStats";
import useAxios from "@/mk/hooks/useAxios";
import { DepartmentsMaps } from "@/components/Maps/Country/DepartmentsMaps";
import WidgetResume from "@/components/Widgets/WidgetResume/WidgetResume";
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
    ...params,
  });

  const [dataFormatted, setDataFormatted]: any = useState([]);

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
  // console.log(params);

  const onClickLevel = (row: any) => {
    console.log("ROWWW", row);
    setParams((prevParams: any) => ({
      ...prevParams,
      searchBy: row.id,
      level: level + 1,
    }));

    if (level == 0) {
      setSelectedDepartment(row);
    }
    if (level == 1) {
      setSelectedCircunscripcion(row);
    }

    if (level < 3) {
      setLevel(level + 1);
    }
  };

  const onClickBack = () => {
    switch (level) {
      case 1:
        setSelectedDepartment(null);
        setParams({
          searchBy: "",
          level: level - 1,
        });
        break;
      case 2:
        setSelectedCircunscripcion(null);
        setParams({
          searchBy: selectedDepartment.id,
          level: level - 1,
        });
        break;
      default:
        setParams((prevParams: any) => ({
          ...prevParams,
          searchBy: "",
          level: level - 1,
        }));

        break;
    }

    if (level > 0) {
      setLevel(level - 1);
    }
  };
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
            tooltipsData={dataFormatted}
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
            <WidgetResumeVotes  title={'Datos de las elecciones del 2020'} subtitle={ selectedCircunscripcion?.titulo } dataCircunscripciones = {stads?.data?.data} total_entidad2={ stads?.data?.total_entidad2} />
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
