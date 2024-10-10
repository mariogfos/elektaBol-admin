import GraphBase from "@/mk/components/ui/Graphs/GraphBase";
import WidgetBase from "../WidgetBase/WidgetBase";
import styles from "./WidgetEducation.module.css";

const WidgetEducation = ({ widget4 }: any) => {
  return (
    <WidgetBase title="Educación" className={styles.widgetSexo}>
      <GraphBase
        data={{
          labels: ["Primaria", "Secundaria", "Bachiller", "No definido"],
          values: [
            { name: "Primaria", values: [widget4?.[1]] },
            { name: "Secundaria", values: [0, widget4?.[2]] },
            { name: "Bachiller", values: [0, 0, widget4?.[3]] },
            { name: "No definido", values: [0, 0, 0, widget4?.notDefined] },
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

export default WidgetEducation;
