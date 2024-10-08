import { useAuth } from "@/mk/contexts/AuthProvider";
import useAxios from "@/mk/hooks/useAxios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import {
  IconEmail,
  IconGallery,
  IconLook,
} from "../layout/icons/IconsBiblioteca";
import Button from "@/mk/components/forms/Button/Button";
import InputFullName from "@/mk/components/forms/InputFullName/InputFullName";
import Input from "@/mk/components/forms/Input/Input";
import styles from "./profile.module.css";
import { checkRules, hasErrors } from "@/mk/utils/validate/Rules";

import NotAccess from "../auth/NotAccess/NotAccess";
import Authentication from "./Authentication";

const Profile = () => {
  const { user, getUser, showToast, setStore, userCan } = useAuth();
  const router = useRouter();

  const [formState, setFormState]: any = useState({});
  const [errors, setErrors] = useState({});
  const [preview, setPreview]: any = useState(null);
  const { execute } = useAxios();
  const [editProfile, setEditProfile] = useState(false);
  const [oldEmail, setOldEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [type, setType] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setStore({
      title: "Mi perfil",
    });
  }, []);

  const handleChange = (e: any) => {
    let value = e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
  };

  const validate = (field: any = "") => {
    let errors: any = {};
    // if (field != "") {
    //   errors = { ...errors };
    //   delete errors[field];

    //   // field = field.target.name
    // }

    // if ((field == "" || field == "ci") && !formState.ci) {
    // err = { ...err, ci: "El campo es requerido" };
    errors = checkRules({
      value: formState.ci,
      rules: ["required"],
      key: "ci",
      errors,
    });
    // }

    errors = checkRules({
      value: formState.name,
      rules: ["required", "alpha"],
      key: "name",
      errors,
    });

    // if ((field == "" || field == "last_name") && !formState.last_name) {
    errors = checkRules({
      value: formState.last_name,
      rules: ["required", "alpha"],
      key: "last_name",
      errors,
    });
    // }
    // if ((field == "" || field == "email") && !formState.email) {
    errors = checkRules({
      value: formState.email,
      rules: ["required", "email"],
      key: "email",
      errors,
    });
    // }
    // if (
    //   (field == "" || field == "email") &&
    //   formState.email &&
    //   !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formState.email)
    // ) {
    //   err = { ...err, email: "El email no es valido" };
    // }
    // if ((field == "" || field == "phone") && !formState.phone) {
    //   err = { ...err, phone: "El campo es requerido" };
    // }
    // if (
    //   (field == "" || field == "phone") &&
    //   formState.phone &&
    //   formState.phone.length < 8
    // ) {
    //   err = { ...err, phone: "El teléfono debe tener al menos 8 caracteres" };
    // }

    // if (Object.keys(err).length > 0) {
    //   setErrors(err);
    //   return false;
    // }
    setErrors(errors);
    return errors;
  };
  const _onExistEmail = async () => {
    if (formState.email === oldEmail || formState.email === "") {
      setIsDisabled(false);
      return;
    }
    setErrors({});
    const { data: response } = await execute("/adm-exist", "GET", {
      searchBy: formState.email,
      type: "email",
      cols: "id,email",
    });
    setIsDisabled(false);
    setOldEmail(formState.email);
    if (response?.data != null && response?.data.email !== user.email) {
      setErrors({ email: "El email ya existe" });
      return;
    }
  };

  const onSave = async () => {
    if (!userCan("profile", "U")) {
      showToast("No tienes permisos para realizar esta acción", "error");
      return;
    }
    if (hasErrors(validate())) return;
    const newUser = {
      ci: formState.ci,
      name: formState.name,
      middle_name: formState.middle_name,
      last_name: formState.last_name,
      mother_last_name: formState.mother_last_name,
      phone: formState.phone,
      avatar: formState.avatar,
      address: formState.address,
      email: formState.email,
    };

    const { data, error: err } = await execute(
      "/users/" + user.id,
      "PUT",
      newUser
    );

    if (data?.success == true) {
      getUser();
      showToast("Cambios guardados exitosamente", "success");
      // router.push("/");
    } else {
      console.log("error:", err);
      setErrors(err.data?.errors);
    }
    setEditProfile(false);
  };
  const onCancel = () => {
    setEditProfile(false);
    setFormState(user);
    setErrors({});
  };

  useEffect(() => {
    setFormState((prevState: any) => ({ ...prevState, ...user }));
  }, [user]);

  const onChangeFile = (e: any) => {
    setPreview(null);
    setFormState({ ...formState, avatar: "" });
    try {
      const file = e.target.files[0];
      if (
        !["png", "jpg", "jpeg"].includes(
          file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2)
        )
      ) {
        showToast("Solo se permiten imágenes", "error");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const { result }: any = e.target;

        let base64String = result.replace("data:", "").replace(/^.+,/, "");
        base64String = encodeURIComponent(base64String);
        setPreview(result);
        setFormState({ ...formState, avatar: base64String });
      };
      reader.onerror = (error) => console.log("reader error", error);
      reader.readAsDataURL(file);
    } catch (error) {
      setPreview(null);
      setFormState({ ...formState, avatar: "" });
    }
  };

  const onEditProfile = () => {
    setEditProfile(!editProfile);
  };
  if (!userCan("profile", "R")) return <NotAccess />;
  return (
    <div className={styles.profile}>
      <div>
        <Avatar
          name={getFullName(user)}
          src={
            preview ||
            getUrlImages("/ADM-" + user?.id + ".webp?d=" + user?.updated_at)
          }
          w={100}
          h={100}
        >
          {editProfile && (
            <label htmlFor="imagePerfil">
              <IconGallery size={42} color={"var(--cWhite)"} />
            </label>
          )}
        </Avatar>

        <input
          type="file"
          id="imagePerfil"
          className="hidden"
          onChange={onChangeFile}
        />
        <div className="center">
          <p> {getFullName(user)}</p>
          <p>Administrador</p>
        </div>
      </div>
      <div>
        {editProfile ? (
          <div>
            <Button
              onClick={onSave}
              disabled={Object.keys(errors).length > 0 || isDisabled}
              style={{ marginBottom: 16 }}
            >
              Guardar cambios
            </Button>
            <Button onClick={onCancel} variant="secondary">
              Cancelar
            </Button>
          </div>
        ) : (
          <Button onClick={onEditProfile}>Editar perfil</Button>
        )}
      </div>
      <section>
        <InputFullName
          value={formState}
          name={"full_name"}
          errors={errors}
          onChange={handleChange}
          disabled={!editProfile}
          onBlur={validate}
        />
        <div>
          {!editProfile && (
            <Input
              label="Carnet de identidad"
              name="ci"
              required
              value={formState.ci}
              error={errors}
              disabled={true}
              onChange={handleChange}
            />
          )}
          {(!editProfile || (editProfile && !formState.email)) && (
            <Input
              label="Correo electrónico"
              type="email"
              name="email"
              required={true}
              error={errors}
              value={formState.email}
              disabled={!editProfile}
              onChange={handleChange}
              onBlur={_onExistEmail}
              onFocus={() => setIsDisabled(true)}
            />
          )}
          {(!editProfile || (editProfile && !formState.phone)) && (
            <Input
              label="Teléfono"
              name="phone"
              required
              value={formState.phone}
              disabled={!editProfile}
              error={errors}
              onChange={handleChange}
              onBlur={() => validate("phone")}
            />
          )}
        </div>
      </section>
      <section style={{ display: "flex", gap: 8 }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--cBlackV1)",
            padding: "var(--spM) 0px",
            gap: 8,
            borderRadius: 8,
          }}
          onClick={() => {
            setType("M");
            setOpenModal(true);
          }}
        >
          <IconEmail size={24} />
          <p>Cambiar correo electrónico</p>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--cBlackV1)",
            padding: "var(--spM) 0px",
            borderRadius: 8,
            gap: 8,
          }}
          onClick={() => {
            setType("P");
            setOpenModal(true);
          }}
        >
          <IconLook />
          <p>Cambiar contraseña</p>
        </div>
      </section>
      {openModal && (
        <Authentication
          open={openModal}
          onClose={() => setOpenModal(false)}
          type={type}
          formState={formState}
          setFormState={setFormState}
          errors={errors}
          setErrors={setErrors}
          execute={execute}
          getUser={getUser}
          user={user}
          showToast={showToast}
        />
      )}
    </div>
  );
};

export default Profile;
