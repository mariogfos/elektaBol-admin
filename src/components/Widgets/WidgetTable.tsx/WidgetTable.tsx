import Table from "@/mk/components/ui/Table/Table";
import style from "./WidgetTable.module.css";
import { IconExport } from "@/components/layout/icons/IconsBiblioteca";
import { formatNumber } from "@/mk/utils/numbers";
import ProgresiveBar from "@/mk/components/ui/ProgresiveBar/ProgresiveBar";
import HorizontalProgresiveBar from "@/mk/components/ui/HorizontalProgresiveBar/HorizontalProgresiveBar";
import { RandomsColors } from "@/mk/utils/utils";

const WidgetTable = ({ data }: any) => {
  const dataWithPercentage = data.map((item: any) => {
    const percentage_hab = (item.affiliate_count / item.habilitados) * 100;
    return {
      ...item,
      percentage_hab, // Agrega el porcentaje calculado
    };
  });

  // 2. Ordenar los datos por 'percentage_hab' de mayor a menor
  const sortedData = dataWithPercentage.sort(
    (a: any, b: any) => b.percentage_hab - a.percentage_hab
  );

  const header = [
    {
      key: "index",
      label: "Nº",
      width: "170px",
      responsive: "",
      onRender: (item: any) => {
        return item.i;
      },
      // sumarize: true,
    },
    {
      key: "name",
      label: "Departamento",

      responsive: "",
    },
    {
      key: "habitantes",
      label: "Población total",
      responsive: "onlyDesktop",
      style: { justifyContent: "flex-end", textAlign: "right" },
      // list: {
      onRender: (item: any) => {
        return formatNumber(item.value, 0);
      },
      //},
      sumarize: true,
    },
    {
      key: "habilitados",
      label: "Habilitados totales",
      responsive: "",
      sumarize: true,
      style: { justifyContent: "flex-end", textAlign: "right" },
      onRender: (item: any) => {
        return formatNumber(item.value, 0);
      },
    },
    {
      key: "affiliate_count",
      label: "Afiliados totales",
      responsive: "",
      style: { justifyContent: "flex-end", textAlign: "right" },
      onRender: (item: any) => {
        return formatNumber(item.value, 0);
      },
      sumarize: true,
    },
    // {
    //   key: "percentage_hab",
    //   label: "Porcentaje de afiliación",
    //   responsive: "onlyDesktop",
    //   style: { justifyContent: "flex-end",textAlign:'right' },},
    //   onRender: (item: any) => {
    //     const percentage =
    //       (item.item?.affiliate_count / item.item?.habilitados) * 100;
    //     return `${formatNumber(percentage, 2)}%`;
    //   },
    // },
    {
      key: "pid",
      label: "Votos Creemos 2020",
      responsive: "",
      style: { justifyContent: "flex-end", textAlign: "right" },
      onRender: (item: any) => {
        return formatNumber(item.value, 0);
      },
      sumarize: true,
    },
    {
      key: "percentage_hab",
      label: "Porcentaje de afiliación",
      responsive: "onlyDesktop",
      style: { textAlign: "right", display: "block" },

      onRenderFoot: (item: any, index: number, sumas: any) => {
        const percentage = (sumas.affiliate_count * 100) / sumas.habilitados;
        return (
          <HorizontalProgresiveBar
            total={sumas?.habilitados}
            current={sumas?.affiliate_count}
            height={24}
            // className={'V1'}
            color="var(--cAccent)"
            goal={[sumas.pid]}
          />
        );
      },
      onRender: (item: any) => {
        return (
          <HorizontalProgresiveBar
            total={item.item?.habilitados}
            current={item.item?.affiliate_count}
            height={24}
            color={RandomsColors[item.i]}
            goal={[item.item?.pid]}
          />
        );
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
        data={sortedData}
        header={header}
        className="striped"
        sumarize={true}
        // height="340px"
      />
    </div>
  );
};

export default WidgetTable;
