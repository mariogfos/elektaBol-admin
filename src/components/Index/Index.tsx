import { useEffect, useState } from "react";
import useAxios from "@/mk/hooks/useAxios";
import { useAuth } from "@/mk/contexts/AuthProvider";
import NotAccess from "../auth/NotAccess/NotAccess";
import WidgetTime from "../Widgets/WidgetTime.tsx/WidgetTime";
import WidgetTable from "../Widgets/WidgetTable.tsx/WidgetTable";
import WidgetProgresiveBar from "../Widgets/WidgetProgresiveBar/WidgetProgresiveBar";
import DashboardMap from "../ Widgets/DashboardMap/DashboardMap";
import styles from "./index.module.css";
import HistoryTitle from "@/modulos/Statistics/HistoryTitle";
import { WidgetSkeleton } from "@/mk/components/ui/Skeleton/Skeleton";
import WidgetCandidates from "../ Widgets/WidgetCandidates/WidgetCandidates";

const HomePage = () => {
  const { setStore, userCan } = useAuth();
  const { user } = useAuth();
  const [itemSelected, setItemSelected]: any = useState({});
  const [histParams, setHistParams] = useState<any[]>([]);
  const [histTitulos, setHistTitulos] = useState<string[]>([
    "Mapa de " + (user?.entidad?.name || "Ecuador"),
  ]);

  const paramInitial: any = {
    level: user?.role?.level,
    code: user?.entidad?.code?.toString(),
    searchBy: user?.entidad?.id || "",
  };
  const [params, setParams] = useState(paramInitial);

  useEffect(() => {
    setStore({
      title: "Resumen",
    });
  }, []);

  const {
    data: dashboard,
    reLoad,
    waiting,
  } = useAxios("/dashboard", "GET", {
    ...params,
  });

  useEffect(() => {
    reLoad(params);
  }, [params]);

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
      setHistTitulos(["Mapa de " + (user?.entidad?.name || "Ecuador")]);
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

  useEffect(() => {
    if (waiting === 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [waiting]);

  if (!userCan("home", "R")) return <NotAccess />;
  if (waiting > 0) return <WidgetSkeleton />;
  return (
    <div className={styles.container}>
      {params?.level == 1 ? (
        <WidgetTime data={dashboard?.data?.countDown} />
      ) : (
        <>
          <HistoryTitle
            param={[params, setParams]}
            histTitulos={histTitulos}
            onBack={onBack}
          />
        </>
      )}
      <section>
        {params?.level <= 3 && (
          <div>
            <DashboardMap
              data={dashboard?.data}
              onClick={onClick}
              params={[params, setParams]}
              entidadData={user}
              itemSelected={itemSelected}
            />
          </div>
        )}
        <div>
          <WidgetProgresiveBar
            data={{
              totalAfiliados:
                user?.role?.level === params?.level
                  ? user?.entidad?.affiliate_count
                  : dashboard?.data?.entidad.reduce(
                      (acc: number, current: any) =>
                        acc + current.affiliate_count,
                      0
                    ),
              totalHabilitados:
                user?.role?.level === params?.level
                  ? user?.entidad?.habilitados
                  : dashboard?.data?.entidad.reduce(
                      (acc: number, current: any) => acc + current.habilitados,
                      0
                    ),

              level: params?.level,
            }}
          />
          <WidgetCandidates
            data={dashboard?.data?.candidates}
            params={params}
          />
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
                  : params?.level === 2
                  ? "Provincia"
                  : "Cantón"
              }`}
              level={params?.level}
              onClickLevel={onClick}
            />
          )}
        </div>
      </section>
      <section>
        <p>
          Fuentes: Instituto Nacional de Estadística y Censos (INEC), Ecuador
        </p>
        <p>Consejo Nacional Electoral (CNE), Ecuador</p>
      </section>
    </div>
  );
};

export default HomePage;
