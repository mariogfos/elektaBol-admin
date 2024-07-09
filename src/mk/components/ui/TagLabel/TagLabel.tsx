import styles from './TagLabel.module.css'

const TagLabel = (props:any) => {
  return (
    <div className={styles['TagLabel']} style={props.styles}>
     {props.label}
    </div>
  )
}

export default TagLabel