import { Card } from "@/mk/components/ui/Card/Card";
import GraphBase from "@/mk/components/ui/Graphs/GraphBase";
import styles from "./WidgetResume.module.css";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import { getUrlImages } from "@/mk/utils/string";
import { formatNumber } from "@/mk/utils/numbers";
import DonutChart from "@/components/DonutChart/DonutChart";

const WidgetResumeWinnerParty = ({
  data,
  title,
  subtitle,
  style,
  total,
  onClick = null,
}: any) => {
  const calculatePercentage: any = (totalVotes: number, votes: number) => {
    if (!totalVotes) return 0;
    return ((votes / totalVotes) * 100).toFixed(2);
  };

  return (
    <Card className={styles["widgetResumeWinner"]}>
      <section>
        <div>
          <div>{title}</div>
          <div>{subtitle}</div>
        </div>
        {onClick && <div onClick={onClick}>Ver más</div>}
      </section>
      <section style={style}>
        {data?.length === 0 && <span>No hay votos</span>}
        {data?.map((item: any, i: number) => (
          <div key={i}>
            <div>
              <Avatar
                src={getUrlImages(
                  "/PAR-" + item?.id + ".png?d=" + item?.updated_at
                )}
                name={item?.name}
              />
              <span>{item?.name}</span>
              <span>{formatNumber(item?.total_votos, 0)} votos obtenidos</span>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <DonutChart
                percentage={parseFloat(
                  calculatePercentage(total, Number(item?.total_votos))
                )}
                color={item?.color}
                size={100}
              />
            </div>
          </div>
        ))}
      </section>
    </Card>
  );
};

export default WidgetResumeWinnerParty;
