import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import DataModal from "@/mk/components/ui/DataModal/DataModal";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import styles from "./Contents.module.css";
import {
  IconArrowLeft,
  IconArrowRight,
  IconComment,
  IconLike,
} from "@/components/layout/icons/IconsBiblioteca";
import { getDateStrMes } from "@/mk/utils/date";
import List from "@/mk/components/ui/List/List";
import ReactPlayer from "react-player";
import { useState } from "react";
import DetailAffiliate from "@/components/AffiliatesOld/DetailAffiliate";
import { useAuth } from "@/mk/contexts/AuthProvider";

const RenderView = (props: {
  open: boolean;
  onClose: any;
  item: Record<string, any>;
  onConfirm?: Function;
  extraData?: any;
}) => {
  const { data } = props?.item;
  const extraData = props?.extraData;
  const [idOpenAff, setIdOpenAff]: any = useState({ open: false, id: "" });
  const entidad = [
    "",
    "",
    "Departamento",
    "Provincia",
    "Municipio",
    "Distrito munucipal",
    "Barrio",
  ];
  const { user } = useAuth();
  const commentList = (item: any) => {
    if (item?.affiliate == null) {
      return;
    }
    return (
      <ItemList
        title={getFullName(item.affiliate)}
        subtitle={item?.comment}
        left={
          <Avatar
            onClick={() => setIdOpenAff({ open: true, id: item.affiliate.id })}
            name={getFullName(item.affiliate)}
            src={getUrlImages(
              "/AFF-" +
                item?.affiliate?.id +
                ".webp?d=" +
                item?.affiliate?.updated_at
            )}
          />
        }
      />
    );
  };

  const [indexVisible, setIndexVisible] = useState(0);
  const nextIndex = () => {
    setIndexVisible((prevIndex) => (prevIndex + 1) % data?.images?.length);
  };
  const prevIndex = () => {
    setIndexVisible((prevIndex) =>
      prevIndex === 0 ? data?.images?.length - 1 : prevIndex - 1
    );
  };
  const getDestinys = () => {
    let lEntidad: any = [];
    data.cdestinies.map((item: any, index: number) => {
      if (data.destiny == 2) {
        lEntidad.push({
          id: item.dpto_id,
          name: extraData.dptos.find((dpto: any) => dpto.id == item.dpto_id)
            ?.name,
        });
      }
      if (data.destiny == 3) {
        lEntidad.push({
          id: item.prov_id,
          name: extraData.provs.find((prov: any) => prov.id == item.prov_id)
            ?.name,
        });
      }
      if (data.destiny == 4) {
        lEntidad.push({
          id: item.mun_id,
          name: extraData.muns.find((mun: any) => mun.id == item.mun_id)?.name,
        });
      }
      if (data.destiny == 5) {
        lEntidad.push({
          id: item.dmun_id,
          name: extraData.dmuns.find((dmun: any) => dmun.id == item.dmun_id)
            ?.name,
        });
      }
      if (data.destiny == 6) {
        lEntidad.push({
          id: item.barrio_id,
          name: extraData.barrios.find(
            (barrio: any) => barrio.id == item.barrio_id
          )?.name,
        });
      }
    });
    return lEntidad;
  };
  console.log(getDestinys());
  console.log(data);
  return (
    <>
      <DataModal
        open={props.open}
        onClose={props?.onClose}
        title={"Detalle de la noticia"}
        buttonText=""
        buttonCancel=""
      >
        <div className={styles.container}>
          <div className={styles.content}>
            {data?.destiny != 0 && user?.role.level != data?.destiny && (
              <p style={{ marginBottom: 12, color: "var(--cInfo)" }}>
                Destino:{" "}
                {entidad[data.destiny] +
                  `${
                    getDestinys().length > 1
                      ? data.destiny == 5
                        ? "es"
                        : "s"
                      : ""
                  }`}{" "}
                {getDestinys()
                  .map((e: any) => e.name)
                  .join(", ")}
              </p>
            )}
            <ItemList
              title={getFullName(data.candidate)}
              subtitle={
                <>
                  <div>{data?.user?.role1[0]?.name}</div>
                  <div>{getDateStrMes(props?.item?.data?.created_at)}</div>
                </>
              }
              left={
                <Avatar
                  name={getFullName(data.candidate)}
                  src={getUrlImages(
                    "/CAND-" +
                      data?.candidate.id +
                      ".webp?d=" +
                      data?.candidate.updated_at
                  )}
                />
              }
            />
            {props?.item?.data?.description}
            <section className={styles["renderViewImage"]}>
              {props?.item?.data?.type == "I" && (
                <>
                  {data?.images?.length > 1 && (
                    <div
                      style={{
                        display: "flex",
                        position: "absolute",
                        justifyContent: "space-between",
                        padding: "0px 16px",
                        alignItems: "center",
                        width: "100%",
                        gap: 24,
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "#11111166",
                          padding: "6px",
                          borderRadius: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={prevIndex}
                      >
                        <IconArrowLeft />
                      </div>
                      <div
                        style={{
                          backgroundColor: "#11111166",
                          padding: "6px",
                          borderRadius: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={nextIndex}
                      >
                        <IconArrowRight />
                      </div>
                    </div>
                  )}

                  <img
                    alt=""
                    style={{
                      resize: "inherit",
                      objectFit: "contain",
                      display: "block",
                      width: "100%",
                      height: "100%",
                    }}
                    src={getUrlImages(
                      "/CONT-" +
                        data?.id +
                        "-" +
                        data?.images[indexVisible]?.id +
                        ".webp" +
                        "?" +
                        data?.updated_at
                    )}
                  />
                </>
              )}

              {props?.item?.data?.type == "D" && (
                <>
                  <iframe
                    src={getUrlImages(
                      "/CONT-" +
                        data?.id +
                        "." +
                        data?.url +
                        "?d=" +
                        data?.updated_at
                    )}
                    width="500"
                    height="500"
                  ></iframe>
                  {/* <a
                  style={{ color: "white" }}
                  target="_blank"
                  href={getUrlImages(
                    "/CONT-" +
                      data?.id +
                      "." +
                      data?.url +
                      "?d=" +
                      data?.updated_at
                  )}
                >
                  <IconDocs size={64} />
                </a> */}
                </>
              )}
              {props?.item?.data?.type == "V" && (
                // <a style={{ color: "white" }} target="_blank" href={data?.url}>
                //   <IconDownload size={64} />
                // </a>
                <ReactPlayer
                  url={data?.url}
                  width="100%"
                  height={480}
                  controls
                />
              )}
            </section>
          </div>
          <section className={styles["reactionsSection"]}>
            {/* <div>
            <p>Apoyos</p>
            <div>
              <IconLike size={40} color="var(--cInfo)" />
              {props?.item?.data?.likes}
            </div>
          </div>

          <div>
            <p>Comentarios</p>
            <div>
              {data?.comments.map((item: any, index: number) => (
                <div key={index}>
                  <ItemList
                    key={index}
                    style={{ marginLeft: -8 }}
                    title={getFullName(item.affiliate)}
                    subtitle={getDateStrMes(item?.created_at)}
                    left={
                      <Avatar
                        name={getFullName(item.affiliate)}
                        src={getUrlImages(
                          "/AFF-" +
                            item?.affiliate.id +
                            ".webp?d=" +
                            item?.affiliate.updated_at
                        )}
                      />
                    }
                  />
                  <p>{item?.comment}</p>
                </div>
              ))}
            </div>
          </div> */}
            <div>
              <div>
                <p>Apoyos</p>
                <p>
                  <IconLike color="var(--cInfo)" />
                  {props?.item?.data?.likes}
                </p>
              </div>
              <div>
                <p>Comentarios</p>
                <p>
                  <IconComment />
                  {props?.item?.data?.comments?.length}
                </p>
              </div>
            </div>
            {props?.item?.data?.comments?.length > 0 && (
              <>
                <h2>Comentarios:</h2>
                <List
                  data={props?.item?.data?.comments}
                  renderItem={commentList}
                />
              </>
            )}
          </section>
        </div>
      </DataModal>
      {idOpenAff.open && (
        <DetailAffiliate
          open={idOpenAff.open}
          close={() => setIdOpenAff({ open: false, id: 0 })}
          id={idOpenAff.id}
        />
      )}
    </>
  );
};

export default RenderView;
