import React from "react";
import styles from "./ProgresBar.module.css";
import { formatNumber } from "@/mk/utils/numbers";

const ProgressBar = ({ total, sent, pending }: any) => {
  const sentPercentage = (sent / total) * 100;
  const pendingPercentage = (pending / total) * 100;

  return (
    <>
      Importando un total de {total} registros
      <div className={styles.progressBar}>
        <div
          className={styles.progressBarSent}
          style={{ width: `${sentPercentage}%` }}
        >
          {formatNumber(sentPercentage, 1)}%
        </div>
        <div
          className={styles.progressBarPending}
          // style={{ width: `${pendingPercentage}%` }}
          style={{ width: `${pendingPercentage}%`, left: `${sentPercentage}%` }}
        >
          {formatNumber(pendingPercentage, 1)}%
        </div>
      </div>
    </>
  );
};
export default ProgressBar;
