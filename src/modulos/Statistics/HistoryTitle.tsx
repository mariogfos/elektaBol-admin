import styles from "./HistoryTitle.module.css";

const HistoryTitle = ({ histTitulo, onBack }: any) => {
  return (
    <div className={styles["container"]}>
      <nav>
        <ol>
          <li>
            <p>Mapa de Bolivia</p>
          </li>

          {histTitulo.map((title: any, index: number) => (
            <div
              key={index}
              onClick={() => histTitulo.length - 1 <= index && onBack()}
            >
              <li className={styles.breadcrumbItem}>
                <span className={styles.breadcrumbSeparator}>&lt;</span>
                <span className={styles.breadcrumbCurrent}>{title}</span>
              </li>
            </div>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default HistoryTitle;
