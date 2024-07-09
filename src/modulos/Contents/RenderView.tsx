import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import DataModal from "@/mk/components/ui/DataModal/DataModal";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import styles from "./Contents.module.css"
import { IconDocs, IconDownload } from "@/components/layout/icons/IconsBiblioteca";
import { getDateStrMes } from "@/mk/utils/date";

const RenderView = (props: {
  open: boolean;
  onClose: any;
  item: Record<string, any>;
  onConfirm?: Function;
}) => {
  const { data } = props?.item;
  console.log(data, "dat")
  return (
    <DataModal
      open={props.open}
      onClose={props?.onClose}
      title={"Detalle del Contenido"}
      buttonText=""
      buttonCancel=""
    >
      <div style={{marginTop:16}} >
        <ItemList title={getFullName(props?.item?.data?.user)} subtitle={ <>
          <div>{ data?.user?.role1[0]?.description }</div>
          <div>{getDateStrMes(props?.item?.data?.created_at)}</div>
        </>} left={<Avatar name={getFullName(props?.item?.data?.user)} src={props?.item?.data?.user} />} />
        <div className={styles['renderViewDescription']}>
          {props?.item?.data?.description}
          <div className={styles['renderViewImage']} style={{}}>
            {props?.item?.data?.type == "I" && (<img alt='' width={698} height={298} style={{ resize: "inherit", objectFit: 'contain' }} 
            src={getUrlImages(
                   '/CONT-' + data?.id + '.' + data?.url + '?d=' + data?.updated_at
                )} />)}
            {props?.item?.data?.type == "D" && (
              <a style={{ color: 'white' }} target='_blank' href={getUrlImages(
                '/CONT-' + data?.id + '.' + data?.url + '?d=' + data?.updated_at
              )}><IconDocs size={64} /></a>)}
            {props?.item?.data?.type == "V" && (<a style={{ color: 'white' }} target='_blank' href={data?.url}><IconDownload size={64} /></a>)}
          </div>

        </div>
        <div>
          {props.item.data.comments?.map((o: any, i: number) => (
            <p key={i}>{o.name}</p>
          ))}
        </div>
      </div>

    </DataModal>
  );
};

export default RenderView;
