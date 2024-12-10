import React, { useState } from "react";
import styles from "./EventTypeRegister.module.css";
import {
  IconArrowRight,
  IconNewAfilliate,
  IconRegisterNoID,
  IconScanner,
} from "@/components/layout/icons/IconsBiblioteca";
import NewAffiliate from "@/components/NewAffiliate/NewAffiliate";
import NoQr from "@/components/NoQr/NoQr";
import QrReader from "@/components/QrReader/QrReader";

type PropsType = {
  id: number;
};

// Crear un componente reutilizable para cada opción
const EventTypeOption = ({
  Icon,
  color,
  title,
  description,
  onClick,
}: {
  Icon: React.FC<{ color: string }>;
  color: string;
  title: string;
  description: string;
  onClick?: any;
}) => {
  return (
    <div onClick={onClick}>
      <div>
        <Icon color={color} />
        <div>
          <p>{title}</p>
          <p>{description}</p>
        </div>
      </div>
      <IconArrowRight color={"var(--cBlackV2)"} />
    </div>
  );
};

const EventTypeRegister = ({ id }: PropsType) => {
  const [openNewAffiliate, setOpenNewAffiliate] = useState(false);
  const [openQrReader, setOpenQrReader] = useState(false);
  const [openNoQr, setOpenNoQr] = useState(false);
  return (
    <>
      <div className={styles.eventTypeRegister}>
        <h1>Tipo de registro</h1>
        <div>
          <EventTypeOption
            Icon={IconScanner}
            color={"var(--cAccent)"}
            title="Leer Elekta ID"
            description="Escanea el Elekta"
            onClick={() => setOpenQrReader(true)}
          />
          <EventTypeOption
            Icon={IconRegisterNoID}
            color={"var(--cSuccess)"}
            title="Registro sin Elekta ID"
            description="Busca al afiliado en Elekta"
            onClick={() => setOpenNoQr(true)}
          />
          <EventTypeOption
            Icon={IconNewAfilliate}
            color={"IconNewAfilliate"}
            title="Nuevo afiliado"
            description="Crea su cuenta y registra su asistencia"
            onClick={() => setOpenNewAffiliate(true)}
          />
        </div>
      </div>
      {openNewAffiliate && (
        <NewAffiliate
          open={openNewAffiliate}
          close={() => setOpenNewAffiliate(false)}
          eventId={id}
        />
      )}
      {openQrReader && (
        <QrReader
          open={openQrReader}
          close={() => setOpenQrReader(false)}
          eventId={id}
        />
      )}
      {openNoQr && (
        <NoQr idEvent={id} open={openNoQr} onClose={() => setOpenNoQr(false)} />
      )}
    </>
  );
};

export default EventTypeRegister;
