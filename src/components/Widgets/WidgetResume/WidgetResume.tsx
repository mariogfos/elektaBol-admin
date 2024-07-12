import { Card } from "@/mk/components/ui/Card/Card";
import styles from "./WidgetResume.module.css";
import { IconExport } from "@/components/layout/icons/IconsBiblioteca";

const WidgetResume = ({
  data,
  dataExtra,
  level,
  setLevel,
  params,
  setParams,
  reload,
}: any) => {
  let totalCircunscripciones = data.reduce((acc: any, item: any) => {
    return acc + item.total;
  }, 0);
  const labels: any = [
    "Departamento", // 0
    "Circunscripción", // 1
    "Recinto", // 2
    "Mesa", // 3
  ];
  return (
    <div className={styles.container}>
      <section>
        <div >
        {level === 0 && 'Resumen general a nivel nacional'}
        {level === 1 && 'Resumen general a nivel departamental'}
        </div>
        <div>
          {level === 0 && 'Bolivia'}
          {level === 0 && data.name}
        </div>
        <div className={styles["container-card"]}>
          <div className={styles["cardInfo"]}>
            <h2>Departamentos</h2>
            <p>{data.length}</p>
          </div>
          <div className={styles["cardInfo"]}>
            <h2>Circunscripciones</h2>
            <p>{totalCircunscripciones}</p>
          </div>
          <div className={styles["cardInfo"]}>
            <h2>Recintos</h2>
            <p>{dataExtra}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WidgetResume;
