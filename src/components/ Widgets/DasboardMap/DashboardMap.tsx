import React from "react";
import { Card } from "@/mk/components/ui/Card/Card";
import Image from "next/image";

import styles from "./DashboardMap.module.css";
import { formatNumber } from "../../../mk/utils/numbers";
import WidgetMapa from "@/modulos/Statistics/WidgetMapa";
import LoadingScreen from "@/mk/components/ui/LoadingScreen/LoadingScreen";

type TypeProps = {
  data: any;
  totalHabitanes: number;
  totalHabilitados: number;
  totalAfiliados: number;
};

export const WidgetMaps = ({
  data,
  totalHabitanes,
  totalHabilitados,
  totalAfiliados,
}: TypeProps) => {
  return (
    <LoadingScreen type="TableSkeleton">
      <div className={styles.WidgetMaps}>
        <div className={styles.stats}>
          <Card style={{ textAlign: "right" }}>
            <p>{formatNumber(totalHabitanes, 0)}</p>
            <p>Habitantes en base al censo del 2012</p>
          </Card>
          <Card style={{ textAlign: "right" }}>
            <p>{formatNumber(totalHabilitados, 0)}</p>
            <p>Total de habilitados en 2024</p>
          </Card>
          <Card style={{ textAlign: "right" }}>
            <p>{formatNumber(totalAfiliados, 0)}</p>
            <p>Total de afiliados en la red</p>
          </Card>
        </div>

        <WidgetMapa data={data} />
        <div className={styles.footer}>
          <div className={styles.bolivia}>
            <Image
              src="/images/Bolivia.png"
              alt="Bolivia"
              layout="fixed"
              width={190}
              height={50}
            />
          </div>
        </div>
      </div>
    </LoadingScreen>
  );
};

export default WidgetMaps;
