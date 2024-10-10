import DataModal from "@/mk/components/ui/DataModal/DataModal";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import { useEffect, useState } from "react";
import style from "./Events.module.css";
import {
  IconComment,
  IconLike,
} from "@/components/layout/icons/IconsBiblioteca";
import List from "@/mk/components/ui/List/List";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";

const RenderView = (props: {
  open: boolean;
  onClose: any;
  item: Record<string, any>;
  onConfirm?: Function;
}) => {
  const { data } = props?.item;
  const commentList = (item: any) => {
    return (
      <ItemList
        title={getFullName(item.affiliate)}
        subtitle={item?.comment}
        left={
          <Avatar
            name={item?.name}
            src={getUrlImages(
              "/AFF-" + item?.affiliate_id + ".webp?d=" + item?.updated_at
            )}
          />
        }
      />
    );
  };
  return (
    <DataModal
      open={props.open}
      onClose={props?.onClose}
      title={"Detalle del evento"}
      buttonText=""
      buttonCancel=""
    >
      <>
        <div
          style={{ backgroundColor: "transparent" }}
          className={style["cardEventContainer"]}
        >
          <div>
            <img
              style={{ width: 156, height: 156, borderRadius: 8 }}
              src={getUrlImages(
                "/EVENT-" + data?.id + "." + data?.ext + "?" + data?.updated_at
              )}
            />
          </div>
          <div>
            <div className="tTitle" style={{ marginBottom: 8 }}>
              {data?.name}
            </div>
            <a
              target="_blank"
              href={data?.location}
              className="tSubtitle"
              style={{ marginBottom: 16, color: "var(--cInfo)" }}
            >
              {data?.address || data?.location}
            </a>
            <div className="tSubtitle" style={{ marginBottom: 8 }}>
              {data?.description}
            </div>
            <div>{data?.assists} asistirán</div>
          </div>
        </div>
        <section className={style["interaccionesEventContainer"]}>
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
      </>
    </DataModal>
  );
};

export default RenderView;
