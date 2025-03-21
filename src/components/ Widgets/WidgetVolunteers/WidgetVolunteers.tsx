import React from "react";
import styles from "./WidgetVolunteers.module.css";
import WidgetBase from "../WidgetBase/WidgetBase";

interface PropsType {
  widget1?: any;
  lDpto?: Record<any, string>;
  lLocal?: Record<any, string>;
}

const WidgetVolunteers = ({ widget1 }: PropsType) => {
  return (
    <WidgetBase
      subtitle="Cantidad de afiliados"
      className={styles.widgetVolunteers}
    >
      <h1>{widget1?.cant}</h1>
      <div></div>
      <p>Bolivia</p>
    </WidgetBase>
  );
};

export default WidgetVolunteers;
