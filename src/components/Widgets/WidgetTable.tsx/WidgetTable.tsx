import Table from "@/mk/components/ui/Table/Table";
import style from "./WidgetTable.module.css";
import { IconExport } from "@/components/layout/icons/IconsBiblioteca";
import { formatNumberCustom } from "@/mk/utils/date";
import { formatNumber } from "@/mk/utils/numbers";
import { useEffect, useState } from "react";

const WidgetTable = ({ data }: any) => {
  const header = [
    {
      key: "index",
      label: "nro",
      width: "120px",
      responsive: "onlyDesktop",
    },
    {
      key: "name",
      label: "Departamento",
      responsive: "onlyDesktop",
    },
    {
      key: "habitantes",
      label: "Poblacion total",
      responsive: "onlyDesktop",
      style: { textAlign: "right" },
      onRender: (item: any) => {
        return formatNumber(item.value, 0);
      },
    },
    {
      key: "habilitados",
      label: "Habilitados totales",
      responsive: "onlyDesktop",
      style: { textAlign: "right" },
      onRender: (item: any) => {
        return formatNumber(item.value, 0);
      },
    },
    {
      key: "affiliate_count",
      label: "Afiliados totales",
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
      col3 += item.affiliate_count;
    });
    setTotal({ col1, col2, col3 });
  }, [data]);
  return (
    <div className={style.container}>
      <section>
        <p>Resumen general a nivel Nacional</p>
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
        <div style={{ width: "150px" }}></div>
        <div style={{ width: "100%" }}></div>
        <div
          style={{
            width: "100%",
            backgroundColor: "var(--cWhiteV1)",
            border: "1px solid var(--cBlackV2)",
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
            border: "1px solid var(--cBlackV2)",
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
            border: "1px solid var(--cBlackV2)",
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

export default WidgetTable;
