import { Card } from "@/mk/components/ui/Card/Card";
import styles from "./WidgetResume.module.css";
import { IconExport } from "@/components/layout/icons/IconsBiblioteca";

const WidgetResume = ({ data, dataExtra, level }: any) => {
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
    <div>
      {level < 2 && (
        <div className={styles.container}>
          <section>
            <div>
              {level === 0 && "Resumen general a nivel nacional"}
              {level === 1 && "Resumen general a nivel departamental"}
            </div>
            <div>
              {level === 0 && "Bolivia"}
              {level === 0 && data.name}
            </div>
            <div className={styles["container-card"]}>
              <div className={styles["cardInfo"]}>
                <h2>{labels[level]}</h2>
                {data && <p>{data.length}</p>}
              </div>
              <div className={styles["cardInfo"]}>
                <h2>{labels[level + 1]}</h2>
                {data && <p>{totalCircunscripciones}</p>}
              </div>
              <div className={styles["cardInfo"]}>
                <h2>{labels[level + 2]}</h2>
                {typeof dataExtra == "number" && <p>{dataExtra}</p>}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default WidgetResume;

