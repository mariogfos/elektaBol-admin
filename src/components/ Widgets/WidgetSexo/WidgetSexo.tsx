import GraphBase from "@/mk/components/ui/Graphs/GraphBase";
import WidgetBase from "../WidgetBase/WidgetBase";
import styles from "./WidgetSexo.module.css";

const WidgetSexo = ({ widget3 }: any) => {
  return (
    <WidgetBase title="Sexo" className={styles.widgetSexo}>
      <GraphBase
        data={{
          labels: ["Hombres", "Mujeres", "Prefiero no decirlo"],
          values: [
            { name: "Hombres", values: [widget3?.cant_m] },
            { name: "Mujeres", values: [0, widget3?.cant_f] },
            { name: "Prefiero no decirlo", values: [0, 0, widget3?.cant_x] },
          ],
        }}
        chartTypes={["bar"]}
        options={{
          title: "",
          subtitle: "",
          label: "",
          height: 300,
          money: false,
          //   stacked: true,
        }}
      />
    </WidgetBase>
  );
};

export default WidgetSexo;
