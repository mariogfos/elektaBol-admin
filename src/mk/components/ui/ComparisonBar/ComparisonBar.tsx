import React from "react";
import style from './ComparisonBar.module.css';

interface ComparisonBarProps {
  data: {
    total: number; 
    progress: number; 
  };
  labels: {
    totalLabel: string; 
    progressLabel: string;
  };
  colors: {
    totalColor: string; 
    progressColor: string; 
  };
  range?: boolean;
  height?: number;
}

const generateRange = (total: number): number[] => {
  const step = Math.ceil(total / 4); 
  return [0, step, step * 2, step * 3, total];
};

const ComparisonBar: React.FC<ComparisonBarProps> = ({
  data,
  labels,
  colors,
  range = false,
  height
}) => {
  // Asegúrate de que el ancho máximo sea 100%
  const progressWidth = Math.min((data.progress / data.total) * 100, 100);
  const dynamicRange = generateRange(data.total);

  return (
    <div className={style['comparisonBar']}>
      {/* Barra principal (Total) */}
      <div style={{ position: "relative", backgroundColor: colors?.totalColor, height: height }}>
        {/* Barra de progreso */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${progressWidth}%`,
            backgroundColor: colors.progressColor,
            height: "100%",
            transition: "width 0.3s",
            borderBottomRightRadius: 4,
            borderTopRightRadius: 4,
          }}
        ></div>
        {/* Texto sobre la barra */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 10px",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          <span>{data.progress}</span>
          <span>{data.total}</span>
        </div>
      </div>

      {range && (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
          {dynamicRange.map((value, index) => (
            <span key={index}>{value.toLocaleString()}</span>
          ))}
        </div>
      )}

      {/* Leyendas */}
      <div style={{ marginTop: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
          <div
            style={{
              width: "16px",
              height: "16px",
              backgroundColor: colors.progressColor,
              borderRadius: "50%",
            }}
          ></div>
          <span>{labels.progressLabel}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div
            style={{
              width: "16px",
              height: "16px",
              backgroundColor: colors.totalColor,
              borderRadius: "50%",
            }}
          ></div>
          <span>{labels.totalLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default ComparisonBar;
