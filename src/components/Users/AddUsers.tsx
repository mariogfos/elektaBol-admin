import Input from "@/mk/components/forms/Input/Input";
import InputFullName from "@/mk/components/forms/InputFullName/InputFullName";
import Select from "@/mk/components/forms/Select/Select";
import DataModal from "@/mk/components/ui/DataModal/DataModal";
import { useUsers } from "./useUsers";
import styles from "./users.module.css";
import InputPassword from "@/mk/components/forms/InputPassword/InputPassword";
import useAxios from "@/mk/hooks/useAxios";
import NotAccess from "../auth/NotAccess/NotAccess";

type PropsType = {
  open: any;
  onClose: any;
  precarga?: any;
  reLoad?: any;
};

const AddUsers = ({ open, onClose, precarga = null, reLoad }: PropsType) => {
  const {
    user,
    formState,
    errorsUsers,
    roles,
    listsApi,
    handleChangeInput,
    onSave,
    _onClose,
    _onExist,
    isTablet,
    level,
    inputBarr,
    waiting,
    validate,
    userCan,
  } = useUsers({ onClose, precarga, reLoad });

  const { data: datos } = useAxios("/users", "GET", {
    fullType: "EXTRA",
    todos: 1,
  });
 console.log("precargs", precarga);

  // const getParish = () => {
  //   let data: any = [];
  //   if (listsApi?.data?.parishes.length > 0) {
  //     listsApi?.data.parishes.find((item: any) => {
  //       if (item.canton_id == formState.canton_id) {
  //         data.push(item);
  //       }
  //     });
  //   }
  //   return data;
  // };
  const getMacroRegion = () => {
    let data: any = [];
    if (listsApi?.data?.macroregions.length > 0) {
      listsApi?.data.macroregions.find((item: any) => {
        console.log(item.dpto_id == formState.dpto_id);
        if (item?.dpto_id == formState?.dpto_id) {
          data.push(item);
        }
      });
    }
    return data;
  };
  const getProv = () => {
    let data: any = [];
    if (listsApi?.data?.provs.length > 0) {
      listsApi?.data.provs.find((item: any) => {
        if (item.macroregion_id == formState.macroregion_id) {
          data.push(item);
        }
      });
    }
    return data;
  }
  const getMuns = () => {
    let data: any = [];
    if (listsApi?.data?.muns.length > 0) {
      listsApi?.data.muns.find((item: any) => {
        if (item.prov_id == formState.prov_id) {
          data.push(item);
        }
      });
    }
    return data;
  };
  const getDMuns = () => {
    let data: any = [];
    if (listsApi?.data?.dmuns.length > 0) {
      listsApi?.data.dmuns.find((item: any) => {
        if (item.mun_id == formState.mun_id) {
          data.push(item);
        }
      });
    }
    return data;
  };
  const getLocals = () => {
    let data: any = [];
    if (listsApi?.data?.locals.length > 0) {
      listsApi?.data.locals.find((item: any) => {
        if (item.dmun_id == formState.dmun_id) {
          data.push(item);
        }
      });
    }
    return data;
  }
  const getUVS = () => {
    let data: any = [];
    if (listsApi?.data?.uvs.length > 0) {
      listsApi?.data.uvs.find((item: any) => {
        if (item.local_id == formState.local_id) {
          data.push(item);
        }
      });
    }
    return data;
  }

  const getBarrios = () => {
    let data: any = [{ id: -1, name: "Otro" }];
    if (listsApi?.data?.barrios.length > 0) {
      listsApi?.data.barrios.find((item: any) => {
        if (item.local_id == formState.local_id) {
          data.push(item);
        }
      });
    }
    return data;
  };


  // console.log(formState.prov_id);
  const getDatos = (entidad: any) => {
    if (entidad == "dpto") {
      let item = datos?.data?.dptos.find(
        (item: any) => item.id == user?.datos?.dpto_id
      );
      return item?.name || "";
    }
    if (entidad == "macroregion") {
      let item = datos?.data?.macroregions.find(
        (item: any) => item.id == user?.datos?.macroregion_id
      );
      return item?.name || "";
    }
    if (entidad == "prov") {
      let item = datos?.data?.provs.find(
        (item: any) => item.id == user?.datos?.prov_id
      );
      return item?.name || "";
    }
    if (entidad == "mun") {
      let item = datos?.data?.muns.find(
        (item: any) => item.id == user?.datos?.mun_id
      );
      return item?.name || "";
    }
    if (entidad == "dmun") {
      let item = datos?.data?.dmuns.find(
        (item: any) => item.id == user?.datos?.dmun_id
      );
      return item?.name || "";
    }
    if (entidad == "local") {
      let item = datos?.data?.locals.find(
        (item: any) => item.id == user?.datos?.local_id
      );
      return item?.name || "";
    }
    if (entidad == "uv") {
      let item = datos?.data?.uvs.find(
        (item: any) => item.id == user?.datos?.uv_id
      );
      return item?.name || "";
    }
    if (entidad == "barrio") {
      let item = datos?.data?.barrios.find(
        (item: any) => item.id == user?.datos?.barrio_id
      );
      return item?.name || "";
    }
  };


  return (
    <DataModal
      open={open}
      onClose={() => _onClose()}
      fullScreen={isTablet}
      onSave={onSave}
      buttonText={userCan("users", "C") ? "Agregar" : ""}
      buttonCancel=""
      disabled={Object.keys(errorsUsers).length > 0}
    >
      {!userCan("users", "C") ? (
        <NotAccess />
      ) : (
        <div style={{ marginTop: 16 }}>
          <h1>{`Registrar nuevo integrante`}</h1>
          {waiting > 0 ||
            (user?.role?.level > 1 && (
              <p className={styles["tSubtitle"]}>
                Estas registrando en
                <span>
                  {user?.role?.level > 1 && ` ${getDatos("dpto")}`}
                  {/* {user?.role?.level > 2 && ` / ${getDatos("canton")}`}
                  {user?.role?.level > 3 && ` / ${getDatos("parish")}`}
                  {user?.role?.level > 4 && ` / ${getDatos("barrio")}`} */}
                  {/* {user?.role?.level > 5 && ` / ${getDatos("barrio")}`} */}
                </span>
              </p>
            ))}
          <Select
            label="Rol "
            name="role_id"
            error={errorsUsers}
            required={true}
            disabled={precarga?.level}
            value={formState["role_id"]}
            onChange={handleChangeInput}
            options={roles?.data || []}
            optionLabel="description"
            optionValue="id"
            className="appearance-none"
          />

          {formState.role_id !== null &&
            user?.role?.level <= 1 &&
            level > 1 && (
              <Select
                label="Departamento"
                name="dpto_id"
                error={errorsUsers}
                disabled={precarga?.dpto_id}
                required={true}
                value={formState["dpto_id"]}
                onChange={handleChangeInput}
                options={listsApi?.data?.provs || []}
                className="appearance-none"
              />
            )}
          {formState.role_id !== null &&
            user?.role?.level <= 2 &&
            level > 2 && (
              <Select
                label="Macro Región"
                name="macroregion_id"
                error={errorsUsers}
                disabled={precarga?.macroregion_id}
                required={true}
                value={formState["macroregion_id"]}
                onChange={handleChangeInput}
                options={getMacroRegion() || []}
                className="appearance-none"
              />
            )}
          {formState.role_id !== null &&
            user?.role?.level <= 3 &&
            level > 3 && (
              <Select
                label="Provincia"
                name="prov_id"
                disabled={precarga?.prov_id}
                error={errorsUsers}
                required={true}
                value={formState["prov_id"]}
                onChange={handleChangeInput}
                options={getProv() || []}
                className="appearance-none"
              />
            )}

          {formState.role_id !== null &&
            user?.role?.level <= 4 &&
            level > 4 && (
                <Select
                  label="Municipio"
                  name="mun_id"
                  error={errorsUsers}
                  disabled={precarga?.mun_id}
                  required={true}
                  value={formState["mun_id"]}
                  onChange={handleChangeInput}
                  options={getMuns() || []}
                  className="appearance-none"
                />
            )}
           {formState.role_id !== null &&
            user?.role?.level <= 5 &&
            level > 5 && (
                <Select
                  label="Distrito Municipal"
                  name="dmun_id"
                  error={errorsUsers}
                  disabled={precarga?.dmun_id}
                  required={true}
                  value={formState["dmun_id"]}
                  onChange={handleChangeInput}
                  options={getDMuns() || []}
                  className="appearance-none"
                />
            )}
            {formState.role_id !== null &&
            user?.role?.level <= 6 &&
            level > 6 && (
                <Select
                  label="Local"
                  name="local_id"
                  error={errorsUsers}
                  disabled={precarga?.local_id}
                  required={true}
                  value={formState["local_id"]}
                  onChange={handleChangeInput}
                  options={getLocals() || []}
                  className="appearance-none"
                />
            )}
            {formState.role_id !== null &&
            user?.role?.level <= 7 &&
            level > 7 && (
                <Select
                  label="Unidad vecinal"
                  name="uv_id"
                  error={errorsUsers}
                  disabled={precarga?.uv_id}
                  required={true}
                  value={formState["uv_id"]}
                  onChange={handleChangeInput}
                  options={getUVS() || []}
                  className="appearance-none"
                />
            )}
         {formState.role_id !== null &&
            user?.role?.level <= 8 &&
            level > 8 && (
              <>
                <Select
                  label="Barrios"
                  name="barrio_id"
                  error={errorsUsers}
                  disabled={precarga?.barrio_id}
                  required={level > 8}
                  value={formState["barrio_id"]}
                  onChange={handleChangeInput}
                  options={getBarrios() || []}
                  className="appearance-none"
                />
                {inputBarr && (
                  <Input
                    label="Barrio"
                    type="text"
                    name="barrio"
                    required={true}
                    error={errorsUsers}
                    value={formState["barrio"]}
                    // disabled={existCi}
                    onChange={handleChangeInput}
                  />
                )}
              </>
            )}
                  
          <Input
            label="Cédula de identidad"
            type="text"
            name="ci"
            className="mt-5"
            error={errorsUsers}
            required={true}
            value={formState["ci"]}
            onChange={handleChangeInput}
            onBlur={() => {
              _onExist("ci");
              validate("ci");
            }}
          />

          <div className="mb-2 ">
            <InputPassword
              label="Contraseña"
              required={true}
              name="password"
              // disabled={existCi}
              error={errorsUsers}
              value={formState.password}
              onChange={handleChangeInput}
              onBlur={() => validate("password")}
            />
          </div>
          <div className="mb-2 ">
            <InputPassword
              label="Repetir contraseña"
              required={true}
              name="repPassword"
              // disabled={existCi}
              error={errorsUsers}
              value={formState.repPassword}
              onChange={handleChangeInput}
              onBlur={() => validate("repPassword")}
            />
          </div>
          <InputFullName
            name="full_name"
            errors={errorsUsers}
            //disabled={existCi}
            value={formState}
            onChange={handleChangeInput}
            onBlur={validate}
          />
          <Input
            label="Correo electrónico"
            type="email"
            name="email"
            required={true}
            error={errorsUsers}
            value={formState["email"]}
            // disabled={existCi}
            onChange={handleChangeInput}
            onBlur={() => {
              _onExist("email");

              validate("email");
            }}
          />
          <Input
            label="Número de whatsApp"
            type="number"
            name="phone"
            required={true}
            error={errorsUsers}
            value={formState["phone"]}
            // disabled={existCi}
            onChange={handleChangeInput}
            onBlur={() => {
              validate("phone");
            }}
          />
          <div className={styles.addUsersText}>
            {/* <div>
              Enviaremos un código de acceso al correo proporcionado para que
              pueda ingresar a la plataforma
            </div>
            <div>
              Si no encuentras el código en tu buzón, revisa la carpeta de spam
              o correos no deseados. Si el código no está allí, la dirección de
              email podría ser incorrecta o no existir.
            </div> */}
          </div>
        </div>
      )}
    </DataModal>
  );
};

export default AddUsers;
