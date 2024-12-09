/* eslint-disable react-hooks/exhaustive-deps */
import useCrud, { ModCrudType } from "@/mk/hooks/useCrud/useCrud";
import NotAccess from "@/components/auth/NotAccess/NotAccess";
import styles from "./Rol.module.css";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import { RenderColType } from "@/mk/components/ui/Table/Table";
import useCrudUtils from "../shared/useCrudUtils";
import { useMemo } from "react";
import { useAuth } from "@/mk/contexts/AuthProvider";
import RenderItem from "../shared/RenderItem";

const lLevel = [
  "Fos",
  "Partido",
  "Departamento",
  "Macroregión",
  "Provincia",
  "Municipio",
  "Distrito municipal",
  "Localidad",
  "Unidad vecinal",
  "Barrio",
];

const mod: ModCrudType = {
  modulo: "roles",
  singular: "rol",
  plural: "roles",
  permiso: "",
  extraData: true,
};

const levelRender = (item: RenderColType) => {
  return lLevel[item.value];
  //Level ender
};

const arrayToSelect = (array: string[], level: number = 6) => {
  const arr: any = [];
  array.map((item, i) => {
    if (level <= i) arr.push({ id: i, name: item });
  });
  return arr;
};

const paramsInitial = {
  perPage: -1,
  page: 1,
  fullType: "L",
  searchBy: "",
};

const Roles = () => {
  const { user } = useAuth();

  const fields = useMemo(() => {
    return {
      id: { rules: [], api: "e" },
      description: {
        rules: ["required"],
        api: "ae",
        label: "Rol",
        list: true,
        form: { type: "text", label: "Nombre del rol" },
      },
      level: {
        rules: ["required", "numeric"],
        api: "ae",
        label: "Nivel",
        onRender: levelRender,
        list: { width: "20%" },
        form: {
          type: "select",
          order: 2,
          options: arrayToSelect(lLevel, user?.role?.level),
        },
      },
      name: {
        rules: ["required", "noSpaces"],
        api: "ae",
        label: "Código",
        list: { width: "20%" },
        form: { type: "text", order: 1, edit: {} },
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
          title={item?.description}
          subtitle={
            "Cod: " +
            item?.name +
            " - Nivel: " +
            levelRender({ value: item?.level })
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

export default Roles;
