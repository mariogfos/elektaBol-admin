import GraphBase from "@/mk/components/ui/Graphs/GraphBase";
import WidgetBase from "../WidgetBase/WidgetBase";
import styles from "./WidgetVerifiedAccount.module.css";

const WidgetVerifiedAccount = ({ widget5 }: any) => {
  return (
    <WidgetBase
      title="Cuentas Verificadas"
      className={styles.widgetVerifiedAccount}
    >
      <GraphBase
        data={{
          labels: ["No verificados", "Verificados"],
          values: [
            { name: "Verificados", values: [0, widget5?.verify] },
            {
              name: "No verificados",
              values: [widget5?.no_verify],
            },
          ],
        }}
        chartTypes={["donut"]}
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

export default WidgetVerifiedAccount;
