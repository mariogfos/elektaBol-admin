"use client";

import React, { useEffect, useState } from "react";
import styles from "./Affiliates.module.css";
import useAxios from "@/mk/hooks/useAxios";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import {
  IconArrowDown,
  IconArrowUp,
} from "@/components/layout/icons/IconsBiblioteca";
import { useAuth } from "@/mk/contexts/AuthProvider";

const Affiliates = () => {
  const [affiliatesData, setAffiliatesData] = useState<any[]>([]);
  const [activeAccordions, setActiveAccordions] = useState<any>({});
  const [nestedData, setNestedData] = useState<any>({});
  const [noAffiliatesMessage, setNoAffiliatesMessage] = useState<any>({});
  const [loading, setLoading] = useState<any>({});
  const { setStore } = useAuth();
  const [isClosing, setIsClosing]: any = useState(false);

  useEffect(() => {
    setStore({
      title: "Red de afiliados",
    });
  }, []);

  const { data: affiliates, execute } = useAxios("/affiliates", "GET", {
    fullType: "L",
    searchBy: "",
  });

  useEffect(() => {
    if (affiliates) {
      setAffiliatesData(affiliates?.data);
    }
  }, [affiliates]);

  const closeAllChildren = (affiliate_id: any, level: number) => {
    const accordionKey = `${affiliate_id}-${level}`;
    setIsClosing((prevIsClosing: any) => ({
      ...prevIsClosing,
      [affiliate_id]: true,
    }));

    setTimeout(() => {
      setActiveAccordions((prevActive: any) => {
        const updatedAccordions = { ...prevActive };
        if (updatedAccordions[level]) {
          updatedAccordions[level] = updatedAccordions[level].filter(
            (key: any) => key !== accordionKey
          );
        }
        return updatedAccordions;
      });

      if (nestedData[affiliate_id]) {
        nestedData[affiliate_id].forEach((child: any) => {
          closeAllChildren(child.affiliate_id, level + 1);
        });

        setNestedData((prevData: any) => ({
          ...prevData,
          [affiliate_id]: null,
        }));
      }

      setIsClosing((prevIsClosing: any) => ({
        ...prevIsClosing,
        [affiliate_id]: false,
      }));
    }, 300);
  };

  // const resetNestedDataAtLevel = (level: number) => {
  //   setNestedData((prevData: any) => {
  //     const updatedData = { ...prevData };

  //     Object.keys(updatedData).forEach((affiliate_id) => {
  //       if (activeAccordions[level]?.includes(`${affiliate_id}-${level}`)) {
  //         closeAllChildren(affiliate_id, level);
  //       }
  //     });

  //     return updatedData;
  //   });
  // };

  function handleLeaderClick(affiliate_id: any, level: number) {
    const accordionKey = `${affiliate_id}-${level}`;
    if (activeAccordions[level]?.includes(accordionKey)) {
      closeAllChildren(affiliate_id, level);
      setNoAffiliatesMessage((prevData: any) => ({
        ...prevData,
        [affiliate_id]: false,
      }));
      setLoading((prevData: any) => ({
        ...prevData,
        [affiliate_id]: false,
      }));
      return;
    }

    // resetNestedDataAtLevel(level);

    setLoading((prevData: any) => ({
      ...prevData,
      [affiliate_id]: true,
    }));

    execute("/affiliates", "GET", {
      fullType: "L",
      searchBy: affiliate_id,
    }).then((response: any) => {
      const newData = response.data.data;

      if (newData && newData.length === 0) {
        setNoAffiliatesMessage((prevData: any) => ({
          ...prevData,
          [affiliate_id]: true,
        }));
      } else {
        setNestedData((prevData: any) => ({
          ...prevData,
          [affiliate_id]: newData,
        }));
        setNoAffiliatesMessage((prevData: any) => ({
          ...prevData,
          [affiliate_id]: false,
        }));
      }

      setLoading((prevData: any) => ({
        ...prevData,
        [affiliate_id]: false,
      }));
    });

    // En lugar de reemplazar, agregamos el nuevo acordeón activo al nivel
    setActiveAccordions((prevActive: any) => ({
      ...prevActive,
      [level]: [...(prevActive[level] || []), accordionKey],
    }));
  }

  const renderLevel = (data: any[], level: number) => {
    if (level > 5) {
      return null;
    }

    return data?.map((leader: any, index) => {
      const accordionKey = `${leader.affiliate_id}-${level}`;
      const levelClass = `level-${level}`;

      return (
        <div key={leader.id}>
          <div
            className={`${styles.affiliatesItem} ${styles[levelClass]}`}
            style={{
              ...(loading[leader.affiliate_id] ? { cursor: "wait" } : {}),
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <p
                style={{
                  color: "#C6C6C6",
                }}
              >
                {index + 1} / {data.length}
              </p>
              <Avatar
                name={getFullName(leader.affiliate)}
                src={getUrlImages("/AFF-" + leader.affiliate_id + ".webp?d=")}
              />
              <div>
                <p style={{ fontWeight: 700 }}>
                  {getFullName(leader.affiliate)}
                </p>
                <p>
                  {leader.dsponsors_count === 0
                    ? "Sin afiliados directos"
                    : leader.dsponsors_count === 1
                    ? "1 afiliado directo"
                    : `${leader.dsponsors_count} afiliados directos`}
                </p>
              </div>
            </div>
            <div
              style={{
                cursor:
                  level === 5 || leader.dsponsors_count === 0
                    ? "default"
                    : "pointer",
                opacity: leader.dsponsors_count === 0 ? 0.5 : 1,
              }}
              onClick={
                level === 5 || leader.dsponsors_count === 0
                  ? undefined
                  : loading[leader.affiliate_id]
                  ? undefined
                  : () => handleLeaderClick(leader.affiliate_id, level)
              }
            >
              {level < 5 &&
                (activeAccordions[level]?.includes(accordionKey) ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px",
                      backgroundColor: "white",
                      color: "black",
                      borderRadius: "100%",
                    }}
                  >
                    <IconArrowUp
                      style={{
                        width: "16px",
                        height: "16px",
                        fill: "var(--cBlack)",
                        cursor:
                          leader.dsponsors_count === 0 ? "default" : "pointer",
                      }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px",
                      backgroundColor: "white",
                      color: "black",
                      borderRadius: "100%",
                    }}
                  >
                    <IconArrowDown
                      style={{
                        width: "16px",
                        height: "16px",
                        fill: "var(--cBlack)",
                        cursor:
                          leader.dsponsors_count === 0 ? "default" : "pointer",
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>
          {activeAccordions[level]?.includes(accordionKey) && (
            <div
              className={styles.directAffiliates}
              style={{
                transition: "all 0.5s ease",
                ...(loading[leader.affiliate_id] ||
                isClosing[leader.affiliate_id]
                  ? { opacity: 0.5, transform: "translateY(-20px)" }
                  : { opacity: 1, transform: "translateY(0)" }),
              }}
            >
              {loading[leader.affiliate_id] ? (
                <div className={styles.loading}>
                  <span className={styles.loader}></span>
                </div>
              ) : noAffiliatesMessage[leader.affiliate_id] ? (
                <div className={styles.noAffiliatesMessage}>
                  No tienes afiliados directos
                </div>
              ) : (
                nestedData[leader.affiliate_id] &&
                renderLevel(nestedData[leader.affiliate_id], level + 1)
              )}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className={styles.affiliates}>
      <div className={styles.affiliatesList}>
        <h1
          style={{
            position: "absolute",
            top: "-20px",
            left: "0",
          }}
        >
          Líderes de barrio
        </h1>
        {renderLevel(affiliatesData, 1)}
      </div>
    </div>
  );
};

export default Affiliates;
