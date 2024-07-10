/* eslint-disable react-hooks/exhaustive-deps */
import useCrud, { ModCrudType } from "@/mk/hooks/useCrud/useCrud";
import NotAccess from "@/components/auth/NotAccess/NotAccess";
import styles from "./Surveys.module.css";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import useCrudUtils from "../shared/useCrudUtils";
import { memo, useEffect, useMemo, useState } from "react";
import RenderItem from "../shared/RenderItem";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import Input from "@/mk/components/forms/Input/Input";
import Button from "@/mk/components/forms/Button/Button";
import { IconTrash } from "@/components/layout/icons/IconsBiblioteca";
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

const Roptions = (props: any) => {
  const { item, field, error, setItem } = props;
  useEffect(() => {
    setItem({ ...item, options: item.options || [{ id: -1, name: "" }] });
  }, []);
  const onChange = (e: any) => {
    const { name, value } = e.target;
    const [key, index] = name.split(".");
    const opt: any = item.options;
    opt[index].name = value;
    setItem({ ...item, options: opt });
  };
  const onDelOption = (index: number) => {
    const opt: any = item.options;
    opt.splice(index, 1);
    setItem({ ...item, options: opt });
  };
  return (
    <>
      Opciones:{" "}
      {error?.options && (
        <span style={{ color: "var(--cError)" }}>{error.options}</span>
      )}
      <br />
      {item?.options?.map((o: any, i: number) => (
        <div key={i} className={styles.option}>
          <Input
            type="text"
            name={"options." + i}
            value={o.name || ""}
            onChange={onChange}
            label={"opcion " + (i + 1)}
            disabled={field.disabled}
            onBlur={field.onBlur}
            error={error}
            onFocus={field.onFocus}
            iconLeft={field.iconLeft}
            iconRight={
              i == 0 ? null : (
                <IconTrash
                  color="red"
                  onClick={() => {
                    onDelOption(i);
                  }}
                />
              )
            }
            placeholder={field.placeholder}
            className={field.className}
            style={field.style}
            readOnly={field.readOnly}
            required={field.required}
          />
        </div>
      ))}
      <Button
        variant="terciary"
        onClick={() => {
          const opt: any = item.options;
          opt.push({ id: (item.options.length + 1) * -1, name: "" });
          setItem({ ...item, options: opt });
        }}
      >
        + Añadir opción
      </Button>
    </>
  );
};

const Surveys = () => {
  const { user } = useAuth();
  const mod: ModCrudType = {
    modulo: "surveys",
    singular: "encuesta",
    plural: "encuestas",
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

  const renderOptions = (data: {
    item: any;
    field: any;
    onChange: any;
    error: any;
    setItem: any;
  }) => {
    const { item, field, onChange, error, setItem } = data;

    if (!item.options) {
      if (
        item.squestions &&
        item.squestions[0] &&
        item.squestions[0].soptions
      ) {
        item.options = item.squestions[0].soptions.map((o: any) => ({
          id: o.id,
          name: o.name,
        }));
      }
    }
    return (
      <>
        <Roptions
          item={item}
          field={field}
          onChange={onChange}
          error={error}
          setItem={setItem}
        />
      </>
    );
  };

  const prepareData = (
    data: any,
    head: any,
    key: string,
    setFormStateForm: Function
  ) => {
    let d = { ...data };
    // console.log("prepareData", head, data, key);

    if (data.id && key == "nresp" && !data.nresp) {
      d = { ...data, nresp: data?.squestions[0].min };
      setFormStateForm((form: any) => {
        return { ...form, nresp: data?.squestions[0].min };
      });
    }
    return d;
  };
  const fields = useMemo(
    () => ({
      id: { rules: [], api: "e" },
      sublema_id: {
        rules: ["required"],
        api: "ae",
        label: "Sublema",
        hide: isHide,
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
        form: {
          type: "select",
          optionsExtra: "listas",
          precarga: user.datos?.lista_id,
        },
      },
      destiny: {
        rules: ["required"],
        api: "ae",
        label: "Destino",
        list: { width: 120 },
        form: { type: "select", options: lDestinies, onLeft: leftDestiny },
      },
      name: {
        rules: ["required"],
        api: "ae",
        label: "Pregunta",
        list: true,
        form: { type: "text" },
      },
      days: {
        rules: ["required*edit", "number"],
        api: "ae",
        label: "Días Prog.",
        list: { width: 90, label: "Días" },
        form: { type: "text" },
      },
      nresp: {
        rules: ["required", "number"],
        api: "ae",
        label: "Nro. Respuestas",
        list: false,
        form: { type: "text", prepareData: prepareData },
      },
      options: {
        rules: ["optionSurvey"],
        api: "ae",
        label: "Opciones",
        list: false,
        form: { type: "render", onRender: renderOptions },
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
        <ItemList
          title={item?.name}
          subtitle={
            "Creado por: " +
            getFullName(item.user) +
            ", en Fecha: " +
            getDateTimeStrMesShort(item.created_at)
          }
          variant="V1"
          left={
            <Avatar
              name={getFullName(item.user)}
              src={getUrlImages(
                "/ADM-" + item.id + "." + item.ext + "?" + item.updated_at
              )}
            />
          }
          active={selItem && selItem.id == item.id}
        />
      </RenderItem>
    );
  };

  if (!userCan(mod.permiso, "R")) return <NotAccess />;
  return (
    <div className={styles.style}>
      <List onTabletRow={renderItem} actionsWidth="300px" />
    </div>
  );
};

export default Surveys;
