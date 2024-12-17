import WidgetPercentage from "../Widgets/WidgetPercentage/WidgetPercentage";
import useAxios from "@/mk/hooks/useAxios";
import WidgetTime from "../Widgets/WidgetTime.tsx/WidgetTime";
import WidgetAffiliatesRank from "../Widgets/WidgetAffiliatesRank/WidgetAffiliatesRank";
import WidgetTable from "../Widgets/WidgetTable.tsx/WidgetTable";
import styles from "./index.module.css";
import WidgetProgresiveBar from "../Widgets/WidgetProgresiveBar/WidgetProgresiveBar";
import { useEffect, useState } from "react";
import { useAuth } from "@/mk/contexts/AuthProvider";
import WidgetMapa from "../../modulos/Statistics/WidgetMapa/WidgetMapa";
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

  let totalHabilitados = dashboard?.data?.dptos?.reduce(
    (acc: number, current: any) => acc + current.habilitados,
    0
  );

  let totalAfiliados = dashboard?.data?.dptos?.reduce(
    (acc: number, current: any) => acc + current.affiliate_count,
    0
  );

  console.log("dashboard", dashboard?.data);

  const onClick = (row: any) => {
    if (params?.level === 3) {
      return;
    }

    const item: any = dashboard?.data?.entidad.find((d: any) => d.id == row.id);

    setHistParams((prev) => [...prev, params]);
    setHistTitulos((prev) => [...prev, item?.name]);

    setItemSelected(item);
    setParams({
      ...params,
      searchBy: item?.id,
      level: (params?.level || 0) + 1,
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
        <DashboardMap
          data={dashboard?.data}
          onClick={onClick}
          params={[params, setParams]}
          entidadData={user}
          itemSelected={itemSelected}
        />

        <div>
          <WidgetProgresiveBar data={{ totalAfiliados, totalHabilitados }} />
          <WidgetPercentage data={dashboard?.data?.encuesta} />
        </div>
      </section>
      <section>
        <div>
          {dashboard?.data?.dptos && (
            <WidgetTable data={dashboard?.data.dptos} />
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
