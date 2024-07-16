/* eslint-disable react-hooks/exhaustive-deps */
import useCrud, { ModCrudType } from "@/mk/hooks/useCrud/useCrud";
import NotAccess from "@/components/auth/NotAccess/NotAccess";
import styles from "./Countries.module.css";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import useCrudUtils from "../shared/useCrudUtils";
import { useMemo } from "react";
import RenderItem from "../shared/RenderItem";
import { formatNumber } from "@/mk/utils/numbers";
import { IconStarProfile } from "@/components/layout/icons/IconsBiblioteca";

const mod: ModCrudType = {
  modulo: "countries",
  singular: "País",
  plural: "Países",
  permiso: "",
  import: false,
};

const paramsInitial = {
  perPage: -1,
  page: 1,
  fullType: "L",
  searchBy: "",
};

const Countries = () => {
  const fields = useMemo(() => {
    return {
      id: { rules: [], api: "e" },
      name: {
        rules: ["required"],
        api: "ae",
        label: "País",
        list: true,
        form: { type: "text" },
      },

      code: {
        rules: ["max:5", "noSpaces"],
        api: "ae",
        label: "Cód",
        list: { width: "120px", style: { textAlign: "right" } },
        form: { type: "text" },
      },
      habitantes: {
        rules: ["positive"],
        api: "ae",
        label: "Habitantes",
        list: {
          width: "400px",
          style: { textAlign: "right" },
          onRender: (item: any) => formatNumber(item.value, 0),
        },

        form: { type: "text" },
      },
      habilitados: {
        rules: ["positive"],
        api: "ae",
        label: "Habilitados",
        list: {
          width: "400px",
          style: { textAlign: "right" },
          onRender: (item: any) => formatNumber(item.value, 0),
        },
        form: { type: "text" },
      },
      escanos: {
        rules: ["positive"],
        api: "ae",
        label: "Escaños asignados",
        form: { type: "text" },
      },
    };
  }, []);

  const MenuFilter = () => {
    return (
      <div style={{ paddingTop: "12px" }}>
        <IconStarProfile onClick={actDatos} />
      </div>
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
    showToast,
    execute,
    reLoad,
  } = useCrud({
    paramsInitial,
    mod,
    fields,
    menuFilter: <MenuFilter />,
  });
  const { onLongPress, selItem } = useCrudUtils({
    onSearch,
    searchs,
    setStore,
    mod,
    onEdit,
    onDel,
  });

  const actDatos = async () => {
    const { data, error } = await execute("actdatos", "POST", {
      type: mod.modulo,
    });
    if (data.success) {
      showToast("Datos actualizados", "success");
      reLoad();
    } else {
      showToast("Error al actualizar datos", "error");
    }
  };

  const renderItem = (
    item: Record<string, any>,
    i: number,
    onClick: Function
  ) => {
    return (
      <RenderItem item={item} onClick={onClick} onLongPress={onLongPress}>
        <ItemList
          title={item?.name}
          subtitle={
            "Habitantes: " +
            (item?.habitantes +
              " - Habilitados: " +
              item?.habilitados +
              " - Escaños: " +
              item?.escanos)
          }
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

export default Countries;
