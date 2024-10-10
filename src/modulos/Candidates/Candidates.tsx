/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./Candidates.module.css";
import RenderItem from "../shared/RenderItem";
import useCrudUtils from "../shared/useCrudUtils";
import { useEffect, useMemo, useState } from "react";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import NotAccess from "@/components/layout/NotAccess/NotAccess";
import useCrud, { ModCrudType } from "@/mk/hooks/useCrud/useCrud";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import { getDateStrMes } from "../../mk/utils/date";
import RenderView from "./RenderView";

const mod: ModCrudType = {
  modulo: "candidates",
  singular: "candidato",
  plural: "candidatos",
  permiso: "",
  // import: true,
  renderView: (props: {
    open: boolean;
    onClose: any;
    item: Record<string, any>;
    onConfirm?: Function;
    extraData?: Record<string, any>;
  }) => <RenderView {...props} />,
  extraData: true,
};

const paramsInitial = {
  perPage: -1,
  page: 1,
  fullType: "L",
  searchBy: "",
};

const Candidates = () => {
  const OnTop = ({ title, subtitle }: any) => {
    return (
      <div>
        <p className={styles.title}>{title}</p>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    );
  };
  const rigth = (data: {
    key: string;
    user?: Record<string, any>;
    item: Record<string, any>;
  }) => {
    if (!data.item.id) return null;
    let pff =
      data.key == "avatar"
        ? "/CAND-"
        : data.key == "portada"
        ? "/PCAND-"
        : "/PLAN-";
    return data.key != "plan" ? (
      <img
        src={getUrlImages(
          pff + data.item.id + ".webp?d=" + data.item.updated_at
        )}
        alt={data.item.name}
        width={100}
        height={100}
      />
    ) : (
      <iframe
        src={getUrlImages(
          pff + data.item.id + ".pdf?d=" + data.item.updated_at
        )}
        width="100%"
        height="100%"
        title={data.item.name}
      ></iframe>
    );
  };
  // const rigthPortada = (data: {
  //   key: string;
  //   user?: Record<string, any>;
  //   item: Record<string, any>;
  // }) => {
  //   if (!data.item.id) return null;
  //   console.log(data.key);
  //   return (
  //     <img
  //       src={getUrlImages(
  //         "/PCAND-" + data.item.id + ".webp?d=" + data.item.updated_at
  //       )}
  //       alt={data.item.name}
  //       width={100}
  //       height={100}
  //     />
  //   );
  // };
  // const rigthPlan = (data: {
  //   key: string;
  //   user?: Record<string, any>;
  //   item: Record<string, any>;
  // }) => {
  //   if (!data.item.id) return null;
  //   return (
  //     <img
  //       src={getUrlImages(
  //         "/PLAN-" + data.item.id + ".webp?d=" + data.item.updated_at
  //       )}
  //       alt={data.item.name}
  //       width={100}
  //       height={100}
  //     />
  //   );
  // };

  const fields = useMemo(() => {
    return {
      id: { rules: [], api: "e" },
      avatar: {
        rules: ["required*add"],
        api: "a*e*",
        label: "Suba una imagen",
        list: false,
        form: {
          type: "imageUpload",
          onRigth: rigth,
          onTop: () => {
            return (
              <OnTop
                title="Perfil"
                subtitle="Agrega una foto de perfil para el candidato"
              />
            );
          },
          style: { width: "100%" },
        },
      },
      portada: {
        rules: ["required*add"],
        api: "a*e*",
        label: "Suba una imagen",
        list: false,
        form: {
          type: "imageUpload",
          onRigth: rigth,
          onTop: () => {
            return (
              <OnTop
                title="Portada"
                subtitle="Agrega una foto de portada para el candidato"
              />
            );
          },
          style: { width: "100%" },
        },
      },
      title: {
        rules: ["required"],
        api: "ae",
        label: "Presentación",
        form: {
          type: "text",
          onTop: () => {
            return (
              <OnTop
                title="Presentación"
                subtitle="Redacta una breve presentación del candidato/ Ej: Candidato a presidente de la república de “País”"
              />
            );
          },
        },
        list: false,
      },
      fullName: {
        // rules: ["required"],
        api: "ae",
        label: "Nombre del candidato",
        form: false,
        onRender: (item: any) => {
          return getFullName(item?.item);
        },
        list: true,
      },
      name: {
        rules: ["required"],
        api: "ae",
        label: "Primer nombre",
        form: {
          type: "text",
          onTop: () => {
            return (
              <OnTop
                title="Información personal"
                subtitle="Introduce los datos personales para generar mayor confianza a sus seguidores"
              />
            );
          },
        },
        list: false,
      },
      middle_name: {
        rules: [""],
        api: "ae",
        label: "Segundo nombre",
        form: { type: "text" },
        list: false,
      },
      last_name: {
        rules: ["required"],
        api: "ae",
        label: "Apellido paterno",
        form: { type: "text" },
        list: false,
      },
      mother_last_name: {
        rules: [""],
        api: "ae",
        label: "Apellido materno",
        form: { type: "text" },
        list: false,
      },
      typecand_id: {
        rules: ["required"],
        api: "ae",
        label: "Tipo de candidato",
        form: {
          type: "select",
          optionsExtra: "typeCands",
        },
        list: false,
      },
      profession: {
        rules: ["required"],
        api: "ae",
        label: "Profesión",
        form: { type: "text" },
        list: true,
      },
      born: {
        rules: ["required"],
        api: "ae",
        label: "Lugar de nacimiento",
        form: { type: "text" },
        list: false,
      },
      biography: {
        rules: ["required"],
        api: "ae",
        label: "Biografía",
        form: {
          type: "textArea",
          onTop: () => {
            return (
              <OnTop
                title="Biografía"
                subtitle="Escribe un poco de la historia del candidato para que sus seguidores lo conozcan mejor"
              />
            );
          },
        },
        list: false,
      },
      experience: {
        rules: ["required"],
        api: "ae",
        label: "Experiencia política",
        form: {
          type: "textArea",
          onTop: () => {
            return (
              <OnTop
                title="Experiencia política"
                subtitle="Comparte la trayectoria del candidato para demostrar que es el candidato ideal"
              />
            );
          },
        },
        list: false,
      },
      plan: {
        rules: ["required"],
        api: "ae",
        label: "Plan de gobierno",
        form: {
          type: "fileUpload",
          onRigth: rigth,
          onTop: () => {
            return (
              <OnTop
                title="Plan de gobierno"
                subtitle="Describe las soluciones y proyectos que empleará el candidato para atraer a sus seguidores"
              />
            );
          },
          style: { width: "100%" },
        },
        list: false,
      },
      // status: {
      //   rules: ["required"],
      //   api: "ae",
      //   label: "Status",
      //   form: { type: "text" },
      //   list: true,
      // },
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
          subtitle={item?.description}
          variant="V1"
          active={selItem && selItem.id == item.id}
        />
      </RenderItem>
    );
  };

  if (!userCan(mod.permiso, "R")) return <NotAccess />;
  return (
    <div className={styles.candidates}>
      <List onTabletRow={renderItem} />
    </div>
  );
};

export default Candidates;
