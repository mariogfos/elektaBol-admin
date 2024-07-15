import HistoryTitle from "./HistoryTitle";
import styles from "./WidgetTitulo.module.css";

const WidgetTitulo = ({ params, histParams, histTitulos, onBack }: any) => {
  const [histParam, setHistParam] = histParams;
  const [histTitulo, setHistTitulo] = histTitulos;
  const [param, setParam] = params;
  const level = param?.level || 0;
  let title = "Datos electorales históricos de Bolivia";
  if (level == 1) {
    // const ultHistParam = histParam.length - 1;
    title = "Departamento " + histTitulo[level - 1];
  }
  return (
    <div className={styles["container"]}>
      {level >= 1 && (
        // <nav>
        //   <ol>
        //     <li>
        //       <p>Mapa de Bolivia</p>
        //     </li>

        //     {histTitulo.map((title: any, index: number) => (
        //       <div
        //         key={index}
        //         onClick={() => histTitulo.length - 1 <= index && onBack()}
        //       >
        //         <li className={styles.breadcrumbItem}>
        //           <span className={styles.breadcrumbSeparator}>&lt;</span>
        //           <span className={styles.breadcrumbCurrent}>{title}</span>
        //         </li>
        //       </div>
        //     ))}
        //   </ol>
        // </nav>
        <HistoryTitle histTitulo={histTitulo} onBack={onBack} />
      )}
      <span>{title}</span>
    </div>
  );
};

export default WidgetTitulo;
