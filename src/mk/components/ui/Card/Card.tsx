import { CSSProperties } from "react";
import styles from "./card.module.css";
import { on } from "events";

interface PropsType {
  children: any;
  className?: string;
  style?: CSSProperties;
  onClick?: any;
}

export const Card = ({
  children,
  className = undefined,
  style = undefined,
  onClick = undefined,
}: PropsType) => {
  return (
    <div
      style={style}
      onClick={onClick}
      className={styles.card + "  " + className}
    >
      {children}
    </div>
  );
};
