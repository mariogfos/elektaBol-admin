/* eslint-disable react-hooks/exhaustive-deps */
import useCrud, { ModCrudType } from "@/mk/hooks/useCrud/useCrud";
import NotAccess from "@/components/auth/NotAccess/NotAccess";
import styles from "./Uvs.module.css";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import useCrudUtils from "../shared/useCrudUtils";
import { useMemo } from "react";
import RenderItem from "../shared/RenderItem";
import { formatNumber } from "@/mk/utils/numbers";
import { useAuth } from "@/mk/contexts/AuthProvider";

const mod: ModCrudType = {
  modulo: "uvs",
  singular: "Unidad vecinal",
  plural: "Unidades vecinales",
  permiso: "",
  extraData: true,
};

const paramsInitial = {
  perPage: -1,
  page: 1,
  fullType: "L",
  searchBy: "",
};

const Uvs = () => {
  const { user } = useAuth();
  const fields = useMemo(() => {
    return {
      id: { rules: [], api: "e" },
      country_id: {
        rules: ["required"],
        api: "ae",
        label: "País",
        form: { type: "select", optionsExtra: "countries" },
      },
      dpto_id: {
        rules: ["required"],
        api: "ae",
        label: "Departamento",
        form: {
          type: "select",
          optionsExtra: "dptos",
          precarga: user?.datos?.dpto_id,
        },
      },
      prov_id: {
        rules: ["required"],
        api: "ae",
        label: "Provincia",
        form: {
          type: "select",
          optionsExtra: "provs",
          precarga: user?.datos?.prov_id,
        },
      },
      // circun_id: {
      //   rules: ["required"],
      //   api: "ae",
      //   label: "Circunscripción",
      //   list: {
      //     width: "250px",
      //     label: "Circuns.",
      //     style: { textAlign: "right" },
      //   },
      //   form: { type: "select", optionsExtra: "circuns" },
      // },
      mun_id: {
        rules: ["required"],
        api: "ae",
        label: "Municipio",
        list: { width: "250px" },
        form: {
          type: "select",
          optionsExtra: "muns",
          precarga: user?.datos?.mun_id,
        },
      },
      dmun_id: {
        rules: ["required"],
        api: "ae",
        label: "Distrito municipal",
        list: { width: "250px" },
        form: {
          type: "select",
          optionsExtra: "dmuns",
          precarga: user?.datos?.dmun_id,
        },
      },
      local_id: {
        rules: ["required"],
        api: "ae",
        label: "Localidad",
        list: { width: "250px" },
        form: {
          type: "select",
          optionsExtra: "locals",
          precarga: user?.datos?.local_id,
        },
      },
      name: {
        rules: ["required"],
        api: "ae",
        label: "Unidad vecinal",
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
            (item?.habitantes + " - Habilitados: " + item?.habilitados)
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

export default Uvs;
