/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import useCrud, { ModCrudType } from "@/mk/hooks/useCrud/useCrud";
import NotAccess from "@/components/auth/NotAccess/NotAccess";
import styles from "./EventsAdmin.module.css";
import { useEffect, useMemo, useState } from "react";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import { useAuth } from "@/mk/contexts/AuthProvider";
import DataModal from "@/mk/components/ui/DataModal/DataModal";
import Check from "@/mk/components/forms/Check/Check";

import ImportDataModal from "@/mk/components/data/ImportDataModal/ImportDataModal";
import {
  IconAlert,
  IconComment,
  IconConfirm,
  IconHealthWorkerForm,
  IconLike,
  IconPercentage,
} from "@/components/layout/icons/IconsBiblioteca";
import { formatNumber } from "@/mk/utils/numbers";
import RenderView from "../RenderView/RenderView";
import useCrudUtils from "@/modulos/shared/useCrudUtils";
import RenderItem from "@/modulos/shared/RenderItem";
import DataSearch from "@/mk/components/forms/DataSearch/DataSearch";
import { getDateTimeStrMes } from "@/mk/utils/date";

const paramsInitial = {
  perPage: -1,
  page: 1,
  fullType: "L",
  searchBy: "",
};
// const isHide = (data: {
//   key: string;
//   user?: Record<string, any>;
//   item: Record<string, any>;
// }) => {
//   const level = data.user?.role.level;
//   // const level = 3;
//   if (data.key == "sublema_id") return level > 1;
//   if (data.key == "lista_id") return level > 2;
//   if (data.key == "dpto_id") return level > 4;
//   if (data.key == "local_id") return level > 5;
//   if (data.key == "barrio_id") return level > 6;
//   return false;
// };

const lDestinies = (data: {
  key: string;
  user?: Record<string, any>;
  item: Record<string, any>;
}) => {
  const level = data.user?.role.level;
  const r = [];
  if (level == 1 || level == 0) {
    r.push({ id: 0, name: "Todos" });
  }
  if (level == 2) r.push({ id: 0, name: "Mi departamento" });
  if (level == 3) r.push({ id: 0, name: "Mi provincia" });
  if (level == 4) r.push({ id: 0, name: "Mi municipio" });
  if (level == 5) r.push({ id: 0, name: "Mi barrio" });

  // const level = 3;
  if (level <= 1) r.push({ id: 2, name: "Departamento" });
  if (level <= 2) r.push({ id: 3, name: "Provincia" });
  if (level <= 3) r.push({ id: 4, name: "Municipio" });
  // if (level <= 5) r.push({ id: 5, name: "Barrio" });
  // if (level <= 6) r.push({ id: 6, name: "Barrio" });

  return r;
};

// const leftDestiny = (data: {
//   key: string;
//   user?: Record<string, any>;
//   item: Record<string, any>;
// }) => {
//   return (
//     <ItemList
//       title={getFullName(data.user)}
//       subtitle={data.item?.user?.role?.name || "--"}
//       variant="V1"
//       left={
//         <Avatar
//           name={getFullName(data.user)}
//           src={getUrlImages(
//             "/ADM-" + data.user?.id + ".png?" + data.user?.updated_at
//           )}
//         />
//       }
//     />
//   );
// };

// const rigthAvatar = (data: {
//   key: string;
//   user?: Record<string, any>;
//   item: Record<string, any>;
// }) => {
//   if (!data.item.ext) return null;
//   return (
//     <img
//       src={getUrlImages(
//         "/EVENT-" +
//           data.item.id +
//           "." +
//           data.item.ext +
//           "?" +
//           data.item.updated_at
//       )}
//       alt={data.item.name}
//       width={100}
//       height={100}
//     />
//   );
// };

const EventsAdmin = () => {
  const { user } = useAuth();
  const mod: ModCrudType = {
    modulo: "events",
    singular: "evento",
    plural: "Eventos",
    permiso: "events",
    extraData: true,
    // import: true,
    renderView: (props: {
      open: boolean;
      onClose: any;
      item: Record<string, any>;
      onConfirm?: Function;
    }) => <RenderView {...props} />,
    loadView: { fullType: "DET", extraData: 1 },
    saveMsg: {
      add: "Evento creado con éxito",
      edit: "Evento actualizado con éxito",
      del: "Evento eliminado con éxito",
    },
  };
  const onTop = (data: {
    key: string;
    user?: Record<string, any>;
    item: Record<string, any>;
    extraData: Record<string, any>;
  }) => {
    const extraData = data?.extraData;
    if (data?.item?.destiny == 0) {
      return;
    }
    let selDestinies = [];
    if (data?.item?.destiny == 2) selDestinies = extraData.dptos;
    if (data?.item?.destiny == 3) selDestinies = extraData.provs;
    if (data?.item?.destiny == 4) selDestinies = extraData.muns;
    if (data?.item?.destiny == 5) selDestinies = extraData.dmuns;
    return (
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {selDestinies
          ?.filter((d: any) => data?.item?.lDestiny?.includes(d.id))
          .map((d: any, index: number, array: any[]) => (
            <p
              key={d.id}
              // className={styles.subtitle}
              style={{ color: "var(--cInfo)", marginTop: 4 }}
            >
              {d.name}
              {index < array.length - 1 ? "," : ""}
            </p>
          ))}
      </div>
    );
  };

  const fields = useMemo(
    () => ({
      id: { rules: [], api: "e" },
      date: {
        // rules: ["required"],
        api: "ae",
        label: "Fecha",
        list: false,
        // list: { width: "420px" },
        // onRender: (item: any) => {
        //   return item?.item?.date_at;
        // },
      },
      destiny: {
        rules: ["required"],
        api: "ae",
        label: "Destino",
        // list: {
        //   width: "190px",
        //   onRender: (item: any) => {
        //     let destinys = ["", "", "Provincia", "Cantón", "Parroquia"];
        //     console.log(item, "hkjhjk");
        //     if (item?.item?.destiny == 0) {
        //       return "Todos";
        //     }
        //     return destinys[item?.item?.destiny];
        //   },
        // },
        list: false,
        form: {
          type: "select",
          options: lDestinies,
          // onLeft: leftDestiny,
          onTop: onTop,
          precarga: 0,
        },
      },
      lDestiny: {
        rules: [],
        api: "ae",
        label: "",
        list: false,
        form: false,
      },
      candidate_id: {
        rules: ["required"],
        api: "ae",
        label: "Candidato",
        // list: { width: "200px" },
        // form: { type: "select", optionsExtra: "candidates" },
        list: false,
        form: {
          type: "select",
          filter: true,
          options: ({ extraData }: any) => {
            let data: any = [];
            extraData?.candidates.map((c: any) => {
              if (c.status == "A") {
                data.push({
                  id: c.id,
                  name:
                    getFullName(c) +
                    " - " +
                    extraData?.typeCands.find((t: any) => t.id == c.typecand_id)
                      ?.name,
                });
              }
            });
            return data;
          },
        },


      },
      
      // sublema_id: {
      //   rules: ["required"],
      //   api: "ae",
      //   label: "Sublema",
      //   onHide: isHide,
      //   list: false,
      //   form: {
      //     type: "select",
      //     addOptions: [{ id: 0, name: "Todos" }],
      //     optionsExtra: "sublemas",
      //     precarga: user.datos?.sublema_id,
      //   },
      // },
      date_at: {
        rules: ["required", "date"],
        api: "ae",
        label: "Fecha evento",
        // onHide: isHide,
        list: { width: "160px" },
        onRender: (item: any) => {
          return item?.item?.date_at;
        },
        form: {
          type: "datetime-local",
        },
      },
      name: {
        rules: ["required"],
        api: "ae",
        label: "Nombre del evento",
        list: true,
        form: { type: "text" },
      },
      description: {
        rules: ["required"],
        api: "ae",
        label: "Descripción",
        list: false,
        form: { type: "textArea", lines: 5 },
      },
      reaction: {
        api: "ae",
        label: "Interacciones",
        list: { width: "120px" },
        style: { display: "flex", justifyContent: "center" },
        form: false,
        onRender: (item: any) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 14,
                gap: 24,
              }}
            >
              <section
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: 14,
                  }}
                >
                  <IconLike size={24} color={"var(--cInfo)"} />
                </div>
                {formatNumber(item?.item?.likes, 0)}
              </section>
              <section
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: 14,
                  }}
                >
                  <IconComment size={24} />
                </div>
                {formatNumber(item?.item?.comments_count, 0)}
              </section>
            </div>
          );
        },
      },
      attendance_count: {
        api: "",
        label: "Desempeño",
        list: { width: "260" },
        // list: true,
        style: { display: "flex", justifyContent: "center" },
        form: false,
        onRender: (item: any) => {
          const percentage =
            item?.item?.assists > 0
              ? (item?.item?.attendance_count / item?.item?.assists) * 100
              : 0;

          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                fontSize: 14,
                gap: 24,
              }}
            >
              <section
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: 14,
                  }}
                >
                  <IconConfirm color={"var(--cSuccess)"} />
                </div>
                <div style={{ fontSize: "var(--sS)", marginBottom: 4 }}>
                  {formatNumber(item?.item?.assists, 0)}
                </div>
                <div>Asistirán</div>
              </section>{" "}
              <section
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: 14,
                  }}
                >
                  <IconHealthWorkerForm size={24} color={"var(--cAccent)"} />
                </div>
                <div style={{ fontSize: "var(--sS)", marginBottom: 4 }}>
                  {formatNumber(item?.item?.attendance_count, 0)}{" "}
                </div>
                <div>Asistieron</div>
              </section>
              <section
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: 14,
                  }}
                >
                  <IconPercentage size={24} />
                </div>
                <div style={{ fontSize: "var(--sS)", marginBottom: 4 }}>
                  {formatNumber(percentage.toFixed(2), 0)}
                </div>
                <div>Asistencia</div>
              </section>
            </div>
          );
        },
      },
      address: {
        rules: ["required"],
        api: "ae",
        label: "Lugar del evento",
        list: false,
        form: {
          type: "text",
          label: "Lugar del evento",
        },
      },
      location: {
        rules: ["required", "googleMapsLink"],
        api: "ae",
        label: "Link de ubicación",
        list: false,
        form: {
          type: "text",
          label: "Link de ubicación",
        },
      },
      avatar: {
        rules: ["requiredFile*a"],
        api: "a*e*",
        label: "Suba una Imagen",
        list: false,
        form: {
          type: "imageUpload",
          prefix: "EVENT",
          style: { width: "100%" },
          // onRigth: rigthAvatar,
        },
      },
    }),
    []
  );

  const _onChange = (
    e: any,
    item: any,
    setItem: Function,
    setShowExtraModal: Function
  ) => {
    const { name, value } = e.target;
    let selDestinies: any = [];
    if (name.indexOf("destiny_") == 0) {
      const id = parseInt(name.replace("destiny_", ""));
      if (value) {
        setItem({
          ...item,
          lDestiny: [...item.lDestiny, id],
        });
      } else {
        setItem({
          ...item,
          lDestiny: item.lDestiny.filter((d: number) => d != id),
        });
      }

      return true;
    }

    let lDestiny = item.lDestiny || [];
    if (name == "destiny") {
      selDestinies = null;
      if (value == 2) selDestinies = extraData.dptos;
      if (value == 3) selDestinies = extraData.provs;
      if (value == 4) selDestinies = extraData.muns;
      if (value == 5) selDestinies = extraData.barrios;

      if (value != item.destiny) {
        setItem({ ...item, lDestiny: [] });
        lDestiny = [];
      }

      if (selDestinies)
        setShowExtraModal(
          <ModalDestiny
            item={{ ...item, destiny: value, lDestiny: lDestiny }}
            setItem={setItem}
            selDestinies={selDestinies}
            setShowExtraModal={setShowExtraModal}
          />
        );
      else setShowExtraModal(null);
    }
    return false;
  };
  const ModalDestiny = ({
    item,
    setItem,
    selDestinies,
    setShowExtraModal,
  }: {
    item: any;
    setItem: Function;
    selDestinies: any;
    setShowExtraModal: Function;
  }) => {
    const [openDestiny, setOpenDestiny] = useState(true);
    const [sel, setSel]: any = useState([]);
    const [destiniesFiltered, setDestiniesFiltered]: any = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
      setSel(item?.lDestiny || []);
    }, [item]);
    const setOnSearch = (e: any) => {
      setSearch(e);
    };
    useEffect(() => {
      if (search == "") {
        setDestiniesFiltered(selDestinies);
        return;
      }
      const filtered = selDestinies.filter((d: any) =>
        d.name.toLowerCase().includes(search?.toLowerCase())
      );
      setDestiniesFiltered(filtered);
    }, [search]);
    const _onSave = () => {
      if (sel <= 0) {
        showToast("Debe seleccionar al menos un destino", "error");
        return;
      }
      setItem((old: any) => ({ ...old, lDestiny: sel }));
      setShowExtraModal(null);
      setOpenDestiny(false);
    };
    return (
      <DataModal
        title="Destino"
        open={openDestiny}
        onClose={() => {
          setOpenDestiny(false);
          setShowExtraModal(null);
        }}
        onSave={() => {
          _onSave();
        }}
      >
        {/* <Check
          key={"check0"}
          name={"destiny_0"}
          label="Todos"
          checked={sel.length == 0}
          onChange={(e: any) => {
            const { name, checked } = e.target;
            if (checked) {
              setSel([]);
            }
          }}
          value={0}
          optionValue={["0", "N"]}
        /> */}
        <DataSearch
          name="searchDestiny"
          setSearch={setOnSearch}
          value={search}
        />
        {destiniesFiltered.map((d: any, i: number) => (
          <Check
            key={"check" + i}
            name={"destiny_" + d.id}
            label={d.name}
            reverse
            checked={sel.includes(d.id)}
            onChange={(e: any) => {
              const { name, checked } = e.target;
              const id: any = parseInt(name.replace("destiny_", ""));

              const il: any = sel?.filter((d: number) => d != id) || [];
              if (checked) {
                il.push(d.id);
              }
              setSel(il);
            }}
            value={d.id}
            optionValue={[d.id, "N"]}
          />
        ))}
      </DataModal>
    );
  };

  const onImport = () => {
    setOpenImport(true);
  };

  const {
    userCan,
    List,
    setStore,
    onSearch,
    searchs,
    onEdit,
    onDel,
    extraData,
    findOptions,
    showToast,
    execute,
    reLoad,
    getExtraData,
  } = useCrud({
    paramsInitial,
    mod,
    fields,
    _onChange,
    _onImport: onImport,
  });
  const { onLongPress, selItem, searchState, setSearchState } = useCrudUtils({
    onSearch,
    searchs,
    setStore,
    mod,
    onEdit,
    onDel,
    title: "Eventos",
  });

  const [openImport, setOpenImport] = useState(false);
  useEffect(() => {
    setOpenImport(searchState == 3);
  }, [searchState]);

  const renderItem = (
    item: Record<string, any>,
    i: number,
    onClick: Function
  ) => {
    return (
      <RenderItem item={item} onClick={onClick} onLongPress={onLongPress}>
        <div className={styles["cardEventContainer"]}>
          <div>
            <img
              style={{ width: 156, height: 156, borderRadius: 8 }}
              src={getUrlImages(
                "/EVENT-" + item?.id + "." + item?.ext + "?" + item?.updated_at
              )}
            />
          </div>
          <div>
            <div className="tTitle">{item?.name} Hola</div>
            <div className="tSubtitle">{item?.description}</div>
            <div>{item?.assists} asistiran</div>
          </div>
        </div>
      </RenderItem>
    );
  };
  const onResponse = async () => {
    const { data } = await execute("/events-automatic", "POST", {});
    if (data?.success) {
      showToast("success", "Se han enviado las encuestas");
    } else {
      showToast("error", "No se han podido enviar las encuestas");
    }
  };
  if (!userCan(mod.permiso, "R")) return <NotAccess />;
  return (
    <div className={styles.roles}>
      {/* <IconLike onClick={() => onResponse()} /> */}
      <List onTabletRow={renderItem} actionsWidth="300px" />
      {openImport && (
        <ImportDataModal
          open={openImport}
          onClose={() => {
            setSearchState(0);
            setOpenImport(false);
          }}
          mod={mod}
          showToast={showToast}
          reLoad={reLoad}
          execute={execute}
          getExtraData={getExtraData}
          // requiredCols="DEPARTAMENTO, HABITANTES, HABILITADOS, ESCANOS, CODE"
        />
      )}
    </div>
  );
};

export default EventsAdmin;
