/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import { Avatar } from "../Avatar/Avatar";
import styles from "./LLeaderShipHierarchy.module.css";
import {
  IconAdd,
  IconStarProfile,
} from "@/components/layout/icons/IconsBiblioteca";

interface Props {
  line1: any;
  level: number;
  user: any;
  addClick: any;
  params: any;
  userCan?: any;
}
const Line1 = ({
  line1,
  level,
  user,
  addClick,
  params,
  userCan = () => true,
}: Props) => {
  const [mainLeader, setMainLeader]: any = useState(
    line1?.find((leader: any) => leader.main === "M")
  );
  const [otherLeaders, setOtherLeaders] = useState([]);
  useEffect(() => {
    setMainLeader(line1?.find((leader: any) => leader.main === "M"));
    if (mainLeader != null) {
      setOtherLeaders(
        line1?.filter((leader: any) => leader.ci !== mainLeader.ci)
      );
    }
  }, [line1]);

  return (
    <Card
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 24,
        paddingBottom: 24,
      }}
    >
      <div style={{ width: "100%", display: "flex" }}>
        {mainLeader ? (
          <div style={{ display: "flex", alignItems: "center", width: 370 }}>
            <div className={styles["mainCard"]}>
              <div style={{ marginBottom: -25 }}>
                <Avatar
                  name={getFullName(mainLeader)}
                  src={getUrlImages(
                    "/ADM-" +
                      mainLeader?.user_id +
                      ".webp?d=" +
                      mainLeader?.user_updated_at
                  )}
                />
                <div style={{ position: "relative", top: -50, left: 30 }}>
                  <IconStarProfile />
                </div>
              </div>
              <div
                className="tTitle"
                style={{ fontSize: 16, marginTop: 8, textAlign: "center" }}
              >
                {getFullName(mainLeader)}
              </div>
              <div style={{ color: "var(--cBlackV2)", textAlign: "center" }}>
                {mainLeader?.role} <br />
                CI: {mainLeader.ci}
              </div>
            </div>
            {user?.role?.level === level &&
              user?.ci == mainLeader.ci &&
              userCan("users", "C") && (
                <div
                  style={{
                    border: "1px dashed var(--cWhiteV2)",
                    padding: "var(--sM)",
                  }}
                >
                  <div className={styles["addButton"]}>
                    <IconAdd
                      size={16}
                      onClick={() => addClick({ id: params.searchBy }, 1)}
                    />
                  </div>
                </div>
              )}
          </div>
        ) : (
          <>
            <div
              style={{
                // color: "var(--cError)",
                textAlign: "center",
                fontSize: "var(--spM)",
                maxWidth: 120,
                height: 60,
                display: "flex",
                alignItems: "center",
              }}
            >
              Sin miembro registrado
            </div>
            {user?.role?.level === level && user?.ci == mainLeader?.ci && (
              <div
                style={{
                  border: "1px dashed var(--cWhiteV2)",
                  padding: "var(--sM)",
                }}
              >
                <div className={styles["addButton"]}>
                  <IconAdd
                    size={16}
                    onClick={() => addClick({ id: params.searchBy }, 1)}
                  />
                </div>
              </div>
            )}
          </>
        )}

        <div
          className={styles["carouselCards"]}
          style={{
            borderLeft: "2px solid var(--cWhiteV1)",
            marginLeft: 8,
          }}
        >
          {otherLeaders?.map((leader: any, index: number) => (
            <div key={index} className={styles["mainCardContainer"]}>
              <div className={styles["mainCard"]}>
                <Avatar
                  name={getFullName(leader)}
                  src={getUrlImages(
                    "/ADM-" + leader.user_id + ".webp?d=" + leader.updated_at
                  )}
                />
                <div className="tTitle" style={{ fontSize: 16, marginTop: 8 }}>
                  {getFullName(leader)}
                </div>
                <p style={{ color: "var(--cBlackV2)" }}>
                  {leader?.role} <br /> CI: {leader?.ci}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Line1;
