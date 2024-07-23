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
    title = "Departamento " + histTitulo[level];
  }
  if (level == 2) {
    title = "Circunscripción " + histTitulo[level];
  }
  if (level == 3) {
    title = "Recinto: " + histTitulo[level];
  }
  if (level == 4) {
    title = "Mesa: " + histTitulo[level];
  }
  return (
    <div className={styles["container"]}>
      {level >= 1 && <HistoryTitle histTitulo={histTitulo} onBack={onBack} />}
      <span>{title}</span>
    </div>
  );
};

export default WidgetTitulo;
