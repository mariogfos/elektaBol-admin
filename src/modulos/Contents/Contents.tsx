/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import useCrud, { ModCrudType } from "@/mk/hooks/useCrud/useCrud";
import NotAccess from "@/components/auth/NotAccess/NotAccess";
import styles from "./Contents.module.css";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import useCrudUtils from "../shared/useCrudUtils";
import { useEffect, useMemo, useState } from "react";
import RenderItem from "../shared/RenderItem";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import {
  IconDocs,
  IconDownload,
  IconImage,
  IconYoutube,
} from "@/components/layout/icons/IconsBiblioteca";
import { useAuth } from "@/mk/contexts/AuthProvider";
import DataModal from "@/mk/components/ui/DataModal/DataModal";
import Check from "@/mk/components/forms/Check/Check";
import RenderView from "./RenderView";
import { getDateTimeStrMesShort } from "@/mk/utils/date";

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

const isType = (data: {
  key: string;
  user?: Record<string, any>;
  item: Record<string, any>;
}) => {
  console.log("isType", data);

  if (data.key == "url" && data.item.type == "V") return false;
  if (data.key == "avatar" && data.item.type == "I") return false;
  if (data.key == "file" && data.item.type == "D") return false;
  return true;
};

const lType = [
  { id: "I", name: "Imagen", ext: "png,jpg,jpeg,svg" },
  { id: "V", name: "Video", ext: "mp4" },
  { id: "D", name: "Documento", ext: "pdf,doc,docx" },
];

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
  if (!data.item.url) return null;
  return (
    <img
      src={getUrlImages(
        "/CONT-" +
          data.item.id +
          "." +
          data.item.url +
          "?" +
          data.item.updated_at
      )}
      alt={data.item.name}
      width={100}
      height={100}
    />
  );
};

const rigthFile = (data: {
  key: string;
  user?: Record<string, any>;
  item: Record<string, any>;
}) => {
  // return JSON.stringify(data.item);
  if (!data.item.url) return null;
  return (
    <IconDownload
      size={40}
      color={"white"}
      onClick={() => {
        window.open(
          getUrlImages(
            "/CONT-" +
              data.item.id +
              "." +
              data.item.url +
              "?" +
              data.item.updated_at
          ),
          "_blank"
        );
      }}
    />
  );
};

const Contents = () => {
  const { user } = useAuth();
  const mod: ModCrudType = {
    modulo: "contents",
    singular: "Contenido multimedia",
    plural: "Contenidos multimedia",
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
        list: { width: "180px" },
        form: { type: "select", options: lDestinies, onLeft: leftDestiny },
      },
      // sublema_id: {
      //   rules: ["required"],
      //   api: "ae",
      //   label: "Sublema",
      //   hide: isHide,
      //   list: false,
      //   form: {
      //     type: "select",
      //     optionsExtra: "sublemas",
      //     precarga: user.datos?.sublema_id,
      //   },
      // },
      // lista_id: {
      //   rules: ["required"],
      //   api: "ae",
      //   label: "Lista",
      //   hide: isHide,
      //   list: false,
      //   form: {
      //     type: "select",
      //     optionsExtra: "listas",
      //     precarga: user.datos?.lista_id,
      //   },
      // },
      type: {
        rules: ["required"],
        api: "ae",
        label: "Tipo",
        list: { width: "200px" },
        form: { type: "select", options: lType, precarga: "I" },
      },
      description: {
        rules: ["required"],
        api: "ae",
        label: "Que deseas publicar hoy?",
        list: true,
        form: { type: "textArea", lines: 5 },
      },
      url: {
        rules: ["requiredIf:type,V"],
        api: "a*e*",
        label: "Link del video",
        list: false,
        hide: isType,
        form: { type: "text" },
      },
      avatar: {
        rules: ["requiredFileIf:type,I"],
        api: "a*e*",
        label: "Suba una Imagen",
        list: false,
        hide: isType,
        form: {
          type: "imageUpload",
          onRigth: rigthAvatar,
          style: { width: "100%" },
        },
      },
      file: {
        rules: ["requiredFileIf:type,D"],
        api: "a*e*",
        label: "Suba un Documento",
        list: false,
        hide: isType,
        form: {
          type: "fileUpload",
          onRigth: rigthFile,
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
    let icon = <IconImage size={48} circle color="var(--cWhite)" />;
    if (item.type == "D")
      icon = <IconDocs size={48} circle color="var(--cWhite)" />;
    if (item.type == "V")
      icon = <IconYoutube size={48} circle color="var(--cWhite" />;

    return (
      <RenderItem item={item} onClick={onClick} onLongPress={onLongPress}>
        <ItemList
          title={item?.description.substring(0, 80) + "..."}
          subtitle={
            "Creado por: " +
            getFullName(item.user) +
            ", en Fecha: " +
            getDateTimeStrMesShort(item.created_at)
          }
          variant="V1"
          active={selItem && selItem.id == item.id}
          left={icon}
        />
      </RenderItem>
    );
  };

  if (!userCan(mod.permiso, "R")) return <NotAccess />;
  return (
    <div className={styles.style}>
      <List onTabletRow={renderItem} actionsWidth="140px" />
    </div>
  );
};

export default Contents;
