import { useRef, useState } from "react";

import styles from "./Mapa.module.css";
import Link from "next/link";
import { formatNumber } from "@/mk/utils/numbers";
import {
  pathsBeni,
  pathsChuquisaca,
  pathsCochabamba,
  pathsLaPaz,
  pathsOruro,
  pathsPais,
  pathsPando,
  pathsPotosi,
  pathsSantaCruz,
  pathsTarija,
} from "./pathMapas";

const viewBoxs = [
  "0 0 3994 4548",
  "0 0 612 570",
  "0 0 890 917",
  "0 0 632 668",
  "0 0 684 354",
  "0 0 596 750",
  "0 0 4898 3123",
  "0 0 6122 3709",
  "0 0 1953 2022",
  "0 0 4491 3047",
];
const MapaPais = ({ onClick, data, param }: any) => {
  const svgRef: any = useRef(null);

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    item: null,
  });

  let path: any = [];

  if ((param?.level || 0) == 0) path = pathsPais;
  if (param?.level == 1) {
    const item = data.find((d: any) => d.code == param?.code);
    console.log(item);

    switch (item?.code) {
      case "9":
        path = pathsPando;
        break;
      case "8":
        path = pathsBeni;
        break;
      case "2":
        path = pathsLaPaz;
        break;
      case "1":
        path = pathsChuquisaca;
        break;
      case "3":
        path = pathsCochabamba;
        break;
      case "4":
        path = pathsOruro;
        break;
      case "5":
        path = pathsPotosi;
        break;
      case "6":
        path = pathsTarija;
        break;
      case "7":
        path = pathsSantaCruz;
        break;
      default:
        path = pathsPais;
    }
  }
  if (param?.level == 2) {
    const item = data.find((d: any) => d.id == param?.searchBy);
    path = pathsPais;
  }

  const _onClick = (id: string | number) => {
    onClick(id);
  };

  const onTooltip = (
    event: any,
    id: string | number,
    show: boolean = false
  ) => {
    if (!show) return setTooltip({ visible: false, x: 0, y: 0, item: null });
    const rect = event.target.getBoundingClientRect();
    const svgRect = svgRef.current.getBoundingClientRect();
    const item = data.find((d: any) => d.code == id) || {
      id,
      name: "No se encontro " + id,
      habitates: 0,
      habilitados: 0,
      total: 0,
    };
    setTooltip({
      visible: true,
      x: rect.left - svgRect.left + rect.width / 2,
      y: rect.top - svgRect.top,
      item: item,
    });
  };

  let departmentValue: number = data?.find(
    (d: any) => d.id == param?.searchBy
  )?.code;

  const getStyle = (departmentValue: string) => {
    switch (departmentValue) {
      case "3":
        return styles.CochabambaMap;
      case "2":
        return styles.LaPazMap;
      case "7":
        return styles.SantaCruzMap;
      case "9":
        return styles.PandoMap;
      case "8":
        return styles.BeniMap;
      case "4":
        return styles.OruroMap;
      case "5":
        return styles.PotosiMap;
      case "1":
        return styles.ChuquisacaMap;
      case "6":
        return styles.TarijaMap;
      default:
        return styles.mapa;
    }
  };

  return (
    <div
      className={
        param?.level == 1
          ? getStyle(departmentValue + "")
          : param?.level == 2
          ? styles.recinto
          : styles.mapa
      }
    >
      <svg ref={svgRef} viewBox={path[0].vb}>
        {path.map((path: any) => {
          if (path.title == "rect") {
            return (
              <rect
                x={path.x}
                y={path.y}
                width={path.width}
                height={path.height}
                rx={path.rx}
                style={{ fill: "#fff" }}
                key={path.id}
              />
            );
          }

          return (
            <Link
              key={path.id}
              href="#"
              onClick={() =>
                path.title != "map" &&
                path.title != "line" &&
                path.title != "salar"
                  ? _onClick(path.id)
                  : {}
              }
              title={path.title}
            >
              <path
                style={{
                  fill:
                    path.title == "map"
                      ? "#F58220"
                      : path.title == "salar"
                      ? "#656F78"
                      : "",
                  stroke:
                    path.title == "value"
                      ? "#000"
                      : path.title == "line"
                      ? "#fff"
                      : "",
                  cursor:
                    path.title == "map" ||
                    path.title == "line" ||
                    path.title == "salar"
                      ? "default"
                      : "pointer",
                }}
                d={path.d}
                onMouseEnter={(e) => onTooltip(e, path.id)}
                onMouseLeave={() => onTooltip(null, path.id, false)}
              />
            </Link>
          );
        })}
      </svg>
      {tooltip.visible && (
        <Tooltip
          x={tooltip.x}
          y={tooltip.y}
          item={tooltip.item}
          param={param}
        />
      )}
    </div>
  );
};

export default MapaPais;

const Tooltip = ({ x, y, item, param }: any) => {
  let tit = "Curcunscripciones :";
  if (param?.level == 1) tit: "Recintos: ";
  return (
    <div
      className={styles.tooltip}
      style={{
        top: y,
        left: x,
        borderRadius: 4,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
      }}
    >
      <h3 style={{ fontSize: 16, color: "#101111", paddingBottom: 8 }}>
        {item?.name}
      </h3>
      <div style={{ fontSize: 12 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#656F78",
          }}
        >
          <p>Habitantes: </p>
          <p style={{ color: "#101111" }}>
            {formatNumber(item?.habitantes, 0)}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#656F78",
          }}
        >
          <p>Habilitados: </p>
          <p style={{ fontSize: 14 }}>{formatNumber(item?.habilitados, 0)}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#656F78",
          }}
        >
          <p>{tit}</p>
          <p style={{ color: "#101111" }}>{formatNumber(item?.total, 0)}</p>
        </div>
      </div>
    </div>
  );
};
