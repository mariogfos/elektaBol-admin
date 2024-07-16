import { useEffect, useState } from "react";
import styles from "./Statistics.module.css";
import WidgetTableStats from "@/components/Widgets/WidgetTableStats/WidgetTableStats";
import useAxios from "@/mk/hooks/useAxios";
import { DepartmentsMaps } from "@/components/Maps/Country/DepartmentsMaps";
import WidgetResumeVotes from "@/modulos/Statistics/WidgetResumen/WidgetResumeVotes";
import WidgetResumeWinnerParty from "@/modulos/Statistics/WidgetResumen/WidgetResumeWinnerParty";
import { useAuth } from "@/mk/contexts/AuthProvider";
import WidgetTitulo from "./WidgetTitulo";
import WidgetMapa from "./WidgetMapa";
import WidgetTabla from "./WidgetTabla";
import WidgetResumen from "./WidgetResumen/WidgetResumen";

const paramInitial: any = {
  searchBy: "",
  level:0
};
const Statistics = () => {
  const { setStore } = useAuth();
  const [params, setParams] = useState(paramInitial);
  const [level, setLevel] = useState(0);

  // const { data: stads, reLoad } = useAxios("/estads", "POST", {
  //   ...params,
  // });

  const stads = {
    data: {
      tabla: [
        {
          id: 2,
          name: "La Paz",
          total: 100,
          habitantes: 100,
          habilitados: 80,
          code: 2,
        },
        {
          id: 3,
          name: "Cochabamba",
          total: 100,
          habitantes: 100,
          habilitados: 80,
          code: 3,
        },
        {
          id: 7,
          name: "Santa Cruz",
          total: 100,
          habitantes: 100,
          habilitados: 80,
          code: 7,
        },
      ],
    },
    extras: {
      validos:100,
      nulos:50,
      blancos:20,
      winner:{
        id:1,
        name:'Eugenio',
        color:'red', 
        total_votos:2000
      }
    }
   
  };
  

  useEffect(() => {
    setStore({
      title: "Estadísticas electorales",
    });
  }, []);

  // useEffect(() => {
  //   let data: any = [];
  //   stads?.data.data.map((item: any) => {
  //     stads?.data.entidad.map((entidad: any) => {
  //       if (item.id === entidad.id) {
  //         data.push({ ...item, total: entidad.total });
  //       }
  //     });
  //   });
  //   setDataFormatted(data);
  // }, [stads?.data]);

  const histParam = useState([]);
  const histTitulo: any = useState(["Mapa de Bolivia"]);
  const onClick = (id: any) => {
    const item: any = stads.data.tabla.find((d: any) => d.code == id);
    const t = histTitulo[0];
    t.push(item?.name);
    histTitulo[1](t);
    const h: any = histParam[0];
    h.push(params);
    histParam[1](h);
    setParams({
      ...params,
      searchBy: item.id,
      level: (params?.level || 0) + 1,
    });
  };
  const onBack = (index: number) => {
    let h: any = histParam[0];
    let t: any = histTitulo[0];
    const param = h[index];
    h = h.slice(0, index + 1);
    t = t.slice(0, index + 1);
    if (index === 0) {
      h = [];
      t = ["Mapa de Bolivia"];
    }
    histParam[1](h);
    histTitulo[1](t);
    setParams(param);
  };
  return (
    <div className={styles["statistics"]}>
      <div>
        <WidgetTitulo
          histParams={histParam}
          params={[params, setParams]}
          histTitulos={histTitulo}
          onBack={onBack}
        />
      </div>
      <div style={{ display: "flex", gap: "var(--spM)" }}>
        <div>
          <WidgetMapa
            params={[params, setParams]}
            onClick={onClick}
            data={stads?.data.tabla}
          />
        </div>
        <div>
          <WidgetResumen params={[params, setParams]} data={stads} />
        </div>
      </div>
      <div>
        {/* <WidgetTabla
          params={[params, setParams]}
          onClick={onClick}
          data={stads?.data.tabla}
        /> */}
        <WidgetTableStats
          data={stads?.data.tabla}
          onClick={onClick}
          params={[params, setParams]}
        />
      </div>
    </div>

    // <div className={styles["statistics"]}>
    //   <h1>
    //     {selectedDepartment ? null : "Datos electorales históricos de Bolivia"}
    //   </h1>
    //   <section
    //     className={styles["topSection"]}
    //     // style={{
    //     //   display: "flex",
    //     //   justifyContent: "center",
    //     //   alignItems: "center",
    //     //   gap: "64px",
    //     //   marginTop: "32px",
    //     //   marginBottom: "32px",
    //     // }}
    //   >
    //     <div>
    //       {/* {level == 0 && ( */}
    //       <DepartmentsMaps
    //         level={level}
    //         setLevel={setLevel}
    //         params={params}
    //         setParams={setParams}
    //         tooltipsData={dataFormatted}
    //         isClicker={true}
    //         onClickLevel={onClickLevel}
    //         onClickBack={onClickBack}
    //         selectedDepartment={selectedDepartment}
    //         setSelectedDepartment={setSelectedDepartment}
    //         selectedCircunscripcion={selectedCircunscripcion}
    //         setSelectedCircunscripcion={setSelectedCircunscripcion}
    //       />
    //       {/* )} */}
    //       {/* {level == 1 && (
    //         <CircunscripcionesSczMaps tooltipsData={stads?.data.data} />
    //       )} */}
    //     </div>

    //     {level < 2 && (
    //       <div>
    //         <WidgetResume
    //           data={dataFormatted}
    //           dataExtra={level <= 1 ? stads?.data?.total_entidad2 : null}
    //           level={level}
    //           setLevel={setLevel}
    //           params={params}
    //           setParams={setParams}
    //         />
    //       </div>
    //     )}

    //     {level >= 2 && (
    //       <div className={styles["topWidgets"]}>
    //         <WidgetResumeVotes
    //           title={"Datos de las elecciones del 2020"}
    //           subtitle={selectedCircunscripcion?.titulo}
    //           dataCircunscripciones={stads?.data?.data}
    //           total_entidad2={stads?.data?.total_entidad2}
    //         />
    //         <WidgetResumeWinnerParty
    //           data={[
    //             { name: "eliot", title: "Creemos", votes: 98, color: "red" },
    //           ]}
    //           title={"Partido ganador"}
    //           subtitle={level === 2 ? selectedCircunscripcion?.titulo : ""}
    //         />
    //       </div>
    //     )}
    //   </section>
    //   <section>
    //     {level === 3 && (
    //       <div style={{ width: "100%", display: "flex" }}>
    //         <WidgetResumeWinnerParty
    //           data={[
    //             {
    //               name: "eliot",
    //               title: "Comunidad Ciudadana",
    //               votes: 32,
    //               color: "green",
    //             },
    //             {
    //               name: "eliot",
    //               title: "MAS - IPSP",
    //               votes: 52,
    //               color: "blue",
    //             },
    //             {
    //               name: "eliot",
    //               title: "PAN - BOL",
    //               votes: 56,
    //               color: "white",
    //             },
    //             { name: "eliot", title: "Juntos", votes: 29, color: "yellow" },
    //           ]}
    //           title={"Otros resultados"}
    //         />
    //       </div>
    //     )}
    //   </section>
    // </div>
  );
};

export default Statistics;
