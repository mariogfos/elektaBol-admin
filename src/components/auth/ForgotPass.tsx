import InputCode from "@/mk/components/forms/InputCode/InputCode";
import useAxios from "@/mk/hooks/useAxios";
import { useEffect, useState } from "react";
import { useAuth } from "@/mk/contexts/AuthProvider";
import Input from "../../mk/components/forms/Input/Input";
import InputPassword from "../../mk/components/forms/InputPassword/InputPassword";
import DataModal from "../../mk/components/ui/DataModal/DataModal";
import { logError } from "@/mk/utils/logs";

type PropsType = {
  open: boolean;
  setOpen: Function;
  mod?: any;
};

const ForgotPass = ({ open, setOpen, mod }: PropsType) => {
  const { execute } = useAxios();
  const { showToast } = useAuth();
  const [formState, setformState]: any = useState({});
  const [errors, seterrors]: any = useState({});
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);

  const handleChangeInput = (e: any) => {
    let value = e.target.value;
    setformState({ ...formState, [e.target.name]: value });
  };

  useEffect(() => {
    seterrors({});
    setformState({ newPassword: null, pinned: 0 });
    return () => {
      if (intervalo) clearInterval(intervalo);
    };
  }, [open]);

  let intervalo: any = null;

  const cuentaRegresiva = (tiempoTotal: number) => {
    const fechaInicio = new Date().getTime();
    const fechaObjetivo = fechaInicio + tiempoTotal;

    intervalo = setInterval(function () {
      const fechaActual = new Date().getTime();
      const diferencia = fechaObjetivo - fechaActual;

      const minutost = Math.floor(diferencia / (1000 * 60));
      const segundost = Math.floor((diferencia % (1000 * 60)) / 1000);

      setMinutos(minutost);
      setSegundos(segundost);

      if (diferencia < 0) {
        clearInterval(intervalo);
        setMinutos(0);
        setSegundos(0);
      }
    }, 1000);
    return intervalo;
  };

  const onGetCode = async () => {
    if (minutos || segundos > 0) {
      showToast("Espere 2 minutos antes de volver a enviar el código.", "info");
      return;
    }

    let err = {};
    if (!formState.ci)
      err = { ...err, ci: "Debe indicar su carnet de identidad" };

    if (Object.keys(err).length > 0) {
      seterrors(err);
      return;
    }

    const { data, error } = await execute("/" + mod + "-getpinreset", "POST", {
      ci: formState.ci,
      code: "",
    });

    if (data?.success === true) {
      showToast(data?.message, "success");
      console.log(data?.message,"datamsg")
      setformState({ ...formState, newPassword: "", pinned: 1 });
      cuentaRegresiva(2 * 60 * 1000);
    } else {
      showToast(error?.message, "error");
    }
  };
  const setCode = (code: string) => {
    setformState({ ...formState, code });
  };
  const onChangePass = async () => {
    let err = {};
    let url = "/" + mod + "-setpassreset";
    if (!formState.code)
      err = { ...err, code: "Ingrese el código PIN enviado a su correo" };
    if (formState.code?.length != 4)
      err = { ...err, code: "El código PIN debe tener 4 dígitos" };

    let param: any = { code: formState.code };
    if (!formState.newPassword)
      err = { ...err, password: "Ingrese la nueva Contraseña" };
    if (formState.newPassword?.length < 8)
      err = {
        ...err,
        newPassword: "La contraseña debe tener al menos 8 caracteres",
      };
    if (formState.newPassword?.length > 15)
      err = {
        ...err,
        newPassword: "La contraseña debe tener menos 15 caracteres",
      };
      if(formState.newPassword != formState.repPassword){
        err = {
          ...err,
          repPassword: "Las contraseñas deben ser iguales",
        };
      }

    if (Object.keys(err).length > 0) {
      seterrors(err);
      return;
    }
    param = { ...param, password: formState.newPassword, ci: formState.ci };

    const { data, error } = await execute(url, "POST", param);

    if (data?.success == true) {
      showToast(data.message, "success");
      setformState({ pinned: 0 });
      seterrors({});
      setOpen(false);
    } else {
      showToast(error?.data?.message || error?.message, "error");
      logError("Error ChangePass", error);
      seterrors(error?.data?.errors);
    }
  };
  return (
    <DataModal
      open={open}
      title="Olvidé mi contraseña"
      onClose={() => setOpen(false)}
      onSave={formState.pinned != 1 ? onGetCode : onChangePass}
      buttonText={formState.pinned != 1 ? "Enviar PIN" : "Cambiar Contraseña"}
      buttonCancel=""
    >
      {formState.pinned != 1 ? (
        <div>
          Se enviará un código PIN de verificación a su correo
          <Input
            label={"Carnet identidad"}
            required={false}
            type="number"
            name="ci"
            error={errors}
            value={formState.ci}
            onChange={handleChangeInput}
            className="mYl"
          />
          {(minutos || segundos > 0) && (
            <div className="cError">
              Debe esperar {minutos} minutos con {segundos} segundos para volver
              a enviar el pin.
            </div>
          )}
        </div>
      ) : (
        <>
          <InputCode
            label="Código PIN"
            type="number"
            name="code"
            error={errors}
            value={formState.code}
            setCode={setCode}
            onChange={() => {}}
            // className="mYl"
          ></InputCode>
          <div>
            <InputPassword
              label="Contraseña Nueva"
              name="newPassword"
              value={formState["newPassword"]}
              error={errors}
              onChange={handleChangeInput}
            />
              <InputPassword
              label="Repetir contraseña"
              name="repPassword"
              value={formState["repPassword"]}
              error={errors}
              onChange={handleChangeInput}
            />
          </div>
        </>
      )}
    </DataModal>
  );
};

export default ForgotPass;
