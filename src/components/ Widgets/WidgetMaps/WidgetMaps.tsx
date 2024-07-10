import React from "react";
import { Card } from "@/mk/components/ui/Card/Card";
import Image from "next/image";

import styles from "./WidgetMaps.module.css";
import { formatNumber } from "../../../mk/utils/numbers";
import { DepartmentsMaps } from "@/components/Maps/Country/DepartmentsMaps";

type TypeProps = {
  tooltipsData: any;
  totalHabitanes: number;
  totalHabilitados: number;
  totalAfiliados: number;
};

export const WidgetMaps = ({
  tooltipsData,
  totalHabitanes,
  totalHabilitados,
  totalAfiliados,
}: TypeProps) => {
  return (
    <div className={styles.WidgetMaps}>
      <div className={styles.stats}>
        <Card style={{ textAlign: "right" }}>
          <p>{formatNumber(totalHabitanes, 0)}</p>
          <p>Habitantes en base al censo del 2023</p>
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

      <DepartmentsMaps tooltipsData={tooltipsData} />
      <div className={styles.footer}>
        <div className={styles.uruguay}>
          <Image
            src="/images/Uruguay.webp"
            alt="Uruguay"
            layout="fixed"
            width={190}
            height={50}
          />
        </div>
      </div>
    </div>
  );
};

export default WidgetMaps;
