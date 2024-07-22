import WidgetPercentage from "../Widgets/WidgetPercentage/WidgetPercentage";
import useAxios from "@/mk/hooks/useAxios";
import WidgetTime from "../Widgets/WidgetTime.tsx/WidgetTime";
import WidgetAffiliatesRank from "../Widgets/WidgetAffiliatesRank/WidgetAffiliatesRank";
import WidgetTable from "../Widgets/WidgetTable.tsx/WidgetTable";
import styles from "./index.module.css";
import WidgetProgresiveBar from "../Widgets/WidgetProgresiveBar/WidgetProgresiveBar";
import { useEffect } from "react";
import { useAuth } from "@/mk/contexts/AuthProvider";
import WidgetMapa from "@/modulos/Statistics/WidgetMapa";

const HomePage = () => {
  const { data: dashboard } = useAxios("/dashboard", "GET", {
    fullType: "L",
    searchBy: "",
  });
  const { setStore } = useAuth();
  useEffect(() => {
    setStore({
      title: "Panel de control",
    });
  }, []);

  let totalHabitantes = dashboard?.data?.dptos.reduce(
    (acc: number, current: any) => acc + current.habitantes,
    0
  );

  let totalHabilitados = dashboard?.data?.dptos.reduce(
    (acc: number, current: any) => acc + current.habilitados,
    0
  );

  let totalAfiliados = dashboard?.data?.dptos.reduce(
    (acc: number, current: any) => acc + current.affiliate_count,
    0
  );

  let dataDpto = dashboard?.data?.dptos.map((dpto: any) => {
    return {
      id: dpto?.id,
      titulo: dpto?.name,
      habitantes: dpto?.habitantes,
      habilitados: dpto?.habilitados,
      afiliados: dpto?.affiliate_count,
    };
  });

  return (
    <div className={styles.container}>
      {dashboard?.data.countDown && (
        <WidgetTime data={dashboard?.data.countDown} />
      )}
      <section>
        <div>
          <WidgetMapa data={dashboard?.data?.dptos} />
        </div>
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
