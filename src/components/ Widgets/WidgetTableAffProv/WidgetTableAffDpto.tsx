import Table from "@/mk/components/ui/Table/Table";
import { formatNumber } from "@/mk/utils/numbers";
import React, { useEffect, useState } from "react";
import WidgetBase from "../WidgetBase/WidgetBase";
import Select from "@/mk/components/forms/Select/Select";

const colors = ["#F08080", "#F7B267", "#F8DDA4", "#A2D2BF", "#00AF90"];

const WidgetTableAffDpto = ({ widget, data, type, filters }: any) => {
  const [orden, setOrden] = useState("name");

  // Formatear los datos de los departamentos
  const dataFormattedDpto = () => {
    let newData: any = [];

    data?.forEach((item: any, i: number) => {
      const d = widget[item?.id];
      if (d) {
        newData.push({
          name: item?.name,
          afiliados: d[0],
          distribucion: (d[0] * 100) / d[1],
          habilitados: d[1],
        });
      }
    });

    newData.sort((a: any, b: any) => b[orden] - a[orden]);
    return newData;
  };

  const dataFormattedProv = () => {
    let locals = data?.filter(
      (item: any) => item?.prov_id === filters?.prov_idV
    );
    let newData: any = [];

    locals?.forEach((item: any) => {
      const d = widget[item?.id];
      if (d) {
        newData.push({
          name: item?.name,
          afiliados: d[0],
          distribucion: (d[0] * 100) / d[1],
          habilitados: d[1],
        });
      }
    });

    newData.sort((a: any, b: any) => b[orden] - a[orden]);
    return newData;
  };
  useEffect(() => {
    if (type == "dpto") {
      dataFormattedDpto();
    }
    if (type == "prov") {
      dataFormattedProv();
    }
  }, [orden]);

  const getBackground = (value: any) => {
    if (value < 20) {
      return colors[0];
    } else if (value < 40) {
      return colors[1];
    }
    if (value < 60) {
      return colors[2];
    }
    if (value < 80) {
      return colors[3];
    }
    return colors[4];
  };

  const header: any = [
    {
      key: "index",
      label: "Nº",
      width: "170px",
      onRender: (item: any) => item.i,
    },
    {
      key: "name",
      label: type == "prov" ? "Provincia" : "Departamento",
    },
    {
      key: "afiliados",
      label: "Afiliados",
      responsive: "onlyDesktop",
      style: { justifyContent: "flex-end", textAlign: "right" },
    },
    {
      key: "habilitados",
      label: "Habilitados",
      responsive: "onlyDesktop",
      style: { justifyContent: "flex-end", textAlign: "right" },
      sumarize: true,
    },
    {
      key: "distribucion",
      label: "Distribución en %",
      style: {
        textAlign: "center",
        padding: 0,
      },
      onRender: (item: any) => (
        <div
          style={{
            backgroundColor: getBackground(item.value),
            flexGrow: 1,
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "var(--cBlack)",
          }}
        >
          {formatNumber(item.value, 1) + "%"}
        </div>
      ),
    },
  ];
  return (
    <WidgetBase
      title={`Afiliados por ${type == "prov" ? "provincia" : "departamento"}`}
    >
      <div style={{ width: "200px", marginTop: 12 }}>
        <Select
          name="orden"
          value={orden}
          onChange={(e: any) => setOrden(e.target.value)}
          options={[
            { id: "name", name: "Nombre" },
            { id: "afiliados", name: "Afiliados" },
            { id: "distribucion", name: "Distribución" },
            { id: "habilitados", name: "Habilitados" },
          ]}
        />
      </div>
      <Table
        data={type == "dpto" ? dataFormattedDpto() : dataFormattedProv()}
        header={header}
        className="striped"
        sumarize={true}
        // height="340px"
      />
    </WidgetBase>
  );
};

export default WidgetTableAffDpto;
