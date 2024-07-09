/* eslint-disable react-hooks/exhaustive-deps */
import { getFullName, getUrlImages } from "@/mk/utils/string";
import { Avatar } from "../Avatar/Avatar";
import { Card } from "../Card/Card";
import styles from "./LLeaderShipHierarchy.module.css";
import TagLabel from "../TagLabel/TagLabel";
import { useEffect } from "react";
import { formatNumber } from "@/mk/utils/numbers";
import { IconAdd } from "@/components/layout/icons/IconsBiblioteca";
import { lLevels } from "@/components/Users/type";
import Line1 from "./Line1";
import { formatNumberCustom } from "@/mk/utils/date";

interface Props {
  user: any;
  line1: any;
  line2: any;
  params: any;
  setParams: Function;
  addClick?: any;
  listaActual: any;
  level: number;
  setLevel: Function;
  setParamsHist: Function;
  entidad: string;
}

const LeadershipHierarchy = ({
  user,
  line1,
  line2,
  params,
  setParams,
  addClick,
  listaActual,
  level,
  setLevel,
  setParamsHist,
  entidad,
}: Props) => {
  const handleButtonPress = (props: any) => {
    setParamsHist((old: any) => [...old, params]);
    setParams({
      ...params,
      level: props.level + 1,
      searchBy: props.entity.id,
      lista_id: listaActual,
    });
  };

  useEffect(() => {
    if (params?.level) {
      setLevel(params?.level);
    }
  }, [params?.level]);
  const charges: any = {
    0: "Administrador de partido",
    1: "Administrador de sublema",
    2: "Administrador de lista",
    3: "Coordinador departamental",
    4: "Delegados de localidad",
    5: "Líder de barrio",
  };

  return (
    <>
      <TagLabel
        // label={"Nivel " + lLevels[level] + ": " + entidad}
        label="Gabinete"
        styles={{ backgroundColor: "var(--cError)" }}
      />
      <div className={styles.leadershipHierarchy}>
        <Line1
          line1={line1}
          level={level}
          user={user}
          addClick={addClick}
          params={params}
        />
        {level < 6 && (
          <>
            <TagLabel
              label={lLevels[level + 1] + (level + 1 == 5 ? "es" : "s")}
              styles={{ display: "flex", alignSelf: "flex-start" }}
            />
            <div className={styles["carouselCards"]}>
              {line2?.map((entity: any, index: any) => (
                <div
                  key={index}
                  onClick={() => handleButtonPress({ entity, level })}
                >
                  <Card className={styles.card}>
                    <div className={styles["entityContent"]}>
                      <div></div>
                      <div>{lLevels[level + 1]}</div>
                      <div
                        style={{
                          height: "24px",
                          gap: "2px",
                          justifyContent: "space-between",
                          alignItems: "center",
                          fontSize: "var(--spM)",
                          display: "flex",
                        }}
                      >
                        <div style={{ textWrap: "wrap", textAlign: "left" }}>
                          {entity?.name}
                        </div>
                        <div style={{ color: "var(--cSuccess)" }}>
                          {index + 1}/{line2.length}
                        </div>
                      </div>
                    </div>
                    <div className={styles["entityContent"]}>
                      <div></div>
                      <div>Gabinete</div>
                    </div>
                    {entity?.line3?.data?.length > 0 ? (
                      <div
                        onClick={() => handleButtonPress({ entity, level })}
                        style={{
                          display: "flex",
                          gap: 4,
                          justifyContent: "center",
                          alignItems: "center",
                          height: 60,
                        }}
                      >
                        {entity.line3.data
                          .slice(0, 2)
                          .map((line3: any, index2: number) => (
                            // <div key={index2}>
                            <div key={index2 + "aa"}>
                              <Avatar
                                name={getFullName(line3)}
                                src={getUrlImages(
                                  "/ADM-" +
                                    line3?.id +
                                    ".png?d=" +
                                    line3?.updated_at
                                )}
                                w={32}
                                h={32}
                                className={styles.avatarChildren}
                              />
                            </div>
                            // </div>
                          ))}
                        {entity?.line3?.total > 2 && (
                          <div
                            style={{
                              color: "var(--cBlackV2)",
                              marginLeft: 4,
                            }}
                          >
                            {"+" + (entity?.line3?.total - 2)}
                          </div>
                        )}
                      </div>
                    ) : user?.role?.level == level ? (
                      <div
                        style={{
                          display: "flex",
                          alignSelf: "center",
                          flexDirection: "column",
                          width: "60px",
                          height: "60px",
                          border: "1px dashed var(--cBlackV3)",
                          padding: "4px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            backgroundColor: "var(--cBlackV3)",
                            alignSelf: "center",
                            alignItems: "center",
                            cursor: "pointer",
                            flexDirection: "row",
                            padding: "8",
                            borderRadius: "50%",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            addClick(entity, 2);
                          }}
                          className={styles.addButton}
                        >
                          <IconAdd size={16} />
                        </div>
                        <div
                          style={{
                            fontSize: "var(--sS)",
                            color: "var(--cWhite)",
                          }}
                        >
                          Agregar
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          // color: "var(--cError)",
                          fontSize: "var(--spM)",
                          maxWidth: 120,
                          height: 60,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        Sin miembros registrados
                      </div>
                    )}
                    <div className={styles["entityContent"]}>
                      <div></div>
                      <div>Afiliados</div>
                      <div>{formatNumber(entity?.affiliates_count, 0)}</div>
                    </div>
                  </Card>
                  {/* <div style={{ position: "relative" }}>
                    {index === 0 && (
                      <TagLabel
                        label={"Gabinete de " + lLevels[level + 1] + "s"}
                        styles={{
                          position: "absolute",
                          left: 0,
                          top: 2,
                          display: "flex",
                          alignSelf: "flex-start",
                          backgroundColor: "var(--cSuccess)",
                        }}
                      />
                    )}
                  </div>
                  <Card className={styles.childrenCard}>
                    <div> */}
                  {/* {entity?.line3?.data?.length > 0 ? (
                        <div
                          onClick={() => handleButtonPress({ entity, level })}
                        >
                          {entity.line3.data
                            .slice(0, 2)
                            .map((line3: any, index2: number) => (
                              <div key={index2}>
                                <div key={index2 + "aa"}>
                                  <Avatar
                                    name={getFullName(line3)}
                                    w={32}
                                    h={32}
                                    className={styles.avatarChildren}
                                  />
                                </div>
                              </div>
                            ))}
                          {entity?.line3?.total > 2 && (
                            <div
                              style={{
                                color: "var(--cBlackV2)",
                                marginLeft: 4,
                              }}
                            >
                              {"+" + (entity?.line3?.total - 2)}
                            </div>
                          )}
                        </div>
                      ) : user?.role?.level == level ? (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            // marginBottom: -16,
                            width: "60px",
                            height: "60px",
                            // backgroundColor: "red",
                            border: "1px dashed var(--cBlackV3)",
                            padding: "4px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              backgroundColor: "var(--cBlackV3)",
                              alignSelf: "center",
                              alignItems: "center",
                              cursor: "pointer",
                              flexDirection: "row",
                              padding: "8",
                              borderRadius: "50%",
                            }}
                            onClick={() => addClick(entity, 2)}
                            className={styles.addButton}
                          >
                            <IconAdd size={16} />
                          </div>
                          <div
                            style={{
                              fontSize: "var(--sS)",
                              color: "var(--cWhite)",
                            }}
                          >
                            Agregar
                          </div>
                        </div>
                      ) : (
                        <div
                          style={{
                            color: "var(--cError)",
                            fontSize: "var(--spM)",
                            maxWidth: 120,
                          }}
                        >
                          Sin miembros registrados
                        </div>
                      )} */}
                  {/* </div> */}
                  {/* <div style={{ fontSize: 10, marginTop: 16 }}>
                      {charges[level + 1]}
                    </div> */}
                  {/* </Card> */}
                </div>
              ))}
              {level == 5 && (
                <Card className={styles.card}>
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "60px",
                        height: "60px",
                        border: "1px dashed var(--cBlackV3)",
                        padding: "4px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          backgroundColor: "var(--cBlackV3)",
                          alignSelf: "center",
                          alignItems: "center",
                          cursor: "pointer",
                          flexDirection: "row",
                          padding: "8",
                          borderRadius: "50%",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          addClick({ id: -1 }, 2);
                        }}
                        className={styles.addButton}
                      >
                        <IconAdd size={16} />
                      </div>
                      <div
                        style={{
                          fontSize: "var(--sS)",
                          color: "var(--cWhite)",
                        }}
                      >
                        Agregar
                      </div>
                    </div>
                    <br />
                    Para un Barrio nuevo...
                  </div>
                </Card>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LeadershipHierarchy;
