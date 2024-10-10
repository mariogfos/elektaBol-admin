import {
  IconArrowDecrement,
  IconArrowDiagonal,
} from "@/components/layout/icons/IconsBiblioteca";
import WidgetBase from "../WidgetBase/WidgetBase";
import styles from "./WidgetIncrease.module.css";

interface PropsType {
  widget8?: any;
}

const WidgetIncrease = ({ widget8 }: PropsType) => {
  const growthPercentage =
    widget8 && widget8.previous_week > 0
      ? (widget8.current_week / widget8.previous_week) * 100 - 100
      : 0;

  const percentageColor = growthPercentage >= 0 ? "#00AF90" : "#DA5D5D";
  const backgroundColor = growthPercentage >= 0 ? "#173A34" : "#463033";
  const IconComponent =
    growthPercentage >= 0 ? IconArrowDiagonal : IconArrowDecrement;

  const title = () => {
    return (
      <div>
        <h1>Crecimiento de afiliados</h1>
        <p
          style={{
            color: percentageColor,
            backgroundColor: backgroundColor,
          }}
        >
          {growthPercentage.toFixed(2)}%
          <IconComponent />
        </p>
      </div>
    );
  };

  return (
    <WidgetBase className={styles.widgetIncrease} title={title()}>
      <h1>{widget8?.current_week}</h1>
      <div></div>
      <p>Nuevos afiliados registrados en los últimos 7 días</p>
    </WidgetBase>
  );
};

export default WidgetIncrease;
