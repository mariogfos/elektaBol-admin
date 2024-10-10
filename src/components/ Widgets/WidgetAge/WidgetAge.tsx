import GraphBase from "@/mk/components/ui/Graphs/GraphBase";
import WidgetBase from "../WidgetBase/WidgetBase";
import styles from "./WidgetAge.module.css";

const WidgetAge = ({ widget2 }: any) => {
  return (
    <WidgetBase title="Edad" className={styles.widgetAge}>
      <GraphBase
        data={{
          labels: [
            "18-20",
            "21-30",
            "31-40",
            "41-50",
            "51-60",
            "61-70",
            "71-80",
            "81+",
          ],
          values: [
            { name: "18-20", values: [widget2?.["18-20"]] },
            { name: "21-30", values: [0, widget2?.["21-30"]] },
            { name: "31-40", values: [0, 0, widget2?.["31-40"]] },
            { name: "41-50", values: [0, 0, 0, widget2?.["41-50"]] },
            { name: "51-60", values: [0, 0, 0, 0, widget2?.["51-60"]] },
            { name: "61-70", values: [0, 0, 0, 0, 0, widget2?.["61-70"]] },
            {
              name: "71-80",
              values: [0, 0, 0, 0, 0, 0, widget2?.["71-80"]],
            },
            { name: "80+", values: [0, 0, 0, 0, 0, 0, 0, widget2?.["81+"]] },
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

export default WidgetAge;
