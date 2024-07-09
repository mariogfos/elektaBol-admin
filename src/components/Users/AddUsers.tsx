import Input from "@/mk/components/forms/Input/Input";
import InputFullName from "@/mk/components/forms/InputFullName/InputFullName";
import Select from "@/mk/components/forms/Select/Select";
import DataModal from "@/mk/components/ui/DataModal/DataModal";
import { useUsers } from "./useUsers";
import styles from "./users.module.css";
import InputPassword from "@/mk/components/forms/InputPassword/InputPassword";
import useAxios from "@/mk/hooks/useAxios";

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
  } = useUsers({ onClose, precarga, reLoad });

  const { data: datos } = useAxios("/users", "GET", {
    fullType: "EXTRA",
    todos: 1,
  });
  // const { data: sublemas } = useAxios("/sublemas", "GET", {});
  // const { data: listas } = useAxios("/listas", "GET", {});
  // const { data: locals } = useAxios("/locals", "GET", {});
  // const { data: dptos } = useAxios("/dptos", "GET", {});
  // const { data: barrios } = useAxios("/barrios", "GET", {});

  const getLocals = () => {
    let data: any = [];
    if (listsApi?.data?.locals.length > 0) {
      listsApi?.data.locals.find((item: any) => {
        if (item.dpto_id == formState.dpto_id) {
          data.push(item);
        }
      });
    }
    return data;
  };
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
  const getListas = () => {
    let data: any = [];
    if (listsApi?.data?.listas.length > 0) {
      listsApi?.data.listas.find((item: any) => {
        if (item.sublema_id == formState.sublema_id) {
          data.push(item);
        }
      });
    }
    return data;
  };

  const getDatos = (entidad: any) => {
    if (entidad == "sublema") {
      let item = datos?.data?.sublemas.find(
        (item: any) => item.id == user.datos.sublema_id
      );
      return item?.name || "";
    }
    if (entidad == "lista") {
      let item = datos?.data?.listas.find(
        (item: any) => item.id == user.datos.lista_id
      );
      return item?.name || "";
    }
    if (entidad == "dpto") {
      let item = datos?.data?.dptos.find(
        (item: any) => item.id == user.datos.dpto_id
      );
      return item?.name || "";
    }
    if (entidad == "local") {
      let item = datos?.data?.locals.find(
        (item: any) => item.id == user.datos.local_id
      );
      return item?.name || "";
    }
    if (entidad == "barrio") {
      let item = datos?.data?.barrios.find(
        (item: any) => item.id == user.datos.barrio_id
      );
      return item?.name || "";
    }
  };
  // const getPath = () => {
  //   let path = "";
  //   if (user?.role?.level > 1) path += `${getDatos("sublema")}`;
  //   if (user?.role?.level > 2) path += `/${getDatos("lista")}`;
  //   if (user?.role?.level > 3) path += `/${getDatos("dpto")}`;
  //   if (user?.role?.level > 4) path += `/${getDatos("local")}`;
  //   if (user?.role?.level > 5) path += `/${getDatos("barrio")}`;

  //   return path;
  // };
  return (
    <DataModal
      open={open}
      onClose={() => _onClose()}
      fullScreen={isTablet}
      onSave={onSave}
      buttonText="Agregar miembro"
      buttonCancel=""
      disabled={Object.keys(errorsUsers).length > 0}
    >
      <div style={{ marginTop: 16 }}>
        <h1>{`Registrar miembro  en mi red`}</h1>
        {waiting > 0 ||
          (user?.role?.level > 1 && (
            <p className={styles["tSubtitle"]}>
              Estas registrando en
              <span>
                {user?.role?.level > 1 && ` ${getDatos("sublema")}`}
                {user?.role?.level > 2 && ` / ${getDatos("lista")}`}
                {user?.role?.level > 3 && ` / ${getDatos("dpto")}`}
                {user?.role?.level > 4 && ` / ${getDatos("local")}`}
                {user?.role?.level > 5 && ` / ${getDatos("barrio")}`}
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

        {formState.role_id !== null && user?.role?.level <= 1 && level > 1 && (
          <Select
            label="Sublema"
            name="sublema_id"
            error={errorsUsers}
            disabled={precarga?.sublema_id}
            required={true}
            value={formState["sublema_id"]}
            onChange={handleChangeInput}
            options={listsApi?.data?.sublemas}
            className="appearance-none"
          />
        )}
        {formState.role_id !== null && user?.role?.level <= 2 && level > 2 && (
          <Select
            label="Lista"
            name="lista_id"
            error={errorsUsers}
            disabled={precarga?.lista_id}
            required={true}
            value={formState["lista_id"]}
            onChange={handleChangeInput}
            options={getListas() || []}
            className="appearance-none"
          />
        )}
        {formState.role_id !== null && user?.role?.level <= 3 && level > 3 && (
          <Select
            label="Departamento"
            name="dpto_id"
            disabled={precarga?.dpto_id}
            error={errorsUsers}
            required={true}
            value={formState["dpto_id"]}
            onChange={handleChangeInput}
            options={listsApi?.data?.dptos || []}
            className="appearance-none"
          />
        )}
        {formState.role_id !== null && user?.role?.level <= 4 && level > 4 && (
          <Select
            label="Localidad"
            name="local_id"
            disabled={precarga?.local_id}
            error={errorsUsers}
            required={level > 4}
            value={formState["local_id"]}
            onChange={handleChangeInput}
            options={getLocals() || []}
            className="appearance-none"
          />
        )}

        {formState.role_id !== null && user?.role?.level <= 5 && level > 5 && (
          <>
            <Select
              label="Barrios"
              name="barrio_id"
              error={errorsUsers}
              disabled={precarga?.barrio_id}
              required={level > 5}
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
          <div>
            Enviaremos un código PIN de acceso al correo proporcionado para que
            pueda ingresar a la plataforma
          </div>
          <div>
            Si no encuentras el código en tu buzón, revisa la carpeta de spam o
            correos no deseados. Si el código no está allí, la dirección de
            email podría ser incorrecta o no existir.
          </div>
        </div>
      </div>
    </DataModal>
  );
};

export default AddUsers;
