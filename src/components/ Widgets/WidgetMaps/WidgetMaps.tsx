import React from "react";
import { Card } from "@/mk/components/ui/Card/Card";
import { IconUruguay } from "@/components/layout/icons/IconsBiblioteca";
import { DepartmentsMaps } from "@/components/Maps/Departments/DepartmentsMaps";

import styles from "./WidgetMaps.module.css";
import { formatNumber } from "../../../mk/utils/numbers";
import { formatNumberCustom } from "@/mk/utils/date";
import Image from "next/image";

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
            // style={{ width: "100%", height: "100%" }}
            width={190}
            height={50}
            // objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
};

export default WidgetMaps;
