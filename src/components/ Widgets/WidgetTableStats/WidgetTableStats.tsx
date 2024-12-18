import Table from "@/mk/components/ui/Table/Table";
import style from "./WidgetTableStats.module.css";
import { IconExport } from "@/components/layout/icons/IconsBiblioteca";
import { formatNumber } from "@/mk/utils/numbers";
import { getUrlImages } from "@/mk/utils/string";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";

const WidgetTableStats = ({ data, params, onClick, title }: any) => {
  const [param, setParam] = params;
  const level = param?.level || 0;
  const labels: string[] = [
    "Departamentos", // 0
    "Circunscripciones", // 1
    "Recintos", // 2
    "Mesas", // 3
    "Votos válidos", // 4
  ];

  const header = [
    {
      key: "index",
      label: "Nro",
      width: "40px",
      responsive: "onlyDesktop",
      // list:{backgroundColor:'red'},
      // style: {
      //   display: "flex",
      //   alignItems: "center",
      // },
      onRender: (item: any) => {
        return item.i;
      },
    },
    {
      key: "winner_id",
      label: "Partido ganador",
      responsive: "onlyDesktop",
      style: { textAlign: "center" },
      width: "400px",
      onRender: (item: any) => {
        return item?.item.emitidos == 0 ? (
          "Sin ganador"
        ) : (
          <Avatar src={getUrlImages("/PAR-" + item.value + ".png?d=")} />
        );
      },
    },
    {
      key: "name",
      label: labels[level],
      responsive: "onlyDesktop",
      width: "400px",
      style: {
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
      },
    },
    {
      key: "habitantes",
      label: "Población",
      responsive: "onlyDesktop",
      style: {
        justifyContent: "right",
        textAlign: "right",
      },
      width: "200px",
      onRender: (item: any) => {
        return formatNumber(item.value, 0);
      },
      sumarize: true,
    },
    {
      key: "habilitados",
      label: "Padrón electoral",
      responsive: "onlyDesktop",
      style: {
        justifyContent: "right",
        textAlign: "right",
      },
      width: "200px",
      onRender: (item: any) => {
        return formatNumber(item.value, 0);
      },
      sumarize: true,
    },

    {
      key: "emitidos",
      label: "Votos emitidos",
      responsive: "onlyDesktop",
      style: {
        justifyContent: "right",
        textAlign: "right",
      },
      width: "200px",
      onRender: (item: any) => {
        return formatNumber(item.value, 0);
      },
      sumarize: true,
    },
    {
      key: "paticipacion",
      label: "Participación",
      responsive: "onlyDesktop",
      style: {
        justifyContent: "right",
        textAlign: "right",
      },
      width: "200px",
      onRender: (item: any) => {
        return getPercentaje(item.item.emitidos, item.item.habilitados);
      },
    },
    {
      key: "entidad",
      label: labels[level + 1],
      responsive: "onlyDesktop",
      style: {
        justifyContent: "right",
        textAlign: "right",
      },
      // width: "200px",
      onRender: (item: any) => {
        return formatNumber(item.value, 0);
      },
      sumarize: true,
    },
  ];
  const headerFormatted = () => {
    if (level > 1) {
      return header.filter((item) => item.key != "habitantes");
    }

    return header;
  };

  const getPercentaje = (emitidos: number, habilitados: number) => {
    return emitidos && habilitados
      ? ((emitidos * 100) / habilitados).toFixed(2) + "%"
      : "0%";
  };

  // const render = (item: any, row: any, index: any) => {
  //   if (item.key == "index") {
  //     return index;
  //   }
  //   if (item.key == "winner_id") {
  //     return <Avatar src={getUrlImages("/PAR-" + row.winner_id + ".png?d=")} />;
  //   }
  //   if (item.key == "paticipacion") {
  //     return getPercentaje(row.emitidos, row.habilitados);
  //   }

  //   const value = row[item.key];
  //   return typeof value === "number" ? formatNumberCustom(value) : value;
  // };

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
        // renderBody={render}
        data={data}
        onRowClick={(row: any) => onClick(row.code)}
        header={headerFormatted()}
        className="striped"
        sumarize={true}
        // height="460px"
      />
      {/* <section>
        <span style={{ width: "210px" }}></span>
        <span style={{ width: "100%" }}></span>
        <span style={{ width: "100%" }}></span>
        <span style={{ width: "100%" }}></span>
        <span style={{ width: "100%" }}></span>
        {level <= 1 && (
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
      </section> */}

      <div style={{ marginTop: 16, color: "var(--cBlackV2)" }}>
        Fuente: Instituto Nacional de Estadística (INE) y Órgano Electoral
        Plurinacional (OEP)
      </div>
    </div>
  );
};

export default WidgetTableStats;
