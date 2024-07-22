import styles from "./WidgetResume.module.css";
import WidgetResumeVotes from "./WidgetResumeVotes";
import WidgetResumeWinnerParty from "./WidgetResumeWinnerParty";

const WidgetResumen = ({
  data,
  params,
  dataExtra,
  openModal,
  extra,
  calculateTotalHabilitados,
}: any) => {
  const [paramsValue, setParams] = params;

  const { level } = paramsValue;

  const calculateTotalTotales = () => {
    let total = 0;
    data.forEach((item: any) => {
      total += item?.entidad * 1;
    });

    return total % 1 === 0 ? total : Number(total.toFixed(2));
  };

  const labels: any = [
    "Departamento", // 0
    "Circunscripción", // 1
    "Recinto", // 2
    "Mesa", // 3
  ];
  return (
    <div className={styles["topWidgets"]}>
      {level < 2 && (
        <div className={styles.container}>
          <section>
            <div>
              {level === 0 && "Resumen general a nivel nacional"}
              {level === 1 && "Resumen general a nivel departamental"}
            </div>
            <div>
              {level === 0 && "Bolivia"}
              {level === 0 && data?.data?.tabla?.name}
            </div>
            <div className={styles["container-card"]}>
              <div className={styles["cardInfo"]}>
                <h2>{labels[level]}</h2>
                {data && <p>{data?.length}</p>}
              </div>
              <div className={styles["cardInfo"]}>
                <h2>{labels[level + 1]}</h2>
                {data && <p>{calculateTotalTotales()}</p>}
              </div>
              <div className={styles["cardInfo"]}>
                <h2>{labels[level + 2]}</h2>
                {typeof extra == "number" && <p>{extra}</p>}
              </div>
            </div>
          </section>
        </div>
      )}
      {level >= 2 && (
        <WidgetResumeVotes
          title={"Datos de las elecciones del 2020"}
          // subtitle={selectedCircunscripcion?.titulo}
          data={level === 4 ? [data?.tabla] : data?.tabla}
          extras={dataExtra}
          total={calculateTotalHabilitados()}
        />
      )}
      <WidgetResumeWinnerParty
        data={[dataExtra?.winner[0]]}
        title={"Partido ganador"}
        //subtitle={level === 2 ? selectedCircunscripcion?.titulo : ""}
        total={calculateTotalHabilitados()}
        onClick={level < 4 ? openModal : null}
      />
    </div>
  );
};

export default WidgetResumen;
