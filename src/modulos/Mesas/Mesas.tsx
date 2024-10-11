/* eslint-disable react-hooks/exhaustive-deps */
import useCrud, { ModCrudType } from "@/mk/hooks/useCrud/useCrud";
import NotAccess from "@/components/auth/NotAccess/NotAccess";
import styles from "./Mesas.module.css";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import useCrudUtils from "../shared/useCrudUtils";
import { useEffect, useMemo, useState } from "react";
import RenderItem from "../shared/RenderItem";
import { formatNumber } from "@/mk/utils/numbers";
import ImportDataModal from "../shared/ImportDataModal";

const mod: ModCrudType = {
  modulo: "mesas",
  singular: "mesa",
  plural: "mesas",
  permiso: "",
  import: true,
  extraData: true,
};

const paramsInitial = {
  perPage: 100,
  page: 1,
  fullType: "L",
  searchBy: "",
};

const Mesas = () => {
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
        list: { width: "250px" },
        form: { type: "select", optionsExtra: "dptos" },
      },
      prov_id: {
        rules: ["required"],
        api: "ae",
        label: "Provincia",
        form: { type: "select", optionsExtra: "provs" },
      },
      circun_id: {
        rules: ["required"],
        api: "ae",
        label: "Circunscripción",
        list: {
          width: "150px",
          label: "Circuns.",
          style: { textAlign: "right" },
        },
        form: { type: "select", optionsExtra: "circuns" },
      },
      mun_id: {
        rules: ["required"],
        api: "ae",
        label: "Municipio",
        form: { type: "select", optionsExtra: "muns" },
      },
      local_id: {
        rules: ["required"],
        api: "ae",
        label: "Localidad",
        form: { type: "select", optionsExtra: "locals" },
      },
      recinto_id: {
        rules: ["required"],
        api: "ae",
        label: "Recinto",
        list: { width: "450px" },
        form: { type: "select", optionsExtra: "recintos" },
      },
      name: {
        rules: ["required"],
        api: "ae",
        label: "Mesa",
        list: true,
        form: { type: "text" },
      },
      code: {
        rules: ["max:5", "noSpaces"],
        api: "ae",
        label: "Cód",
        list: { width: "200px", style: { textAlign: "right" } },
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
    showToast,
    execute,
    reLoad,
    getExtraData,
  } = useCrud({
    paramsInitial,
    mod,
    fields,
    _onImport: onImport,
  });
  const { onLongPress, selItem, searchState, setSearchState } = useCrudUtils({
    onSearch,
    searchs,
    setStore,
    mod,
    onEdit,
    onDel,
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
        <ItemList
          title={item?.name}
          subtitle={
            "Cod:" + item?.code + " - Habilitados: " + item?.habilitados
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

export default Mesas;
