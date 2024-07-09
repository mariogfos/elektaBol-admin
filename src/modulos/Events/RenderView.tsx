import DataModal from "@/mk/components/ui/DataModal/DataModal";
import { getUrlImages } from "@/mk/utils/string";
import { useEffect, useState } from "react";
import style from './Events.module.css'

const RenderView = (props: {
  open: boolean;
  onClose: any;
  item: Record<string, any>;
  onConfirm?: Function;
}) => {
  const { data } = props?.item;

  return (
    <DataModal
      open={props.open}
      onClose={props?.onClose}
      title={"Detalle del Contenido"}
      buttonText=""
      buttonCancel=""
    >   <div style={{backgroundColor:'transparent'}}className={style['cardEventContainer']}>
    <div>
   <img style={{width:156,height:156,borderRadius:8}} src={getUrlImages(
        "/EVENT-" +
          data?.id +
          "." +
          data?.ext +
          "?" +
          data?.updated_at
      )}/>
      </div>
      <div>
        <div className="tTitle" style={{marginBottom:8}}>{data?.name}</div>
        <div className="tSubtitle"style={{marginBottom:8}}>{data?.description}</div>
        <div>{data?.assists}  asistiran</div>
      </div>
   </div>

    </DataModal>
  );
};

export default RenderView;
