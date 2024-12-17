import { useRef, useState } from "react";
import styles from "./Mapa.module.css";
import Link from "next/link";
import { formatNumber } from "@/mk/utils/numbers";
import {
  pathsBeni,
  pathsC10,
  pathsC11,
  pathsC12,
  pathsC13,
  pathsC14,
  pathsC15,
  pathsC16,
  pathsC17,
  pathsC18,
  pathsC19,
  pathsC1,
  pathsC2,
  pathsC20,
  pathsC22,
  pathsC23,
  pathsC24,
  pathsC25,
  pathsC26,
  pathsC27,
  pathsC28,
  pathsC29,
  pathsC3,
  pathsC30,
  pathsC31,
  pathsC32,
  pathsC34,
  pathsC35,
  pathsC36,
  pathsC37,
  pathsC38,
  pathsC39,
  pathsC4,
  pathsC40,
  pathsC41,
  pathsC42,
  pathsC43,
  pathsC44,
  pathsC45,
  pathsC46,
  pathsC47,
  pathsC48,
  pathsC49,
  pathsC5,
  pathsC50,
  pathsC51,
  pathsC52,
  pathsC53,
  pathsC54,
  pathsC55,
  pathsC56,
  pathsC57,
  pathsC58,
  pathsC59,
  pathsC6,
  pathsC60,
  pathsC61,
  pathsC62,
  pathsC63,
  pathsC7,
  pathsC8,
  pathsC9,
  pathsChuquisaca,
  pathsCochabamba,
  pathsLaPaz,
  pathsOruro,
  pathsPais,
  pathsPando,
  pathsPotosi,
  pathsSantaCruz,
  pathsTarija,
  pathsSantaCruzProvincias,
  pathsSantaCruzProvinciaVelasco,
  pathsSantaCruzProvinciaIchilo,
  pathsSantaCruzProvinciaCordillera,
  pathsSantaCruzProvinciaSara,
  pathsSantaCruzProvinciaObispoSantistevan,
  pathsSantaCruzProvinciaWarnes,
  pathsSantaCruzProvinciaManuelCaballero,
  pathsSantaCruzProvinciaFlorida,
  pathsSantaCruzProvinciaAndrez,
  pathsSantaCruzProvinciaChiquito,
} from "./pathMapas";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import { getUrlImages } from "@/mk/utils/string";

type PropsType = {
  data: any;
  onClick?: any;
  params?: any;
  itemSelected?: any;
  isProvince?: boolean;
};

const WidgetMapa = ({
  data,
  onClick = () => {},
  params = [{}, () => {}],
  itemSelected,
  isProvince = false,
}: PropsType) => {
  const svgRef: any = useRef(null);
  const [param, setParam] = params;

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    item: null,
  });

  let path: any = [];
  let paramLevel = param?.level == undefined ? 0 : param?.level;

  if ((param?.level || 1) == 1) path = pathsPais;

  if (isProvince) {
    if (param?.level == 4) {
      path = pathsSantaCruzProvincias;
    }
    if (param?.level == 5) {
      switch (param?.code) {
        case "3":
          path = pathsSantaCruzProvinciaVelasco;
          break;
        case "4":
          path = pathsSantaCruzProvinciaIchilo;
          break;
        case "6":
          path = pathsSantaCruzProvinciaSara;
          break;
        case "10":
          path = pathsSantaCruzProvinciaObispoSantistevan;
          break;
        case "2":
          path = pathsSantaCruzProvinciaWarnes;
          break;
        case "13":
          path = pathsSantaCruzProvinciaManuelCaballero;
          break;
        case "9":
          path = pathsSantaCruzProvinciaFlorida;
          break;
        case "1":
          path = pathsSantaCruzProvinciaAndrez;
          break;
        case "5":
          path = pathsSantaCruzProvinciaChiquito;
          break;
        default:
          return null;
      }
    }
  } else {
    if (param?.level == 1) {
      switch (param?.code) {
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
      switch (param?.code) {
        case "40":
          path = pathsC40;
          break;
        case "41":
          path = pathsC41;
          break;
        case "42":
          path = pathsC42;
          break;
        case "43":
          path = pathsC43;
          break;
        case "44":
          path = pathsC44;
          break;
        case "45":
          path = pathsC45;
          break;
        case "46":
          path = pathsC46;
          break;
        case "47":
          path = pathsC47;
          break;
        case "48":
          path = pathsC48;
          break;
        case "49":
          path = pathsC49;
          break;
        case "50":
          path = pathsC50;
          break;
        case "51":
          path = pathsC51;
          break;
        case "52":
          path = pathsC52;
          break;
        case "53":
          path = pathsC53;
          break;
        case "54":
          path = pathsC54;
          break;
        case "55":
          path = pathsC55;
          break;
        case "56":
          path = pathsC56;
          break;
        case "57":
          path = pathsC57;
          break;
        case "58":
          path = pathsC58;
          break;
        case "59":
          path = pathsC59;
          break;
        case "60":
          path = pathsC60;
          break;
        case "61":
          path = pathsC61;
          break;
        case "62":
          path = pathsC62;
          break;
        case "63":
          path = pathsC63;
          break;
        case "27":
          path = pathsC27;
          break;
        case "28":
          path = pathsC28;
          break;
        case "26":
          path = pathsC26;
          break;
        case "22":
          path = pathsC22;
          break;
        case "20":
          path = pathsC20;
          break;
        case "23":
          path = pathsC23;
          break;
        case "24":
          path = pathsC24;
          break;
        case "25":
          path = pathsC25;
          break;
        case "6":
          path = pathsC6;
          break;
        case "7":
          path = pathsC7;
          break;
        case "8":
          path = pathsC8;
          break;
        case "9":
          path = pathsC9;
          break;
        case "10":
          path = pathsC10;
          break;
        case "11":
          path = pathsC11;
          break;
        case "12":
          path = pathsC12;
          break;
        case "13":
          path = pathsC13;
          break;
        case "14":
          path = pathsC14;
          break;
        case "15":
          path = pathsC15;
          break;
        case "16":
          path = pathsC16;
          break;
        case "17":
          path = pathsC17;
          break;
        case "18":
          path = pathsC18;
          break;
        case "19":
          path = pathsC19;
          break;
        case "32":
          path = pathsC32;
          break;
        case "31":
          path = pathsC31;
          break;
        case "30":
          path = pathsC30;
          break;
        case "29":
          path = pathsC29;
          break;
        case "36":
          path = pathsC36;
          break;
        case "37":
          path = pathsC37;
          break;
        case "35":
          path = pathsC35;
          break;
        case "34":
          path = pathsC34;
          break;
        case "39":
          path = pathsC39;
          break;
        case "38":
          path = pathsC38;
          break;
        case "2":
          path = pathsC2;
          break;
        case "1":
          path = pathsC1;
          break;
        case "3":
          path = pathsC3;
          break;
        case "4":
          path = pathsC4;
          break;
        case "5":
          path = pathsC5;
          break;
        default:
          return null;
      }
    }
  }

  const _onClick = (code: string | number) => {
    let row = data?.find((d: any) => d.code == code);
    onClick(row);
  };

  console.log("param", param);
  console.log("data grinhouse: ", data);

  const onTooltip = (event: any, id: string | number, show: boolean = true) => {
    if (!show) return setTooltip({ visible: false, x: 0, y: 0, item: null });
    const rect = event.target.getBoundingClientRect();
    const svgRect = svgRef.current.getBoundingClientRect();
    const item = data?.find((d: any) =>
      param?.level >= 5 ? d.id == id : d.code == id
    ) || {
      id: id || itemSelected?.id,
      name: itemSelected?.name || "",
      habitantes: itemSelected?.habitantes || 0,
      habilitados: itemSelected?.habilitados || 0,
      afiliados: itemSelected?.afiliados || 0,
      total: 0,
    };

    setTooltip({
      visible: id ? true : false,
      x: rect.left - svgRect.left + rect.width / 2,
      y: rect.top - svgRect.top,
      item: paramLevel <= 6 ? item : null,
    });
  };

  const getStyle = () => {
    switch (param?.code) {
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

  const Tooltip = ({ item }: any) => {
    return (
      paramLevel <= 6 && (
        <div
          className={styles.tooltip}
          style={{
            top: tooltip.y,
            left: tooltip.x,
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
              <p>Afiliados:</p>
              <p style={{ fontSize: 14 }}>
                {formatNumber(item?.affiliate_count, 0)}
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
              <p style={{ fontSize: 14 }}>
                {formatNumber(item?.habilitados, 0)}
              </p>
            </div>
            {item?.winner_id && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#656F78",
                }}
              >
                <p
                  style={{
                    alignSelf: "center",
                    color: "#101111",
                    fontWeight: "bold",
                  }}
                >
                  Partido ganador:
                </p>
                <div>
                  <Avatar
                    h={40}
                    w={40}
                    src={getUrlImages("/PAR-" + item?.winner_id + ".png?d=")}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )
    );
  };

  return (
    <div
      className={
        param?.level == 1
          ? getStyle()
          : param?.level == 2
          ? styles.recinto
          : styles.mapa
      }
    >
      <svg ref={svgRef} viewBox={path[0].vb}>
        {path.map((path: any, index: number) => {
          if (path.title === "rect") {
            return (
              <rect
                key={path.id || index}
                x={path.x}
                y={path.y}
                width={path.width}
                height={path.height}
                rx={path.rx}
                style={{ fill: "#fff" }}
              />
            );
          }

          return (
            <Link
              key={path.id || index}
              href="#"
              onClick={() =>
                path.title !== "map" &&
                path.title !== "line" &&
                path.title !== "salar" &&
                param?.level != 7 &&
                path.title !== "disabled" &&
                path.code
                  ? _onClick(path.code)
                  : {}
              }
              title={path.title}
            >
              <path
                key={path.id || index}
                style={{
                  fill:
                    path.title === "map"
                      ? "#F58220"
                      : path.title === "salar"
                      ? "#656F78"
                      : "",
                  stroke:
                    path.title === "value"
                      ? "#000"
                      : path.title === "line"
                      ? "#fff"
                      : "",
                  cursor:
                    path.title === "map" ||
                    path.title === "line" ||
                    path.title === "salar" ||
                    param?.level < 7
                      ? "pointer"
                      : "default",
                }}
                d={path.d}
                onMouseEnter={(e) => onTooltip(e, path.code)}
                onMouseLeave={() => onTooltip(null, path.code, false)}
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

export default WidgetMapa;
