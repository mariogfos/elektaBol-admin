import React, { useState } from "react";
import WidgetBase from "../WidgetBase/WidgetBase";
import styles from "./WidgetCandidates.module.css";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import DetailUsers from "@/components/Users/DetailUsers";

const WidgetCandidates = ({ data, params }: any) => {
  const candidates = data;
  const [userId, setUserId]: any = useState(null);

  return (
    <WidgetBase
      title={
        <span
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "var(--cWhite)",
          }}
        >
          {params?.level === 1
            ? "Candidatos a Asambleístas Nacionales"
            : params?.level === 2
            ? "Candidatos a Asambleístas por provincia"
            : "Sin Candidatos"}
        </span>
      }
      className={styles.widgetCandidates}
    >
      {candidates && candidates.length > 0 ? (
        <div>
          {candidates.map((candidate: any, index: number) => (
            <div key={index}>
              <p>{index + 1}</p>
              <Avatar
                className={styles.avatar}
                name={getFullName(candidate)}
                src={getUrlImages(
                  "/CAND-" + candidate?.id + ".webp?d=" + candidate?.updated_at
                )}
                h={48}
                w={48}
                onClick={(e) => {
                  e.preventDefault();
                  setUserId(candidate.id);
                }}
              />

              {getFullName(candidate)}
            </div>
          ))}
        </div>
      ) : (
        <p>No tienes candidatos</p>
      )}
      {userId && (
        <DetailUsers open={true} close={() => setUserId(null)} id={userId} />
      )}
    </WidgetBase>
  );
};

export default WidgetCandidates;
