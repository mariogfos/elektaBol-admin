import styles from "./Tooltip.module.css";

type PropsType = {
  title: string;
  children: any;
  position?: "top" | "bottom" | "left" | "right";
};

const Tooltip = ({ title, children, position = "left" }: PropsType) => {
  return (
    <div className={styles.container}>
      <span className={`${styles.tooltip} ${styles[position]}`}>{title}</span>
      {children}
    </div>
  );
};

export default Tooltip;
