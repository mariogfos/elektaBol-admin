import { Card } from "@/mk/components/ui/Card/Card";
import style from "./WidgetResume.module.css";
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
    <div className={style.container}>
      <section>
        <p
          style={{
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Resumen general a nivel nacional
        </p>
        <p
          style={{
            fontSize: "14px",
            fontWeight: "normal",
            color: "var(--cBlackV2)",
            marginTop: "4px",
          }}
        >
          Al lunes 10 de junio del 2024
        </p>
        <div className={style["container-card"]}>
          <Card>
            <h2>Departamentos</h2>
            <p>9</p>
          </Card>
          <Card>
            <h2>Circunscripciones</h2>
            <p>63</p>
          </Card>
          <Card>
            <h2>Recintos</h2>
            <p>3,500</p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default WidgetResume;
