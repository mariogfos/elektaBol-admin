import DataModal from "@/mk/components/ui/DataModal/DataModal";
import styles from "./Candidates.module.css";
import { getUrlImages } from "@/mk/utils/string";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import { getFullName } from "../../mk/utils/string";
import useAxios from "@/mk/hooks/useAxios";
import {
  IconBorn,
  IconCandidates,
  IconProfession,
} from "@/components/layout/icons/IconsBiblioteca";

const RenderView = (props: {
  open: boolean;
  onClose: any;
  item: Record<string, any>;
  onConfirm?: Function;
  extraData?: any;
}) => {
  // const { data: typeCant } = useAxios("/typecands", "GET", {
  //   fullType: "L",
  //   searchBy: "",
  // });

  //   console.log(typeCant);
  return (
    <DataModal
      open={props.open}
      onClose={props?.onClose}
      title={"Detalle del Candidato"}
      buttonText=""
      buttonCancel=""
    >
      <div className={styles.container}>
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: "100%",
              overflow: "hidden",
              height: "300px",
              borderRadius: 8,
            }}
          >
            <img
              src={getUrlImages(
                "/PCAND-" + props.item.id + ".webp?d=" + props.item.updated_at
              )}
              alt={props.item?.data?.name}
              style={{
                width: "100%",
                height: "auto",
                overflow: "visible",
                borderRadius: 8,
              }}
            />
          </div>
          <Avatar
            className={styles.avatar}
            name={props.item?.data?.name}
            src={getUrlImages(
              "/CAND-" + props.item.id + ".webp?d=" + props.item.updated_at
            )}
            h={140}
            w={140}
          />
        </div>
        {/* <img
          src={getUrlImages(
            "/CAND-" + props.item.id + ".webp?d=" + props.item.updated_at
          )}
          alt={props.item?.data?.name}
          width={100}
          height={100}
        /> */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <p
              style={{
                marginTop: 80,
                color: "var(--cWhite)",
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              {getFullName(props.item)}
            </p>
            <p className={styles.description}>{props.item?.title}</p>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <IconCandidates color="var(--cBlackV2)" />
              <p className={styles.subtitle}>
                {
                  props.extraData?.typeCands?.find(
                    (e: any) => e.id == props.item?.typecand_id
                  ).name
                }
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <IconProfession color="var(--cBlackV2)" />
              <p className={styles.subtitle}>{props.item?.profession}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <IconBorn color="var(--cBlackV2)" />
              <p className={styles.subtitle}>
                {"Nacido en " + props.item?.born}
              </p>
            </div>
          </div>
          {/* <div style={{ display: "flex", alignItems: "center" }}>
          {props.item?.born}
        </div> */}
          <div>
            <p className={styles.title}>Biografía</p>
            <p style={{ marginTop: 12 }} className={styles.subtitle}>
              {props.item?.biography}
            </p>
          </div>
          <div>
            <p className={styles.title}>Experiencia política</p>
            <p className={styles.subtitle} style={{ marginTop: 12 }}>
              {props.item?.experience}
            </p>
          </div>
          <div>
            <p className={styles.title}>Plan de gobierno</p>
            <p className={styles.subtitle} style={{ marginTop: 12 }}>
              {props.item?.plan_goverment}
            </p>
          </div>
        </div>
      </div>
    </DataModal>
  );
};

export default RenderView;
