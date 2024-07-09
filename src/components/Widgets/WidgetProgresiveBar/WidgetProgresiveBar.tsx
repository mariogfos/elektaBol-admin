import { Card } from "@/mk/components/ui/Card/Card";
import ProgresiveBar from "@/mk/components/ui/ProgresiveBar/ProgresiveBar";
import styles from "./WidgetProgresiveBar.module.css";
import { formatNumber } from "@/mk/utils/numbers";

const WidgetProgresiveBar = (data: any) => {
  const { totalAfiliados, totalHabilitados } = data?.data;
  // console.log(totalAfiliados,totalHabilitados,'totales')

  return (
    <Card>
      <div className={styles["WidgetProgresiveBar"]}>
        <div>
          Esta barra refleja la cantidad de afiliados a nivel nacional con
          relación a los habilitados para votar
        </div>
        <ProgresiveBar
          topLabels
          bottomLabels
          total={totalHabilitados}
          actualValue={totalAfiliados}
          titleTotal={`Habilitados`}
          titleActualValue={`${formatNumber(totalAfiliados, 0)} Afiliados`}
        />
      </div>
    </Card>
  );
};

export default WidgetProgresiveBar;
