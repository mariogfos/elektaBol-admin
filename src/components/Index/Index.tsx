import WidgetPercentage from "../Widgets/WidgetPercentage/WidgetPercentage";
import useAxios from "@/mk/hooks/useAxios";
import WidgetTime from "../Widgets/WidgetTime.tsx/WidgetTime";
import WidgetAffiliatesRank from "../Widgets/WidgetAffiliatesRank/WidgetAffiliatesRank";
import WidgetTable from "../Widgets/WidgetTable.tsx/WidgetTable";
import styles from "./index.module.css";
import WidgetProgresiveBar from "../Widgets/WidgetProgresiveBar/WidgetProgresiveBar";
import { useEffect, useState } from "react";
import { useAuth } from "@/mk/contexts/AuthProvider";
import HistoryTitle from "@/modulos/Statistics/HistoryTitle";
import DashboardMap from "../DashboardMap/DashboardMap";

const HomePage = () => {
  const { user } = useAuth();
  const [itemSelected, setItemSelected]: any = useState({});
  const { setStore } = useAuth();
  const [histParams, setHistParams] = useState<any[]>([]);
  const [histTitulos, setHistTitulos] = useState<string[]>([
    "Mapa de " + (user?.entidad?.name || "Bolivia"),
  ]);
  const paramInitial: any = {
    level: user?.role?.level,
    code: user?.entidad?.code?.toString(),
    searchBy: user?.entidad?.id || "",
  };
  const [params, setParams] = useState(paramInitial);
  const {
    data: dashboard,
    reLoad,
    waiting,
  } = useAxios("/dashboard", "GET", {
    ...params,
  });

  useEffect(() => {
    setStore({
      title: "Panel de control",
    });
  }, []);

  useEffect(() => {
    reLoad(params);
  }, [params]);

  let totalHabilitados = dashboard?.data?.entidad.reduce(
    (acc: number, current: any) => acc + current.habilitados,
    0
  );

  let totalAfiliados = dashboard?.data?.entidad.reduce(
    (acc: number, current: any) => acc + current.affiliate_count,
    0
  );

  const onClick = (row: any) => {
    console.log("row", row);
    if (params?.level === 6) {
      return;
    }

    console.log("params index", params);

    const item: any = dashboard?.data?.entidad.find((d: any) => d.id == row.id);

    setHistParams((prev) => [...prev, params]);
    setHistTitulos((prev) => [...prev, item?.name]);

    setItemSelected(item);
    console.log("itemSelected", itemSelected);
    setParams({
      ...params,
      searchBy: item?.id,
      level: params?.level === 1 ? params?.level + 3 : params?.level + 1,
      code: item?.code.toString(),
    });
  };

  const onBack = (index: number) => {
    // Recorta los parámetros e historial hasta el índice especificado
    const newHistParams = histParams.slice(0, index + 1);
    const newHistTitulos = histTitulos.slice(0, index + 1);

    // Actualiza los estados de historial
    setHistParams(newHistParams);
    setHistTitulos(newHistTitulos);

    if (index === 0) {
      // Si es el nivel inicial, establece los parámetros iniciales
      setParams(paramInitial);
      setHistParams([]);
      setHistTitulos(["Mapa de " + (user?.entidad?.name || "Bolivia")]);
    } else {
      // Obtiene el nivel anterior
      const item = newHistParams[index];

      if (item) {
        setParams({
          ...item,
          // level: item?.level,
          code: item?.code?.toString(), // Asegura que el código sea una cadena
        });
      } else {
        // Si no hay datos en el historial, usa los parámetros iniciales
        setParams(paramInitial);
      }
    }
  };

  return (
    <div className={styles.container}>
      {params?.level == 1 ? (
        <WidgetTime data={dashboard?.data?.countDown} />
      ) : (
        <HistoryTitle
          param={[params, setParams]}
          histTitulos={histTitulos}
          onBack={onBack}
        />
      )}
      <section>
        {params?.level <= 6 && (
          <DashboardMap
            data={dashboard?.data}
            onClick={onClick}
            params={[params, setParams]}
            entidadData={user}
            itemSelected={itemSelected}
            isProvince={true}
          />
        )}

        <div>
          <WidgetProgresiveBar data={{ totalAfiliados, totalHabilitados }} />
          <WidgetPercentage data={dashboard?.data?.encuesta} />
        </div>
      </section>
      <section>
        <div>
          {dashboard?.data?.entidad && (
            <WidgetTable
              data={dashboard?.data.entidad}
              title={`Resumen general a nivel ${
                params?.level === 1
                  ? "Nacional"
                  : params?.level === 4
                  ? "Departamento"
                  : params?.level === 5
                  ? "Provincia"
                  : params?.level === 6
                  ? "Municipio"
                  : "Distrito municipal"
              }`}
              level={params?.level}
              onClickLevel={onClick}
            />
          )}
        </div>
        <div>
          <WidgetAffiliatesRank data={dashboard?.data?.topAfiliados} />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
