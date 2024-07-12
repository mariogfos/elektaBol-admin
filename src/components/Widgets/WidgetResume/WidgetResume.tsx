import { Card } from "@/mk/components/ui/Card/Card";
import style from "./WidgetResume.module.css";
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
            <h2>{labels[level]}</h2>
            <p>{data.length}</p>
          </Card>
          <Card>
            <h2>{labels[level + 1]}</h2>
            <p>{totalCircunscripciones}</p>
          </Card>
          <Card>
            <h2>{labels[level + 2]}</h2>
            <p>{dataExtra}</p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default WidgetResume;
