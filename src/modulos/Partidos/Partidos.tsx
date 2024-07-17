/* eslint-disable react-hooks/exhaustive-deps */
import useCrud, { ModCrudType } from "@/mk/hooks/useCrud/useCrud";
import NotAccess from "@/components/auth/NotAccess/NotAccess";
import styles from "./Partidos.module.css";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import useCrudUtils from "../shared/useCrudUtils";
import { useMemo } from "react";
import RenderItem from "../shared/RenderItem";
import { formatNumber } from "@/mk/utils/numbers";
import { getUrlImages } from "@/mk/utils/string";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";

const mod: ModCrudType = {
  modulo: "partidos",
  singular: "partido",
  plural: "partidos",
  permiso: "",
};

const paramsInitial = {
  perPage: -1,
  page: 1,
  fullType: "L",
  searchBy: "",
};

const Partidos = () => {
  const rigthAvatar = (data: {
    key: string;
    user?: Record<string, any>;
    item: Record<string, any>;
  }) => {
    if (!data.item.ext) return null;
    return (
      <img
        src={getUrlImages(
          "/PAR-" + data.item.id + ".png" + "?" + data.item.updated_at
        )}
        alt={data.item.name}
        width={100}
        height={100}
      />
    );
  };

  const fields = useMemo(() => {
    return {
      id: { rules: [], api: "e" },
      name: {
        rules: ["required"],
        api: "ae",
        label: "Partido",
        list: true,
        form: { type: "text" },
      },
      description: {
        rules: [],
        api: "ae",
        label: "Description",
        form: { type: "textarea", lines: 5 },
      },
      color: {
        rules: [],
        api: "ae",
        label: "Color Distintivo",
        onRender: (item: any) => (
          <span style={{ color: item.value }}>{item.value}</span>
        ),
        list: { width: "250px", label: "Color" },
        form: { type: "text", precarga: "#FFFFFF" },
      },
      avatar: {
        rules: ["requiredFile"],
        api: "ae",
        label: "Suba una Imagen",
        list: {
          width: "200px",
          style: { textAlign: "center" },
          label: "Imagen",
          onRender: (item: any) => (
            <Avatar
              src={getUrlImages(
                "/PAR-" + item.item.id + ".png" + "?" + item.updated_at
              )}
              name={item.item.name}
            />
          ),
        },
        form: {
          type: "imageUpload",
          onRigth: rigthAvatar,
          style: { width: "100%" },
        },
      },
    };
  }, []);

  const { userCan, List, setStore, onSearch, searchs, onEdit, onDel } = useCrud(
    {
      paramsInitial,
      mod,
      fields,
    }
  );
  const { onLongPress, selItem } = useCrudUtils({
    onSearch,
    searchs,
    setStore,
    mod,
    onEdit,
    onDel,
  });

  const renderItem = (
    item: Record<string, any>,
    i: number,
    onClick: Function
  ) => {
    return (
      <RenderItem item={item} onClick={onClick} onLongPress={onLongPress}>
        <ItemList
          title={item?.name}
          subtitle={"Color: " + item?.color}
          left={rigthAvatar({ key: "avatar", item })}
          variant="V1"
          active={selItem && selItem.id == item.id}
        />
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

export default Partidos;
