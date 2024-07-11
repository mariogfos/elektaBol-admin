import { Card } from "@/mk/components/ui/Card/Card";
import styles from "./WidgetResume.module.css";
import { IconExport } from "@/components/layout/icons/IconsBiblioteca";

const WidgetResume = ({
  data,
  level,
  setLevel,
  params,
  setParams,
  reload,
}: any) => {
  return (
    <div className={styles.container}>
      <section>
        <div >
          Resumen general a nivel nacional
        </div>
        <div>
          Al lunes 10 de junio del 2024
        </div>
        <div className={styles["container-card"]}>
          <div className={styles["cardInfo"]}>
            <h2>Departamentos</h2>
            <p>9</p>
          </div>
          <div className={styles["cardInfo"]}>
            <h2>Circunscripciones</h2>
            <p>63</p>
          </div>
          <div className={styles["cardInfo"]}>
            <h2>Recintos</h2>
            <p>3,500</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WidgetResume;
