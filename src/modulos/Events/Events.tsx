/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import useCrud, { ModCrudType } from "@/mk/hooks/useCrud/useCrud";
import NotAccess from "@/components/auth/NotAccess/NotAccess";
import styles from "./Events.module.css";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import useCrudUtils from "../shared/useCrudUtils";
import { useEffect, useMemo, useState } from "react";
import RenderItem from "../shared/RenderItem";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import { useAuth } from "@/mk/contexts/AuthProvider";
import DataModal from "@/mk/components/ui/DataModal/DataModal";
import Check from "@/mk/components/forms/Check/Check";
import RenderView from "./RenderView";
import { getDateTimeStrMes, getDateTimeStrMesShort } from "@/mk/utils/date";
import style from "./Events.module.css";

const paramsInitial = {
  perPage: -1,
  page: 1,
  fullType: "L",
  searchBy: "",
};
const isHide = (data: {
  key: string;
  user?: Record<string, any>;
  item: Record<string, any>;
}) => {
  const level = data.user?.role.level;
  // const level = 3;
  if (data.key == "sublema_id") return level > 1;
  if (data.key == "lista_id") return level > 2;
  if (data.key == "dpto_id") return level > 4;
  if (data.key == "local_id") return level > 5;
  if (data.key == "barrio_id") return level > 6;
  return false;
};

const lDestinies = (data: {
  key: string;
  user?: Record<string, any>;
  item: Record<string, any>;
}) => {
  const r = [
    { id: 0, name: "Todos" },
    { id: -1, name: "Administradores" },
    { id: -2, name: "Afiliados" },
  ];
  const level = data.user?.role.level;
  // const level = 3;
  if (level <= 1) r.push({ id: 2, name: "Sublema" });
  if (level <= 2) r.push({ id: 3, name: "Lista" });
  if (level <= 4) r.push({ id: 4, name: "Departamento" });
  if (level <= 5) r.push({ id: 5, name: "Localidad" });
  if (level <= 6) r.push({ id: 6, name: "Barrio" });

  return r;
};

const leftDestiny = (data: {
  key: string;
  user?: Record<string, any>;
  item: Record<string, any>;
}) => {
  return (
    <ItemList
      title={getFullName(data.user)}
      subtitle={data.item?.user?.role?.name || "--"}
      variant="V1"
      left={
        <Avatar
          name={getFullName(data.user)}
          src={getUrlImages(
            "/ADM-" + data.user?.id + ".png?" + data.user?.updated_at
          )}
        />
      }
    />
  );
};

const rigthAvatar = (data: {
  key: string;
  user?: Record<string, any>;
  item: Record<string, any>;
}) => {
  if (!data.item.ext) return null;
  return (
    <img
      src={getUrlImages(
        "/EVENT-" +
          data.item.id +
          "." +
          data.item.ext +
          "?" +
          data.item.updated_at
      )}
      alt={data.item.name}
      width={100}
      height={100}
    />
  );
};

const Events = () => {
  const { user } = useAuth();
  const mod: ModCrudType = {
    modulo: "events",
    singular: "Evento",
    plural: "Eventos",
    permiso: "",
    extraData: true,
    renderView: (props: {
      open: boolean;
      onClose: any;
      item: Record<string, any>;
      onConfirm?: Function;
    }) => <RenderView {...props} />,
    loadView: { fullType: "DET" },
  };

  const fields = useMemo(
    () => ({
      id: { rules: [], api: "e" },
      destiny: {
        rules: ["required"],
        api: "ae",
        label: "Destino",
        list: { width: 120 },
        form: { type: "select", options: lDestinies, onLeft: leftDestiny },
      },
      sublema_id: {
        rules: ["required"],
        api: "ae",
        label: "Sublema",
        hide: isHide,
        list: false,
        form: {
          type: "select",
          optionsExtra: "sublemas",
          precarga: user.datos?.sublema_id,
        },
      },
      lista_id: {
        rules: ["required"],
        api: "ae",
        label: "Lista",
        hide: isHide,
        list: false,
        form: {
          type: "select",
          optionsExtra: "listas",
          precarga: user.datos?.lista_id,
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
      location: {
        rules: ["required"],
        api: "ae",
        label: "Link de ubicación",
        list: false,
        form: {
          type: "text",
          label:
            "Link de ubicación: (por ejemplo: https://www.google.com/maps/place/...)",
        },
      },
      avatar: {
        rules: ["requiredFile"],
        api: "ae",
        label: "Suba una Imagen",
        list: false,
        form: {
          type: "imageUpload",
          onRigth: rigthAvatar,
          style: { width: "100%" },
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
    if (name == "destiny") {
      selDestinies = null;
      if (value == 2) selDestinies = extraData.sublemas;
      if (value == 3) selDestinies = extraData.listas;
      if (value == 4) selDestinies = extraData.dptos;
      if (value == 5) selDestinies = extraData.locals;
      if (value == 6) selDestinies = extraData.barrios;
      if (selDestinies)
        setShowExtraModal(
          <ModalDestiny
            item={{ ...item, destiny: value, lDestiny: [] }}
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
    useEffect(() => {
      setSel(item?.lDestiny || []);
    }, [item]);
    return (
      <DataModal
        title="Destino"
        open={openDestiny}
        onClose={() => {
          setOpenDestiny(false);
          setShowExtraModal(null);
        }}
        onSave={() => {
          setItem({ ...item, lDestiny: sel });
          setShowExtraModal(null);
        }}
      >
        {selDestinies.map((d: any, i: number) => (
          <Check
            key={"check" + i}
            name={"destiny_" + d.id}
            label={d.name}
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
  } = useCrud({
    paramsInitial,
    mod,
    fields,
    _onChange,
  });
  const { onLongPress, selItem } = useCrudUtils({
    onSearch,
    searchs,
    setStore,
    mod,
    onEdit,
    onDel,
    title: "Comunicación",
  });

  const renderItem = (
    item: Record<string, any>,
    i: number,
    onClick: Function
  ) => {
    return (
      <RenderItem item={item} onClick={onClick} onLongPress={onLongPress}>
        <div className={style["cardEventContainer"]}>
          <div>
            <img
              style={{ width: 156, height: 156, borderRadius: 8 }}
              src={getUrlImages(
                "/EVENT-" + item?.id + "." + item?.ext + "?" + item?.updated_at
              )}
            />
          </div>
          <div>
            <div className="tTitle">{item?.name}</div>
            <div className="tSubtitle">{item?.description}</div>
            <div>{item?.assists} asistiran</div>
          </div>
        </div>
      </RenderItem>
    );
  };

  if (!userCan(mod.permiso, "R")) return <NotAccess />;
  return (
    <div className={styles.style}>
      <List onTabletRow={renderItem} />
    </div>
  );
};

export default Events;
