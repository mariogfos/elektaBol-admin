import Table from "@/mk/components/ui/Table/Table";
import style from "./WidgetTable.module.css";
import { IconExport } from "@/components/layout/icons/IconsBiblioteca";
import { formatNumber } from "@/mk/utils/numbers";

const WidgetTable = ({ data }: any) => {
  const header = [
    {
      key: "index",
      label: "nro",
      width: "200px",
      responsive: "",
      onRender: (item: any) => {
        return item.i;
      },
      // sumarize: true,
    },
    {
      key: "name",
      label: "Departamento",
      width: "700px",
      responsive: "",
    },
    {
      key: "habitantes",
      label: "Poblacion total",
      responsive: "onlyDesktop",
      style: { textAlign: "right" },
      list: {
        onRender: (item: any) => {
          return formatNumber(item.value, 0);
        },
      },
      sumarize: true,
    },
    {
      key: "habilitados",
      label: "Habilitados totales",
      responsive: "",
      sumarize: true,
      style: { textAlign: "right" },
      onRender: (item: any) => {
        return formatNumber(item.value, 0);
      },
    },
    {
      key: "affiliate_count",
      label: "Afiliados totales",
      responsive: "",
      style: { textAlign: "right" },
      onRender: (item: any) => {
        return formatNumber(item.value, 0);
      },
      sumarize: true,
    },
    {
      key: "percentage_hab",
      label: "Porcentaje de afiliación",
      responsive: "onlyDesktop",
      style: { textAlign: "right" },
      onRender: (item: any) => {
        const percentage =
          (item.item?.affiliate_count / item.item?.habilitados) * 100;
        return `${formatNumber(percentage, 2)}%`;
      },
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
