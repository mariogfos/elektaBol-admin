import ControlLabel, { PropsTypeInputBase } from "../ControlLabel";
import styles from "./input.module.css";
interface PropsType extends PropsTypeInputBase {
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "hidden"
    | "file"
    | "search"
    | "checkbox";
}

const Input = (props: PropsType) => {
  const {
    type = "text",
    name,
    placeholder = "",
    onChange = (e) => {},
    value,
    disabled = false,
    required = false,
    readOnly = false,
    className = "",
    style = {},
    onBlur = () => {},
    onFocus = () => {},
    checked = false,
  } = props;
  return (
    <ControlLabel {...props} className={styles.input + " " + className}>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        name={name}
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        required={required}
        style={style}
        aria-autocomplete="none"
        autoComplete="new-password"
        checked={checked}
      />
    </ControlLabel>
  );
};

export default Input;
