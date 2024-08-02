import Table from "@/mk/components/ui/Table/Table";
import style from "./WidgetTable.module.css";
import { IconExport } from "@/components/layout/icons/IconsBiblioteca";
import { formatNumber } from "@/mk/utils/numbers";

const WidgetTable = ({ data }: any) => {
  const header = [
    {
      key: "index",
      label: "nro",
      width: "60px",
      responsive: "onlyDesktop",
      onRender: (item: any) => {
        return item.i;
      },
      // sumarize: true,
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
      width: "220px",
      style: { textAlign: "right" },
      onRender: (item: any) => {
        return formatNumber(item.value, 0);
      },
      sumarize: true,
    },
    {
      key: "habilitados",
      label: "Habilitados totales",
      responsive: "onlyDesktop",
      sumarize: true,
      width: "220px",
      style: { textAlign: "right" },
      onRender: (item: any) => {
        return formatNumber(item.value, 0);
      },
    },
    {
      key: "affiliate_count",
      width: "220px",
      label: "Afiliados totales",
      responsive: "onlyDesktop",
      style: { textAlign: "right" },
      onRender: (item: any) => {
        return formatNumber(item.value, 0);
      },
      sumarize: true,
    },
  ];

  return (
    <div className={style.container}>
      <section>
        <p>Resumen general a nivel Nacional</p>
        <IconExport color="var(--cWhiteV2)" />
      </section>
      <Table
        data={data}
        header={header}
        className="striped"
        sumarize={true}
        height="340px"
      />
    </div>
  );
};

export default WidgetTable;
