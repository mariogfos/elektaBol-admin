import { useEffect, useState } from "react";
import styles from "./progresiveBar.module.css";
import { formatNumber } from "@/mk/utils/numbers";

interface ProgresiveBarProps {
  total: number;
  actualValue: number;
  topLabels?: boolean;
  bottomLabels?: boolean;
  titleTotal?: string;
  titleActualValue?: string;
  colorVar?: string;
  height?: string | number;
  className?: any;
}

const ProgresiveBar = ({
  topLabels,
  bottomLabels,
  total,
  actualValue,
  titleTotal,
  titleActualValue,
  colorVar = "var(--cAccent)",
  height,
  className = "",
}: ProgresiveBarProps) => {
  const [percentage, setPercentage]: any = useState(null);
  const calcPercentage = () => {
    if (!total || total === 0 || isNaN(total) || isNaN(actualValue)) {
      return 0;
    }
    const percentage = (actualValue / total) * 100;
    return Math.round(percentage * 10) / 10;
  };
  
  useEffect(() => {
    let percent = calcPercentage();
    setPercentage(percent);
  }, [total, actualValue]);
    console.log(percentage,'%')
  return (
    <div style={{ position: "relative" }}>
      {topLabels && (
        <div
          className={styles["percentageLabels"]}
          style={{ alignItems: "flex-end" }}
        >
          <div>
            <div
              style={{ left: `${percentage}%` }}
              className={
                titleTotal && titleActualValue ? styles["lineBar"] : ""
              }
            >
              <div
                style={
                  percentage < 15
                    ? { width: `${percentage}`, position: "absolute", left: 4 }
                    : {
                        position: "absolute",
                        marginRight: 4,
                        width: `${percentage}`,
                        right: 10,
                      }
                }
              >
                {titleActualValue}
              </div>
            </div>
            0
          </div>
          <div>{formatNumber(total / 2, 0)}</div>
          <div>
            <div>{titleTotal}</div> {formatNumber(total, 0)}
          </div>
        </div>
      )}

      <div
        className={`${styles.progresiveBar}  ${styles[className]}`}
        style={{ height: height }}
      >
        <div
          style={{
            width: `${percentage}%`,
            position: "relative",
            backgroundColor: colorVar,
          }}
        >
          {percentage > 0 && <p>{percentage} %</p>}
        </div>
      </div>
      {bottomLabels && (
        <div className={styles["percentageLabels"]}>
          <div>0%</div>
          <div>50%</div>
          <div>100%</div>
        </div>
      )}
    </div>
  );
};

export default ProgresiveBar;
