import DataModal from '@/mk/components/ui/DataModal/DataModal'
import React from 'react'
import style from './users.module.css'
import { Avatar } from '@/mk/components/ui/Avatar/Avatar';
import { getFullName, getUrlImages } from '@/mk/utils/string';

type PropsDetailUsers = {
    open: boolean;
    close: () => void;
    item: any;
}

const DetailUsers = ({open,close,item}:PropsDetailUsers) => {
  return (
  <DataModal
    open={open}
    onClose={()=>close()}
    title="Detalle de Usuario"
    buttonText=''
    buttonCancel=''
  >
    <Avatar name={getFullName(item)}  src={getUrlImages('/ADM-' + item.id + '.png?d=' + item.updated_at)}/>
    <div className={style.detailUsers}>
    <div>CI: {item.ci}</div>
    <div>Nombre: {item.name}</div>
    <div>Apellido: {item.last_name}</div>
    <div>Telefono: {item.phone}</div>
    <div>Email: {item.email}</div>
    </div>

    
  </DataModal>
  )
}

export default DetailUsers