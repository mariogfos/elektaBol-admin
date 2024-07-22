/* eslint-disable react-hooks/exhaustive-deps */
import useCrud, { ModCrudType } from "@/mk/hooks/useCrud/useCrud";
import NotAccess from "@/components/auth/NotAccess/NotAccess";
import styles from "./Circuns.module.css";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import useCrudUtils from "../shared/useCrudUtils";
import { useMemo } from "react";
import RenderItem from "../shared/RenderItem";
import { formatNumber } from "@/mk/utils/numbers";

const mod: ModCrudType = {
  modulo: "circuns",
  singular: "circunscripción",
  plural: "circunscripciones",
  permiso: "",
  extraData: true,
};

const paramsInitial = {
  perPage: -1,
  page: 1,
  fullType: "L",
  searchBy: "",
};

const Circuns = () => {
  const fields = useMemo(() => {
    return {
      id: { rules: [], api: "e" },
      country_id: {
        rules: ["required"],
        api: "ae",
        label: "País",
        // list: true,
        form: { type: "select", optionsExtra: "countries" },
      },
      mun_id: {
        rules: ["required"],
        api: "ae",
        label: "Municipio",
        list: true,
        form: { type: "select", optionsExtra: "muns" },
      },
      dpto_id: {
        rules: ["required"],
        api: "ae",
        label: "Dpto",
        list: { width: "250px" },
        form: { type: "select", optionsExtra: "dptos" },
      },
      name: {
        rules: ["required"],
        api: "ae",
        label: "Circunscripción",
        list: true,
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

export default Circuns;
