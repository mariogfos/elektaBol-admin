import { useAuth } from "@/mk/contexts/AuthProvider";
import useAxios from "@/mk/hooks/useAxios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import { IconGallery } from "../layout/icons/IconsBiblioteca";
import Button from "@/mk/components/forms/Button/Button";
import InputFullName from "@/mk/components/forms/InputFullName/InputFullName";
import Input from "@/mk/components/forms/Input/Input";
import styles from "./profile.module.css";

const Profile = () => {
  const { user, getUser, showToast, setStore } = useAuth();
  const router = useRouter();
  const [formState, setFormState]: any = useState({});
  const [errors, setErrors] = useState({});
  const [preview, setPreview]: any = useState(null);
  const { execute } = useAxios();
  const [editProfile, setEditProfile] = useState(false);
  const [oldEmail, setOldEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

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
    let err: any = {};
    if (field != "") {
      err = { ...errors };
      delete err[field];

      // field = field.target.name
    }

    if ((field == "" || field == "ci") && !formState.ci) {
      err = { ...err, ci: "El campo es requerido" };
    }

    if ((field == "" || field == "name") && !formState.name) {
      err = { ...err, name: "El campo es requerido" };
    }
    if ((field == "" || field == "last_name") && !formState.last_name) {
      err = { ...err, last_name: "El campo es requerido" };
    }
    if ((field == "" || field == "email") && !formState.email) {
      err = { ...err, email: "El campo es requerido" };
    }
    if (
      (field == "" || field == "email") &&
      formState.email &&
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formState.email)
    ) {
      err = { ...err, email: "El email no es valido" };
    }
    if ((field == "" || field == "phone") && !formState.phone) {
      err = { ...err, phone: "El campo es requerido" };
    }
    if (
      (field == "" || field == "phone") &&
      formState.phone &&
      formState.phone.length < 8
    ) {
      err = { ...err, phone: "El teléfono debe tener al menos 8 caracteres" };
    }

    if (Object.keys(err).length > 0) {
      setErrors(err);
      return false;
    }
    setErrors({});
    return true;
  };
  console.log("errors", errors);
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
    console.log("formState", formState);
    if (!validate()) {
      return;
    }
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
      showToast("Datos guardados exitosamente", "success");
      router.push("/");
    } else {
      console.log("error:", err);
      setErrors(err.data?.errors);
    }
    setEditProfile(false);
  };
  const onCancel = () => {
    setEditProfile(false);
    setFormState(user);
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

  return (
    <div className={styles.profile}>
      <div>
        <Avatar
          name={getFullName(user)}
          src={
            preview ||
            getUrlImages("/ADM-" + user?.id + ".png?d=" + user?.updated_at)
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
          <Input
            label="Carnet de identidad"
            name="ci"
            required
            value={formState.ci}
            error={errors}
            disabled={true}
            onChange={handleChange}
          />
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
        </div>
      </section>
    </div>
  );
};

export default Profile;
