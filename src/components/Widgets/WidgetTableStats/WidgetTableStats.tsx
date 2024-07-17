import Table from "@/mk/components/ui/Table/Table";
import style from "./WidgetTableStats.module.css";
import { IconExport } from "@/components/layout/icons/IconsBiblioteca";
import { formatNumberCustom } from "@/mk/utils/date";
import { formatNumber } from "@/mk/utils/numbers";
import { useEffect, useState } from "react";

const WidgetTableStats = ({ data, params, onClick, title }: any) => {
  const [param, setParam] = params;
  const level = param?.level || 0;
  const labels: string[] = [
    "Departamento", // 0
    "Circunscripción", // 1
    "Recinto", // 2
    "Mesa", // 3
  ];
  const [total, setTotal] = useState({ col1: 0, col2: 0, col3: 0 });

  useEffect(() => {
    let col1 = 0;
    let col2 = 0;
    let col3 = 0;
    data?.forEach((item: any) => {
      col1 += item.habitantes;
      col2 += item.habilitados;
      col3 += item.total;
    });
    setTotal({ col1, col2, col3 });
  }, [data]);

  const header = [
    {
      key: "index",
      label: "Nro",
      width: "150px",
      responsive: "onlyDesktop",
    },
    {
      key: "name",
      label: labels[level],
      responsive: "onlyDesktop",
    },
    {
      key: "habitantes",
      label: "Poblacion",
      responsive: "onlyDesktop",
      style: { textAlign: "right" },
      onRender: (item: any) => {
        return formatNumber(item.value, 0);
      },
    },
    {
      key: "habilitados",
      label: "Empadronados",
      responsive: "onlyDesktop",
      style: { textAlign: "right" },
      onRender: (item: any) => {
        return formatNumber(item.value, 0);
      },
    },

    {
      key: "total",
      label: labels[level + 1],
      responsive: "onlyDesktop",
      style: { textAlign: "right" },
      onRender: (item: any) => {
        return formatNumber(item.value, 0);
      },
    },
  ];
  const headerFormatted = () => {
    if (level == 1) {
      return header.filter((item) => item.key != "habitantes");
    }
    return header;
  };

  const render = (item: any, row: any, index: any) => {
    if (item.key == "index") {
      return index;
    }

    const value = row[item.key];
    return typeof value === "number" ? formatNumberCustom(value) : value;
  };

  return (
    <div className={style.container}>
      <section>
        <p>
          {level == 0
            ? "Departamentos"
            : level == 1
            ? "Circunscripciones"
            : level == 2
            ? "Recintos electorales"
            : "Mesas electorales"}
        </p>
        <IconExport color="var(--cWhiteV2)" />
      </section>
      <Table
        style={{
          border: "1px solid var(--cWhiteV1)",
          borderRadius: "12px 12px 0px 10px",
          maxHeight: "360px",
          overflowY: "auto",
        }}
        renderBody={render}
        data={data}
        onRowClick={(row: any) => onClick(row.code)}
        header={headerFormatted()}
        className="striped"
      />
      <section>
        <span style={{ width: "210px" }}></span>
        <span style={{ width: "100%" }}></span>
        {level == 0 && (
          <div>
            <span>{formatNumber(total?.col1, 0)}</span>
          </div>
        )}
        <div>
          <span>{formatNumber(total?.col2, 0)}</span>
        </div>
        <div>
          <span>{formatNumber(total?.col3, 0)}</span>
        </div>
      </section>

      <div style={{ marginTop: 16, color: "var(--cBlackV2)" }}>
        Fuente: Instituto Nacional de Estadística (INE) y Órgano Electoral
        Plurinacional (OEP)
      </div>
    </div>
  );
};

export default WidgetTableStats;
