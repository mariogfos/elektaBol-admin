import React from "react";
import { Card } from "@/mk/components/ui/Card/Card";

import styles from "./DashboardMap.module.css";
import Image from "next/image";
import { formatNumber } from "@/mk/utils/numbers";
import WidgetMapa from "@/modulos/Statistics/WidgetMapa/WidgetMapa";

type TypeProps = {
  data: any;
  params?: any;
  onClick?: any;
  entidadData?: any;
  itemSelected?: any;
  isProvince?: boolean;
};

export const DashboardMap = ({
  data,
  params,
  onClick,
  entidadData,
  itemSelected,
  isProvince,
}: TypeProps) => {
  const totalHabitantes = data?.entidad.reduce(
    (acc: number, current: any) => acc + current.habitantes,
    0
  );
  // console.log("totalHabitantes", totalHabitantes);
  const totalHabilitados = data?.entidad.reduce(
    (acc: number, current: any) => acc + current.habilitados,
    0
  );
  const totalPid = data?.entidad.reduce(
    (acc: number, current: any) => acc + current.pid,
    0
  );
  const totalAfiliados = data?.entidad.reduce(
    (acc: number, current: any) => acc + current.affiliate_count,
    0
  );

  return (
    <div className={styles.WidgetMaps}>
      <>
        <div>
          Resumen poblacional en{" "}
          {params[0]?.level === 0
            ? "Bolivia"
            : params[0]?.level === 1
            ? "Departamento"
            : params[0]?.level === 2
            ? "Provincia"
            : params[0]?.level === 3
            ? "Municipio"
            : "Distrito municipal"}
        </div>
        <div className={styles.stats}>
          <Card style={{ textAlign: "right", fontSize: 16 }}>
            <p>Población Censo 2022</p>
            {params[0]?.level == entidadData?.role?.level ? (
              <p>{formatNumber(entidadData?.entidad?.habitantes)}</p>
            ) : (
              <p>{formatNumber(totalHabitantes)}</p>
            )}
          </Card>
          <Card style={{ textAlign: "right", fontSize: 16 }}>
            <p>Votantes habilitados 2024</p>
            {params[0]?.level == entidadData?.role?.level ? (
              <p>{formatNumber(entidadData?.entidad?.habilitados)}</p>
            ) : (
              <p>{formatNumber(totalHabilitados)}</p>
            )}
          </Card>
          <Card style={{ textAlign: "right", fontSize: 16 }}>
            <p>Votos obtenidos PID 2024</p>
            {params[0]?.level == entidadData?.role?.level ? (
              <p>{formatNumber(entidadData?.entidad?.pid)}</p>
            ) : (
              <p>{formatNumber(totalPid)}</p>
            )}
          </Card>
          <Card style={{ textAlign: "right", fontSize: 16 }}>
            <p>Afiliados en Elekta</p>
            <p>{formatNumber(totalAfiliados)}</p>
          </Card>
        </div>
      </>

      <div className={styles.ecuador}>
        <WidgetMapa data={data?.entidad} />
        {params[0]?.level == 1 && (
          <div>
            <Image
              src="/images/Bolivia.png"
              alt="Bolivia"
              width={190}
              height={40}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardMap;
