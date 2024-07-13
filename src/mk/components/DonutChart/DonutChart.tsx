import React, { useEffect, useRef } from "react";
import styles from "./donutChart.module.css";

interface DonutChartProps {
  percentage: number;
  color: string;
  size: number;
}

const DonutChart: React.FC<DonutChartProps> = ({ percentage, color, size }) => {
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const circle = circleRef.current;
    if (circle) {
      const radius = circle.r.baseVal.value;
      const circumference = radius * 2 * Math.PI;
      const offset = circumference - (percentage / 100) * circumference;
      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = `${offset}`;
      circle.style.stroke = color;
    }
  }, [percentage, color]);

  return (
    <div
      className={styles.chartContainer}
      style={{ width: size, height: size }}
    >
      <svg className={styles.donutChart} viewBox="0 0 36 36">
        <circle
          className={styles.donutRing}
          cx="18"
          cy="18"
          r="15.91549431"
        ></circle>
        <circle
          ref={circleRef}
          className={styles.donutSegment}
          cx="18"
          cy="18"
          r="15.91549431"
        ></circle>
        <text x="18" y="20.35" className={styles.donutText} textAnchor="middle">
          {percentage.toFixed(2).replace(".", ",")} %
        </text>
      </svg>
    </div>
  );
};

export default DonutChart;
