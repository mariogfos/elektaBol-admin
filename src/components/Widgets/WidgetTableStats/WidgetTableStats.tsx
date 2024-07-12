import Table from "@/mk/components/ui/Table/Table";
import style from "./WidgetTableStats.module.css";
import { IconExport } from "@/components/layout/icons/IconsBiblioteca";
import { formatNumberCustom } from "@/mk/utils/date";
import { formatNumber } from "@/mk/utils/numbers";
import { useEffect, useState } from "react";
import { ParamsType } from "@/mk/types/generics";

const WidgetTableStats = ({
  data,
  level,
  setLevel,
  params,
  setParams,
  onClickLevel,
  title,
}: any) => {
  const labels: string[] = [
    "Departamento", // 0
    "Circunscripción", // 1
    "Recinto", // 2
    "Mesa", // 3
  ];
  // console.log(
  //   "result: ",
  //   data.find((item: any) => item.id == params.searchBy)
  // );

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
      key: "circuns_count",
      label: labels[level + 1],
      responsive: "onlyDesktop",
      style: { textAlign: "right" },
      onRender: (item: any) => {
        return formatNumber(item.value, 0);
      },
    },
  ];
  const render = (item: any, row: any, index: any) => {
    if (item.key == "index") {
      return index;
    }

    const value = row[item.key];
    return typeof value === "number" ? formatNumberCustom(value) : value;
  };

  const [total, setTotal] = useState({ col1: 0, col2: 0, col3: 0 });
  useEffect(() => {
    let col1 = 0;
    let col2 = 0;
    let col3 = 0;
    data.forEach((item: any) => {
      col1 += item.habitantes;
      col2 += item.habilitados;
      col3 += item.circuns_count;
    });
    setTotal({ col1, col2, col3 });
  }, [data]);
  const handleRowClick = (row: any) => {
    console.log(row);
    setParams({ ...params, searchBy: row.id, level: level + 1 });
    if (level < 3) {
      setLevel(level + 1);
    }
    return;
  };
  return (
    <div className={style.container}>
      <section>
        <p>{title || "Resumen"}</p>
        <IconExport color="var(--cWhiteV2)" />
      </section>
      <Table
        style={{
          border: "1px solid var(--cWhiteV1)",
          maxHeight: "360px",
          overflowY: "auto",
        }}
        renderBody={render}
        data={data}
        onRowClick={(row: any) => onClickLevel(row)}
        header={header}
        className="striped"
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          paddingRight: "8px",
        }}
      >
        <div style={{ width: "220px" }}></div>
        <div style={{ width: "100%" }}></div>
        <div
          style={{
            width: "100%",
            backgroundColor: "var(--cWhiteV1)",
            border: "1px solid var(--cWhiteV1)",
            borderRadius: "0px 0px 0px 8px",
            textAlign: "right",
            paddingTop: "8px",
            paddingBottom: "8px",
            fontSize: "16px",
          }}
        >
          <span style={{ paddingRight: "15px" }}>
            {formatNumber(total?.col1, 0)}
          </span>
        </div>
        <div
          style={{
            width: "100%",
            backgroundColor: "var(--cWhiteV1)",
            border: "1px solid var(--cWhiteV1)",
            textAlign: "right",
            paddingTop: "8px",
            paddingBottom: "8px",
            fontSize: "16px",
          }}
        >
          <span style={{ paddingRight: "15px" }}>
            {formatNumber(total?.col2, 0)}
          </span>
        </div>
        <div
          style={{
            width: "100%",
            backgroundColor: "var(--cWhiteV1)",
            border: "1px solid var(--cWhiteV1)",
            borderRadius: "0px 0px 8  px 0px",
            textAlign: "right",
            paddingTop: "8px",
            paddingBottom: "8px",
            fontSize: "16px",
          }}
        >
          <span style={{ paddingRight: "17px" }}>
            {formatNumber(total?.col3, 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WidgetTableStats;
