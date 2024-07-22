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
import DashboardMap from "../ Widgets/DasboardMap/DashboardMap";

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

  return (
    <div className={styles.container}>
      {dashboard?.data.countDown && (
        <WidgetTime data={dashboard?.data.countDown} />
      )}
      <section>
        <div>
          <DashboardMap
            data={dashboard?.data?.dptos}
            totalHabitanes={totalHabitantes}
            totalHabilitados={totalHabilitados}
            totalAfiliados={totalAfiliados}
          />
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
