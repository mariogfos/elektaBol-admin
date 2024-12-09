import { IconDownload } from "@/components/layout/icons/IconsBiblioteca";
import Input from "@/mk/components/forms/Input/Input";
import Select from "@/mk/components/forms/Select/Select";
import TextArea from "@/mk/components/forms/TextArea/TextArea";
import { UploadFile } from "@/mk/components/forms/UploadFile/UploadFile";
import { getUrlImages } from "@/mk/utils/string";
import { ActionType } from "@/mk/utils/validate/Rules";
import { memo } from "react";

export type FormFunctionRenderType = {
  item: Record<string, any>;
  key: string;
  user: Record<string, any>;
  onChange: (e: any) => void;
  error?: Record<string, any>;
};

const rigthFile = (data: {
  key: string;
  user?: Record<string, any>;
  item: Record<string, any>;
  field?: Record<string, any>;
}) => {
  if (!data.item.ext) return null;
  return (
    <div style={{ flexShrink: "1" }}>
      <IconDownload
        size={data.field?.size || 40}
        color={data.field?.color || "white"}
        onClick={() => {
          window.open(
            getUrlImages(
              "/" +
                data.field?.prefix +
                "-" +
                data.item.id +
                "." +
                data.item.ext +
                "?" +
                data.item.updated_at
            ),
            "_blank"
          );
        }}
      />
    </div>
  );
};

const LeftRigthElement = memo(
  ({
    children,
    field,
    item,
    error = {},
    user,
    onChange,
  }: {
    children: any;
    field: any;
    item: any;
    error: any;
    user: any;
    onChange: (e: any) => void;
  }) => {
    if (!field.onLeft && !field.onRigth && !field.onTop && !field.onBottom)
      return children;
    const props: FormFunctionRenderType = {
      item,
      key: field.key,
      user,
      onChange,
      error,
    };
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spM)",
        }}
      >
        {field.onTop?.(props)}
        <div
          style={{
            display: "flex",
            gap: "var(--spM)",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {field.onLeft?.(props)}
          {children}
          {field.onRigth?.(props)}
        </div>
        {field.onBottom?.(props)}
      </div>
    );
  }
);
LeftRigthElement.displayName = "LeftRigthElement";

const FormElement = memo(
  ({
    field,
    item,
    i,
    onChange,
    error,
    setError,
    data,
  }: {
    field: any;
    item: any;
    i?: number;
    onChange: (e: any) => void;
    error: any;
    setError: Function;
    data: { user: any; action: ActionType; mod: any; extraData: any };
  }) => {
    const _field = {
      ...field,
      ...(field[data?.action] ? field[data?.action] : {}),
    };
    if (_field.onHide?.({ item, user: data?.user, key: _field.key }))
      return null;
    const options =
      data?.mod.extraData && _field.optionsExtra
        ? [
            ...(_field.addOptions || []),
            ...(data?.extraData[_field.optionsExtra] || []),
          ]
        : [...(_field.addOptions || []), ...(_field.options || [])];

    const props = {
      key: _field.key,
      field: _field,
      item: item,
      error: error,
      user: data?.user,
      onChange: onChange,
    };
    let val = item[_field.key] || "";
    switch (_field.type) {
      case "text":
      case "date":
      case "number":
        if (_field.type == "date") {
          val = val.split(" ")[0];
          val = val.split("T")[0];
        }
        return (
          <LeftRigthElement
            // key={_field.key}
            // field={_field}
            // item={item}
            // error={error}
            // user={data?.user}
            // onChange={onChange}
            {...props}
          >
            <Input
              type={_field.type}
              name={_field.key}
              value={val}
              onChange={onChange}
              label={_field.label}
              disabled={_field.disabled}
              onBlur={_field.onBlur}
              error={error}
              onFocus={_field.onFocus}
              iconLeft={_field.iconLeft}
              iconRight={_field.iconRight}
              placeholder={_field.placeholder}
              className={_field.className}
              style={_field.style}
              readOnly={_field.readOnly}
              required={_field.required}
            />
          </LeftRigthElement>
        );
      case "textArea":
        return (
          <LeftRigthElement {...props}>
            <TextArea
              name={_field.key}
              value={item[_field.key]}
              onChange={onChange}
              label={_field.label}
              disabled={_field.disabled}
              onBlur={_field.onBlur}
              error={error}
              onFocus={_field.onFocus}
              iconLeft={_field.iconLeft}
              iconRight={_field.iconRight}
              placeholder={_field.placeholder}
              className={_field.className}
              style={_field.style}
              readOnly={_field.readOnly}
              required={_field.required}
              lines={_field.lines}
            />
          </LeftRigthElement>
        );
      case "imageUpload":
        return (
          <LeftRigthElement {...props}>
            <UploadFile
              name={_field.key}
              value={item[_field.key]}
              onChange={onChange}
              label={_field.label}
              disabled={_field.disabled}
              onBlur={_field.onBlur}
              error={error}
              onFocus={_field.onFocus}
              iconLeft={_field.iconLeft}
              iconRight={_field.iconRight}
              placeholder={_field.placeholder}
              className={_field.className}
              style={_field.style}
              readOnly={_field.readOnly}
              required={_field.required}
              ext={_field.ext || ["jpg", "png", "jpeg"]}
              setError={setError}
              img={true}
            />
          </LeftRigthElement>
        );
      case "fileUpload":
        return (
          <LeftRigthElement {...props}>
            <UploadFile
              name={_field.key}
              value={item[_field.key]}
              onChange={onChange}
              label={_field.label}
              disabled={_field.disabled}
              onBlur={_field.onBlur}
              error={error}
              onFocus={_field.onFocus}
              iconLeft={_field.iconLeft}
              iconRight={_field.iconRight}
              placeholder={_field.placeholder}
              className={_field.className}
              style={_field.style}
              readOnly={_field.readOnly}
              required={_field.required}
              ext={_field.ext || ["pdf", "doc", "docx", "xls", "xlsx"]}
              setError={setError}
            />
          </LeftRigthElement>
        );
      case "select":
        return (
          <LeftRigthElement {...props}>
            <Select
              name={_field.key}
              value={item[_field.key]}
              onChange={onChange}
              label={_field.label}
              disabled={_field.disabled}
              onBlur={_field.onBlur}
              error={error}
              onFocus={_field.onFocus}
              iconLeft={_field.iconLeft}
              iconRight={_field.iconRight}
              placeholder={_field.placeholder}
              className={_field.className}
              style={_field.style}
              readOnly={_field.readOnly}
              required={_field.required}
              options={options}
              optionLabel={_field.optionLabel}
              optionValue={_field.optionValue}
              multiSelect={_field.multiSelect}
              filter={_field.filter}
            />
          </LeftRigthElement>
        );
      default:
        return (
          <div>
            {_field.label}:{" "}
            {_field.onRender
              ? _field.onRender({
                  value: item[_field.key],
                  key: _field.key,
                  item,
                  i,
                })
              : item[_field.key]}
          </div>
        );
    }
  }
);
FormElement.displayName = "FormElement";
export default FormElement;
