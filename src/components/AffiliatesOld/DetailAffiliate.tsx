import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import DataModal from "@/mk/components/ui/DataModal/DataModal";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import React from "react";
import styles from "./DetailAffiliates.module.css";

type PropsDetailUsers = {
  open: boolean;
  close: () => void;
  item: any;
};

const DetailAffiliate = ({ open, close, item }: PropsDetailUsers) => {
  return (
    <DataModal
      open={open}
      onClose={() => close()}
      title="Detalle de Afiliado"
      buttonText=""
      buttonCancel=""
    >
      <div className={styles.detailAffiliate}>
        <Avatar
          name={getFullName(item)}
          src={getUrlImages("/AFF-" + item.id + ".webp?d=" + item.updated_at)}
        />
        <div>CI: {item.ci}</div>
        <div>Nombre: {item.name}</div>
        <div>Apellido: {item.last_name}</div>
        {item.email && <div>Email: {item.email}</div>}
      </div>
    </DataModal>
  );
};

export default DetailAffiliate;
