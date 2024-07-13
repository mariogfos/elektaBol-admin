/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, Fragment, memo, useCallback } from "react";
import useAxios from "../useAxios";
import { getUrlImages } from "../../utils/string";
import { useAuth } from "../../contexts/AuthProvider";
import {
  ActionType,
  checkRulesFields,
  getParamFields,
  hasErrors,
} from "../../utils/validate/Rules";
import { logError } from "../../utils/logs";
import LoadingScreen from "../../components/ui/LoadingScreen/LoadingScreen";
import Table, { RenderColType } from "../../components/ui/Table/Table";
import DataModal from "../../components/ui/DataModal/DataModal";
import Button from "../../components/forms/Button/Button";
import Input from "../../components/forms/Input/Input";
import Select from "../../components/forms/Select/Select";
import useScreenSize from "../useScreenSize";
import styles from "./usecrud.module.css";
import FloatButton from "@/mk/components/forms/FloatButton/FloatButton";
import KeyValue from "@/mk/components/ui/KeyValue/KeyValue";
import {
  IconEdit,
  IconImport,
  IconTrash,
} from "@/components/layout/icons/IconsBiblioteca";
import TextArea from "@/mk/components/forms/TextArea/TextArea";
import { UploadFile } from "@/mk/components/forms/UploadFile/UploadFile";
import DataSearch from "@/mk/components/forms/DataSearch/DataSearch";

export type ModCrudType = {
  modulo: string;
  singular: string;
  plural: string;
  permiso: string;
  extraData?: boolean;
  renderView?: Function;
  loadView?: Record<string, any>;
  import?: boolean;
};

type PropsType = {
  paramsInitial: any;
  mod: any;
  fields: any;
  getSearch?: Function;
  getFilter?: Function;
  _onChange?: Function;
  _onImport?: Function;
  menuFilter?: any;
};

type PropsDetail = {
  open: boolean;
  onClose: () => void;
  item: any;
  i?: number;
  onConfirm?: Function;
};

type UseCrudType = {
  user: any;
  showToast: Function;
  onAdd: Function;
  onDel: Function;
  onEdit: Function;
  onView: Function;
  onImport: Function;
  onExist: Function;
  onExportItem: Function;
  onExport: Function;
  onCloseCrud: Function;
  onCloseView: Function;
  onCloseDel: Function;
  onSave: Function;
  onSearch: Function;
  onFilter: Function;
  onChangePage: Function;
  onChangePerPage: Function;
  getTotalPages: Function;
  onChange: Function;
  open: boolean;
  setOpen: Function;
  openView: boolean;
  setOpenView: Function;
  openDel: boolean;
  setOpenDel: Function;
  formState: any;
  setFormState: Function;
  errors: any;
  setErrors: Function;
  params: any;
  setParams: Function;
  searchs: any;
  setSearchs: Function;
  data: any;
  reLoad: Function;
  execute: Function;
  userCan: Function;
  store: any;
  setStore: Function;
  List: React.FC<any>;
  extraData: any;
  findOptions: Function;
};

const useCrud = ({
  paramsInitial,
  mod,
  fields,
  getSearch,
  getFilter,
  _onChange,
  _onImport,
  menuFilter = null,
}: PropsType): UseCrudType => {
  const { user, showToast, userCan, store, setStore } = useAuth();
  const [formState, setFormState]: any = useState({});
  const [errors, setErrors]: any = useState({});

  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openDel, setOpenDel] = useState(false);

  const [params, setParams] = useState(paramsInitial);
  const [searchs, setSearchs]: any = useState({});
  const [action, setAction] = useState<ActionType>("add");

  const { data, reLoad, execute } = useAxios("/" + mod.modulo, "GET", params);

  const { isTablet } = useScreenSize();

  const onChange = useCallback((e: any) => {
    let value = e.target.value;
    if (_onChange) {
      if (_onChange(e, formState, setFormState)) return;
    }
    setFormState((old: any) => ({ ...old, [e.target.name]: value }));
  }, []);

  const initOpen = (
    setOpen: Function,
    data: Record<string, any> = {},
    action: ActionType = "add"
  ) => {
    setAction(action);
    if (action == "add") {
      let dataNew: any = {};
      for (const key in fields) {
        if (fields[key].form?.precarga) {
          dataNew[key] = fields[key].form?.precarga;
        }
      }
      setFormState(dataNew);
    } else {
      setFormState(data);
    }
    setErrors({});
    setOpen(true);
  };

  const onAdd = useCallback(() => {
    if (!userCan(mod.permiso, "C"))
      return showToast("No tiene permisos para crear", "error");
    initOpen(setOpen);
  }, []);

  const onDel = useCallback((item: Record<string, any>) => {
    if (!userCan(mod.permiso, "D"))
      return showToast("No tiene permisos para eliminar", "error");
    initOpen(setOpenDel, item, "del");
  }, []);

  const onEdit = useCallback((item: Record<string, any>) => {
    if (!userCan(mod.permiso, "U"))
      return showToast("No tiene permisos para editar", "error");
    initOpen(setOpen, item, "edit");
  }, []);

  const onView = useCallback(async (item: Record<string, any>) => {
    if (!userCan(mod.permiso, "R"))
      return showToast("No tiene permisos para visualizar", "error");
    if (mod.loadView) {
      const { data: view } = await execute("/" + mod.modulo, "GET", {
        page: 1,
        perPage: 1,
        fullType: "DET",
        searchBy: item.id,
        ...mod.loadView,
      });
      initOpen(setOpenView, view.data, "view");
      return;
    }
    initOpen(setOpenView, item, "view");
  }, []);

  const onImport = useCallback((e: any) => {
    // e.stopPropagation();
    if (!userCan(mod.permiso, "C"))
      return showToast("No tiene permisos para importar", "error");
    if (_onImport) {
      _onImport();
    }
  }, []);
  const onExist = useCallback(
    async ({ type = "", cols = "id", modulo = "", searchBy = "" }: any) => {
      if (modulo == "") modulo = mod.modulo;
      const { data: row } = await execute("/" + modulo, "GET", {
        type,
        searchBy,
        cols,
        perPage: -1,
        page: 1,
        _exist: 1,
      });
      return row?.success ? row.data : false;
    },
    []
  );

  const onCloseCrud = () => {
    setOpen(false);
  };
  const onCloseView = () => {
    setOpenView(false);
  };

  const onSave = async (data: Record<string, any>, _setErrors?: Function) => {
    if (!userCan(mod.permiso, action))
      return showToast("No tiene permisos para esta acción", "error");

    if (action != "del") {
      const errors = checkRulesFields(fields, data);
      if (_setErrors) {
        _setErrors(errors);
      } else {
        setErrors(errors);
      }
      if (hasErrors(errors)) return;
    }

    const url = "/" + mod.modulo + (data.id ? "/" + data.id : "");
    let method = "POST";
    if (data.id) {
      method = "PUT";
      if (action == "del") {
        method = "DELETE";
      }
    }

    const param = getParamFields(data, fields, action);

    const { data: response, error: err } = await execute(
      url,
      method,
      action == "del" ? { id: data.id } : param,
      false
    );
    if (response?.success) {
      onCloseCrud();
      setOpenDel(false);
      reLoad();
      showToast(response?.message, "success");
    } else {
      showToast(response?.message, "error");
      logError("Error onSave:", err);
    }
  };

  const [oldSearch, setOldSearch] = useState({});
  const onSearch = (_search: string) => {
    let searchBy = { searchBy: _search };
    if (getSearch) searchBy = getSearch(_search, oldSearch);
    setSearchs(searchBy);
    setParams({ ...params, ...searchBy });
    setOldSearch(searchBy);
  };
  const [oldFilter, setOldFilter] = useState({});
  const onFilter = (opt: string, value: string) => {
    let filterBy = {};
    if (getFilter) filterBy = getFilter(opt, value, oldFilter);
    setParams({ ...params, ...filterBy });
    setOldFilter(filterBy);
  };

  const onChangePage = (page: number) => {
    setParams({ ...params, page });
  };

  const onChangePerPage = (e: any) => {
    let perPage = e.target.value;
    if (params.perPage == perPage) return;
    if (!perPage) perPage = -1;
    setParams({ ...params, perPage });
  };

  const getTotalPages = () => {
    let total = 0;
    total = Math.ceil((data?.total || 1) / (params?.perPage || 1));
    return total;
  };

  const onCloseDel = () => {
    setOpenDel(false);
  };

  type ExportType = "pdf" | "xls" | "csv";
  const onExport = async (
    type: ExportType = "pdf",
    callBack: (url: string) => void = (url: string) => {}
  ) => {
    if (!userCan(mod.permiso, "R"))
      return showToast("No tiene permisos para visualizar", "error");
    const { data: file } = await execute("/" + mod.modulo, "GET", {
      ...params,
      _export: type,
      exportCols: mod?.exportCols || params.cols || "",
      exportTitulo: mod?.exportTitulo || "Listado de " + mod.plural,
      exportTitulos: mod?.exportTitulos || "",
      exportAnchos: mod?.exportAnchos || "",
    });
    if (file?.success) {
      callBack(getUrlImages("/" + file.data.path));
    } else {
      showToast(file?.message, "error Export");
      logError("Error onExport:", file);
    }
  };

  const onExportItem = (
    item: Record<string, any>,
    type: ExportType = "pdf"
  ) => {
    if (!userCan(mod.permiso, "R"))
      return showToast("No tiene permisos para visualizar", "error");
    initOpen(setOpenView, item, "export");
  };

  useEffect(() => {
    reLoad(params, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const [extraData, setExtraData]: any = useState({});
  const getExtraData = async () => {
    const { data: extraData } = await execute(
      "/" + mod.modulo,
      "GET",
      {
        perPage: -1,
        page: 1,
        fullType: "EXTRA",
      },
      false
    );
    setExtraData(extraData?.data);
  };
  useEffect(() => {
    if (mod.extraData) {
      getExtraData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Detail = memo(({ open, onClose, item, i }: PropsDetail) => {
    const getHeader = () => {
      const head: Object[] = [];
      for (const key in fields) {
        const field = fields[key];
        if (!field.label) continue;
        const col: any = {
          key,
          responsive: "onlyDesktop",
          label: field.label,
          onRender: _onRender(field),
          order: field.order || 1000,
        };
        head.push(col);
      }
      head.sort((a: any, b: any) => a.order - b.order);
      return head;
    };
    const [header, setHeader]: any = useState([]);
    useEffect(() => {
      setHeader(getHeader());
    }, [fields]);

    return (
      <DataModal
        open={open}
        onClose={() => onClose()}
        title={"Detalle de " + mod.singular}
        buttonText=""
        buttonCancel=""
      >
        <div className={""}>
          {header.map((col: any, index: number) => (
            <Fragment key={col.key + index}>
              {col.label && (
                <div>
                  <KeyValue
                    title={col.label}
                    value={
                      col.onRender
                        ? col.onRender({
                            value: item[col.key],
                            key: col.key,
                            item,
                            i,
                          })
                        : item[col.key]
                    }
                  />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </DataModal>
    );
  });
  Detail.displayName = "Detail";

  const LeftRigthElement = memo(
    ({
      children,
      field,
      item,
      error = {},
    }: {
      children: any;
      field: any;
      item: any;
      error: any;
    }) => {
      if (!field.onLeft && !field.onRigth && !field.onTop && !field.onBottom)
        return children;
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spM)",
          }}
        >
          {field.onTop && field.onTop({ item, key: field.key, user })}
          <div
            style={{
              display: "flex",
              gap: "var(--spM)",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {field.onLeft && field.onLeft({ item, key: field.key, user })}
            {children}
            {field.onRigth && field.onRigth({ item, key: field.key, user })}
          </div>
          {field.onBottom && field.onBottom({ item, key: field.key, user })}
        </div>
      );
    }
  );
  LeftRigthElement.displayName = "LeftRigthElement";
  const FormElement = memo(
    ({
      field,
      item,
      i,
      onChange,
      error,
      setError,
    }: {
      field: any;
      item: any;
      i?: number;
      onChange: (e: any) => void;
      error: any;
      setError: Function;
    }) => {
      const _field = { ...field, ...(field[action] ? field[action] : {}) };
      if (_field.hide && _field.hide({ item, user, key: _field.key }))
        return null;
      switch (_field.type) {
        case "text":
          return (
            <LeftRigthElement
              key={_field.key}
              field={_field}
              item={item}
              error={error}
            >
              <Input
                type="text"
                name={_field.key}
                value={item[_field.key]}
                onChange={onChange}
                label={_field.label}
                disabled={_field.disabled}
                onBlur={_field.onBlur}
                error={error}
                onFocus={_field.onFocus}
                iconLeft={_field.iconLeft}
                iconRight={_field.iconRight}
                placeholder={_field.placeholder}
                className={_field.className}
                style={_field.style}
                readOnly={_field.readOnly}
                required={_field.required}
              />
            </LeftRigthElement>
          );
        case "textArea":
        case "textarea":
          return (
            <LeftRigthElement
              key={_field.key}
              field={_field}
              item={item}
              error={error}
            >
              <TextArea
                name={_field.key}
                value={item[_field.key]}
                onChange={onChange}
                label={_field.label}
                disabled={_field.disabled}
                onBlur={_field.onBlur}
                error={error}
                onFocus={_field.onFocus}
                iconLeft={_field.iconLeft}
                iconRight={_field.iconRight}
                placeholder={_field.placeholder}
                className={_field.className}
                style={_field.style}
                readOnly={_field.readOnly}
                required={_field.required}
                lines={_field.lines}
              />
            </LeftRigthElement>
          );
        case "imageUpload":
          return (
            <LeftRigthElement
              key={_field.key}
              field={_field}
              item={item}
              error={error}
            >
              <UploadFile
                name={_field.key}
                value={item[_field.key]}
                onChange={onChange}
                label={_field.label}
                disabled={_field.disabled}
                onBlur={_field.onBlur}
                error={error}
                onFocus={_field.onFocus}
                iconLeft={_field.iconLeft}
                iconRight={_field.iconRight}
                placeholder={_field.placeholder}
                className={_field.className}
                style={_field.style}
                readOnly={_field.readOnly}
                required={_field.required}
                ext={_field.ext || ["jpg", "png", "jpeg"]}
                setError={setError}
                img={true}
              />
            </LeftRigthElement>
          );
        case "fileUpload":
          return (
            <LeftRigthElement
              key={_field.key}
              field={_field}
              item={item}
              error={error}
            >
              <UploadFile
                name={_field.key}
                value={item[_field.key]}
                onChange={onChange}
                label={_field.label}
                disabled={_field.disabled}
                onBlur={_field.onBlur}
                error={error}
                onFocus={_field.onFocus}
                iconLeft={_field.iconLeft}
                iconRight={_field.iconRight}
                placeholder={_field.placeholder}
                className={_field.className}
                style={_field.style}
                readOnly={_field.readOnly}
                required={_field.required}
                ext={_field.ext || ["pdf", "doc", "docx", "xls", "xlsx"]}
                setError={setError}
              />
            </LeftRigthElement>
          );
        case "select":
          const options =
            mod.extraData && _field.optionsExtra
              ? extraData[_field.optionsExtra]
              : _field.options;
          return (
            <LeftRigthElement
              key={_field.key}
              field={_field}
              item={item}
              error={error}
            >
              <Select
                name={_field.key}
                value={item[_field.key]}
                onChange={onChange}
                label={_field.label}
                disabled={_field.disabled}
                onBlur={_field.onBlur}
                error={error}
                onFocus={_field.onFocus}
                iconLeft={_field.iconLeft}
                iconRight={_field.iconRight}
                placeholder={_field.placeholder}
                className={_field.className}
                style={_field.style}
                readOnly={_field.readOnly}
                required={_field.required}
                options={options}
                optionLabel={_field.optionLabel}
                optionValue={_field.optionValue}
                multiSelect={_field.multiSelect}
                filter={_field.filter}
              />
            </LeftRigthElement>
          );
        default:
          return (
            <div>
              {_field.label}:{" "}
              {_field.onRender
                ? _field.onRender({
                    value: item[_field.key],
                    key: _field.key,
                    item,
                    i,
                  })
                : item[_field.key]}
            </div>
          );
      }
    }
  );
  FormElement.displayName = "FormElement";

  const Form = memo(({ open, onClose, item, i, onConfirm }: PropsDetail) => {
    const getHeader = () => {
      const head: Object[] = [];
      for (const key in fields) {
        const field = fields[key];
        if (!field.form) continue;
        // if (field.hide && field.hide({ item, user, key })) continue;
        const col: any = {
          ...field.form,
          key,
          onRender: field.form.onRender,
          label: field.form.label || field.label,
          order: field.form.order || field.order || 1000,
          prepareData: field.form.prepareData || field.prepareData || null,
          hide: field.form.hide || field.hide || null,
        };
        if (
          field.form.type == "select" &&
          field.form.options &&
          typeof field.form.options == "function"
        )
          col.options = field.form.options({ item, user, key });
        head.push(col);
      }
      head.sort((a: any, b: any) => a.order - b.order);
      return head;
    };

    const [formStateForm, setFormStateForm]: any = useState({});
    const [errorForm, setErrorForm] = useState({});
    const [header, setHeader]: any = useState([]);
    const [showExtraModal, setShowExtraModal] = useState(null);
    useEffect(() => {
      setHeader(getHeader());
    }, [fields]);

    useEffect(() => {
      let it = { ...item };
      setFormStateForm(it);
    }, [item]);

    const onChangeForm = useCallback(
      (e: any) => {
        let value = e.target.value;

        if (_onChange) {
          if (_onChange(e, formStateForm, setFormStateForm, setShowExtraModal))
            return;
        }
        if (item.onChange) {
          if (
            item.onChange(e, formStateForm, setFormStateForm, setShowExtraModal)
          )
            return;
        }
        setFormStateForm((old: any) => ({ ...old, [e.target.name]: value }));
      },
      [formStateForm]
    );
    return (
      <DataModal
        open={open}
        onClose={() => onClose()}
        title={(action == "add" ? "Nuevo " : "Editar ") + mod.singular}
        buttonText={action == "add" ? "Guardar" : "Actualizar"}
        onSave={(e) =>
          onConfirm
            ? onConfirm(formStateForm, setErrorForm)
            : onSave(formStateForm, setErrorForm)
        }
      >
        {header.map((field: any, index: number) => (
          <Fragment key={field.key + index}>
            {field.onRender ? (
              field.onRender({
                field,
                item: field.prepareData
                  ? field.prepareData(
                      formStateForm,
                      field,
                      field.key,
                      setFormStateForm
                    )
                  : formStateForm,
                onChange: onChangeForm,
                error: errorForm,
                setItem: setFormStateForm,
              })
            ) : (
              <FormElement
                field={field}
                item={
                  field.prepareData
                    ? field.prepareData(
                        formStateForm,
                        field,
                        field.key,
                        setFormStateForm
                      )
                    : formStateForm
                }
                i={i}
                onChange={onChangeForm}
                error={errorForm}
                setError={setErrorForm}
              />
            )}
          </Fragment>
        ))}
        {showExtraModal}
      </DataModal>
    );
  });
  Form.displayName = "Form";

  const AddButton = memo(({ onClick }: { onClick?: (e?: any) => void }) => {
    if (isTablet) return <FloatButton onClick={onClick || onAdd} />;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "var(--spL)",
          padding: "var(--spM)",
          marginBottom: "-22px",
        }}
      >
        <div style={{ flexGrow: 1 }}>
          {
            <DataSearch
              value={searchs.searchBy || ""}
              name={mod.modulo + "Search"}
              setSearch={onSearch || setSearchs}
            />
          }
        </div>
        <div>
          <Button onClick={onClick || onAdd}>
            {/* <Button onClick={onClick || onAdd} style={{ width: "50px" }}> */}
            Agregar {mod.singular}
            {/* <IconAdd size={24} /> */}
          </Button>
        </div>
        {mod.import && (
          <div style={{ marginTop: "12px" }} onClick={onImport}>
            <IconImport />
          </div>
        )}
        {menuFilter || null}
      </div>
    );
  });
  AddButton.displayName = "AddButton";

  const FormDelete = memo(({ open, onClose, item, onConfirm }: PropsDetail) => {
    return (
      <DataModal
        id="Eliminar"
        title="Confirmar la eliminación"
        buttonText="Eliminar"
        buttonCancel=""
        onSave={(e) => (onConfirm ? onConfirm(item) : onSave(item))}
        onClose={onClose}
        open={open}
      >
        Seguro de Querer Eliminar al {mod.singular}: {item.name}
      </DataModal>
    );
  });
  FormDelete.displayName = "FormDelete";

  const onButtonActions = (item: Record<string, any>) => {
    return (
      <nav style={{ display: "flex", gap: "var(--spM)" }}>
        <IconEdit
          onClick={(e: MouseEvent) => {
            e.stopPropagation();
            onEdit(item);
          }}
          color="var(--cWarning)"
          size={24}
        />
        <IconTrash
          onClick={(e: MouseEvent) => {
            e.stopPropagation();
            onDel(item);
          }}
          color="var(--cError)"
          size={24}
        />
      </nav>
    );
  };

  const findOptions = (
    value: any,
    options: Record<string, any>[],
    key: string = "id",
    label: string = "name"
  ) => {
    if (!Array.isArray(options) || options.length == 0) return "";
    const r = options?.find((s: any) => s[key] == value);
    if (r) return r[label];
    return "";
  };
  const _onRender = (field: any) => {
    const render = field.list?.onRender || field.onRender || null;
    if (mod.extraData) {
      if (field.form?.type === "select" && field.form.optionsExtra)
        return (item: RenderColType) => {
          return findOptions(
            item.value,
            extraData[field.form.optionsExtra],
            field.form.optionValue,
            field.form.optionLabel
          );
        };
      if (field.form?.type === "select" && !field.form.optionsExtra)
        return (item: RenderColType) => {
          return findOptions(
            item.value,
            typeof field.form.options == "function"
              ? field.form.options({ key: field.form.optionValue, item, user })
              : field.form.options,
            field.form.optionValue,
            field.form.optionLabel
          );
        };
      if (render) {
        return (item: RenderColType) => {
          return render(item);
        };
      }
    }
    return render;
  };

  const List = memo((props: any) => {
    const getHeader = () => {
      const head: Object[] = [];
      for (const key in fields) {
        const field = fields[key];
        if (!field.list) continue;
        const col: any = {
          key,
          responsive: "onlyDesktop",
          label: field.list.label || field.label,
          className: field.list.className || "",
          width: field.list.width,
          onRender: _onRender(field),
          order: field.list.order || field.order || 1000,
          style: field.list.style || field.style || {},
        };
        head.push(col);
      }
      head.sort((a: any, b: any) => a.order - b.order);
      return head;
    };

    const [header, setHeader]: any = useState([]);
    useEffect(() => {
      setHeader(getHeader());
      console.log("ussefecct list");

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fields]);

    return (
      <>
        <div>
          <AddButton />
        </div>
        <LoadingScreen skeletonType="LatestInvoicesSkeleton">
          <div
            style={{
              height: "calc(100vh - 240px)",
              overflowY: "auto",
            }}
          >
            <Table
              data={data?.data}
              onRowClick={onView}
              header={header}
              onTabletRow={props.onTabletRow}
              onButtonActions={onButtonActions}
              // actionsWidth={props.actionsWidth}
              actionsWidth={"170px"}
            />
          </div>
          {openView && (
            <>
              {mod.renderView ? (
                mod.renderView({
                  open: openView,
                  onClose: onCloseView,
                  item: formState,
                  onConfirm: onSave,
                  execute,
                })
              ) : (
                <Detail
                  open={openView}
                  onClose={onCloseView}
                  item={formState}
                  onConfirm={onSave}
                />
              )}
            </>
          )}
          {open && (
            <Form
              open={open}
              onClose={onCloseCrud}
              item={formState}
              onConfirm={onSave}
            />
          )}
          {openDel && (
            <FormDelete
              open={openDel}
              onClose={onCloseDel}
              item={formState}
              onConfirm={onSave}
            />
          )}
        </LoadingScreen>
      </>
    );
  });
  List.displayName = "List";
  return {
    user,
    showToast,
    onAdd,
    onDel,
    onEdit,
    onView,
    onImport,
    onExist,
    onExportItem,
    onExport,
    onCloseCrud,
    onCloseView,
    onCloseDel,
    onSave,
    onSearch,
    onFilter,
    onChangePage,
    onChangePerPage,
    getTotalPages,
    onChange,
    open,
    setOpen,
    openView,
    setOpenView,
    openDel,
    setOpenDel,
    formState,
    setFormState,
    errors,
    setErrors,
    params,
    setParams,
    searchs,
    setSearchs,
    data,
    reLoad,
    execute,
    userCan,
    store,
    setStore,
    List,
    extraData,
    findOptions,
  };
};

export default useCrud;
