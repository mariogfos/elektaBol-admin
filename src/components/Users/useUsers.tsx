import { useEffect, useState } from "react";
import useAxios from "@/mk/hooks/useAxios";
import { useAuth } from "@/mk/contexts/AuthProvider";
import useScreenSize from "@/mk/hooks/useScreenSize";
import { checkRules, hasErrors } from "@/mk/utils/validate/Rules";

interface PropsType {
  onClose?: any;
  precarga?: any;
  reLoad?: any;
}
export const useUsers = ({ onClose, precarga, reLoad }: PropsType) => {
  const [formState, setFormState]: any = useState({
    role_id: null,
    sublema_id: null,
  });
  const [open, setOpen] = useState(false);
  const { showToast, waiting, user } = useAuth();
  const [errorsUsers, setErrorsUsers]: any = useState({});
  const [openDetail, setOpenDetail] = useState(false);
  const [item, setItem] = useState({} as any);
  const [level, setLevel] = useState(0);
  const [inputBarr, setInputBarr] = useState(false);
  // const [roles, setRoles] = useState([]);
  const [barrios, setBarrios]: any = useState([]);

  const {
    data: admins,
    // reLoad,
    execute,
  }: any = useAxios("/users", "GET", { page: 1, perPage: -1 });
  const { data: listsApi }: any = useAxios("/users", "GET", {
    page: 1,
    perPage: -1,
    fullType: "EXTRA",
  });
  const { data: roles } = useAxios("/roles", "GET", {
    perPage: -1,
    page: 1,
    searchBy: "",
  });
  const prechargeListsData = () => {
    let obj = {};
    if (precarga?.level) {
      obj = { ...obj, role_id: precarga?.level };
      setLevel(precarga?.level);
    }
    if (precarga?.lista_id) {
      obj = { ...obj, lista_id: precarga.lista_id };
    } else {
      obj = { ...obj, lista_id: user?.datos?.lista_id };
    }
    if (precarga?.sublema_id) {
      obj = { ...obj, sublema_id: precarga.sublema_id };
    } else {
      obj = { ...obj, sublema_id: user?.datos?.sublema_id };
    }
    if (precarga?.dpto_id) {
      obj = { ...obj, dpto_id: precarga.dpto_id };
    } else {
      obj = { ...obj, dpto_id: user?.datos?.dpto_id };
    }
    if (precarga?.local_id) {
      obj = { ...obj, local_id: precarga.local_id };
    } else {
      obj = { ...obj, local_id: user?.datos?.local_id };
    }
    if (precarga?.barrio_id) {
      obj = { ...obj, barrio_id: precarga.barrio_id };
    } else {
      obj = { ...obj, barrio_id: user?.datos?.barrio_id };
    }

    setFormState({ ...formState, ...obj });
  };

  useEffect(() => {
    prechargeListsData();
  }, [user?.datos]);

  useEffect(() => {
    const newOption = { id: -1, name: "new" };
    if (listsApi?.data?.barrios.length > 0) {
      const updatedOptions: any = [newOption, ...listsApi?.data?.barrios];
      setBarrios(updatedOptions);
    } else {
      setBarrios([newOption]);
    }
  }, [listsApi?.data]);
  const { isTablet } = useScreenSize();

  const openDetailUsers = (item: any) => {
    setItem(item);
    setOpenDetail(true);
  };

  // const handleChangeLevel = () => {

  // };

  const handleChangeInput = (e: any) => {
    let value = e.target.value;

    if (e.target.name == "ci") {
      // quitar . y - del ci y solo permitir numeros
      value = value.replace(/[.-]/g, "");
    }

    if (e.target.name) {
      delete errorsUsers[e.target.name];
    }
    console.log(value);
    setFormState((prevState: any) => ({
      ...prevState,
      [e.target.name]: value,
    }));
  };

  const onClean = () => {
    setFormState({
      ci: "",
      name: "",
      last_name: "",
      phone: "",
      email: "",
      role_id: null,
      password: "",
      repPassword: "",
    });
    setInputBarr(false);
    setErrorsUsers({});
  };

  const _onClose = () => {
    onClean();
    onClose();
  };
  const _onExist = async (type = "ci") => {
    const { data: response } = await execute("/adm-exist", "GET", {
      searchBy: type == "email" ? formState.email : formState.ci,
      type: type,
      cols: "id",
    });
    if (response?.data != null) {
      if (type == "email") {
        setErrorsUsers({ ...errorsUsers, email: "El email ya existe" });
        return;
      } else {
        setErrorsUsers({ ...errorsUsers, ci: "El CI ya existe" });
        return;
      }
    }
    validate(type);
  };

  const validate = (field: any = "") => {
    let errors: any = {};
    if (field != "") {
      errors = { ...errorsUsers };
      delete errors[field];
    }
    if (field == "" || field === "password") {
      errors = checkRules({
        value: formState.password,
        rules: ["required", "password"],
        key: "password",
        errors,
      });
    }
    if (field == "" || field === "repPassword") {
      errors = checkRules({
        value: formState.repPassword,
        rules: ["required", "same:password"],
        key: "repPassword",
        errors,
        data: formState,
      });
    }

    if (field == "" || field == "role_id") {
      errors = checkRules({
        value: formState.role_id,
        rules: ["required"],
        key: "role_id",
        errors,
      });
    }
    if (field == "" || field == "ci") {
      errors = checkRules({
        value: formState.ci,
        rules: ["required", "number", "ci"],
        key: "ci",
        errors,
      });
    }
    if (field == "" || field == "name") {
      errors = checkRules({
        value: formState.name,
        rules: ["required", "alpha"],
        key: "name",
        errors,
      });
    }
    if (field == "" || field == "middle_name") {
      errors = checkRules({
        value: formState.middle_name,
        rules: ["alpha"],
        key: "middle_name",
        errors,
      });
    }
    if (field == "" || field == "mother_last_name") {
      errors = checkRules({
        value: formState.mother_last_name,
        rules: ["alpha"],
        key: "mother_last_name",
        errors,
      });
    }
    if (field == "" || field == "last_name") {
      errors = checkRules({
        value: formState.last_name,
        rules: ["required", "alpha"],
        key: "last_name",
        errors,
      });
    }
    if (field == "" || field == "phone") {
      errors = checkRules({
        value: formState.phone,
        rules: ["required", "number"],
        key: "phone",
        errors,
      });
    }
    if (field == "" || field == "email") {
      errors = checkRules({
        value: formState.email,
        rules: ["required", "email"],
        key: "email",
        errors,
      });
    }

    if (level > 1) {
      if ((field == "" || field == "sublema_id") && !formState.sublema_id) {
        errors = { ...errors, sublema_id: "El campo es requerido" };
      }
    }
    if (level > 2) {
      if ((field == "" || field == "lista_id") && !formState.lista_id) {
        errors = { ...errors, lista_id: "El campo es requerido" };
      }
    }
    if (level > 3) {
      if ((field == "" || field == "dpto_id") && !formState.dpto_id) {
        errors = { ...errors, dpto_id: "El campo es requerido" };
      }
    }
    if (level > 4) {
      if ((field == "" || field == "local_id") && !formState.local_id) {
        errors = { ...errors, local_id: "El campo es requerido" };
      }
    }
    if (level > 5) {
      if ((field == "" || field == "barrio_id") && !formState.barrio_id) {
        errors = { ...errors, barrio_id: "El campo es requerido" };
      }
      if (
        (field == "" || field == "barrio") &&
        !formState.barrio &&
        formState.barrio_id === -1
      ) {
        errors = { ...errors, barrio: "El campo es requerido" };
      }
    }

    setErrorsUsers(errors);
    return errors;
  };
  const onSave = async () => {
    if (hasErrors(validate())) return;
    const { data: response } = await execute("/users", "POST", {
      ...formState,
    });
    if (response?.success === true) {
      showToast("Usuario creado correctamente", "success");
      setFormState({});
      reLoad();
      _onClose();
    } else {
      showToast("Error al crear el usuario", "error");
    }
  };

  useEffect(() => {
    if (!precarga?.level) {
      const role = roles?.data.find((role: any) => {
        return role.id === formState.role_id;
      });
      setLevel(role?.level);
    }
  }, [formState.role_id]);

  useEffect(() => {
    if (formState?.barrio_id === -1) {
      setInputBarr(true);
    } else {
      setInputBarr(false);
      delete errorsUsers["barrio"];
    }
  }, [formState?.barrio_id]);

  return {
    user,
    formState,
    errorsUsers,
    open,
    setOpen,
    setErrorsUsers,
    roles,
    listsApi,
    barrios,
    handleChangeInput,
    onSave,
    _onClose,
    _onExist,
    validate,
    openDetailUsers,
    openDetail,
    item,
    setOpenDetail,
    admins,
    isTablet,
    reLoad,
    level,
    inputBarr,
    setFormState,
    waiting,
  };
};
