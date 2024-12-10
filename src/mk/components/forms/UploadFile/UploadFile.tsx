import { useEffect, useState } from "react";
import {
  IconArrowLeft,
  IconDocs,
  IconEdit,
  IconImage,
  IconPDF,
  IconTrash,
} from "../../../../components/layout/icons/IconsBiblioteca";
import styles from "./uploadFile.module.css";
import ControlLabel, { PropsTypeInputBase } from "../ControlLabel";
import { useAuth } from "@/mk/contexts/AuthProvider";

interface PropsType extends PropsTypeInputBase {
  ext: string[];
  setError: Function;
  img?: boolean;
  item?: any;
}
export const UploadFile = ({
  className = "",
  onChange = (e: any) => {},
  value = "",
  item = {},
  img = false,
  ...props
}: PropsType) => {
  const [selectedFiles, setSelectedFiles]: any = useState({});
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  // console.log(props, "props");
  const { showToast } = useAuth();

  const onError = (err: any) => {
    console.log("reader error", err);
  };

  useEffect(() => {
    if (value == "" || item[props.name]?.file == "delete") {
      // setSelectedFiles({});
    }
  }, [value, item]);

  const onChangeFile = (e: any) => {
    // props.setError({});
    props.setError({ ...props.error, [props.name]: "" });
    try {
      let file: any = null;
      if (e.dataTransfer) file = e.dataTransfer.files[0];
      else file = e.target.files[0];
      setSelectedFiles(file);

      if (
        !props.ext.includes(
          file.name
            .toLowerCase()
            .slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2)
        )
      ) {
        props.setError({ ...props.error, [props.name]: "" });
        setSelectedFiles({});
        showToast("Solo se permiten archivos " + props.ext.join(", "), "error");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const partes = file.name.split(".");
        let base64String = e.target.result
          .replace("data:", "")
          .replace(/^.+,/, "");
        base64String = encodeURIComponent(base64String);
        onChange({
          target: {
            name: props.name,
            value: { ext: partes[partes.length - 1], file: base64String },
          },
        });
      };
      reader.onerror = onError;
      reader.readAsDataURL(file);
    } catch (error) {
      setSelectedFiles({});
      onChange({
        target: {
          name: props.name,
          value: { ext: "", file: "" },
        },
      });
    }
  };
  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    onChangeFile(e);
  };

  const accept = () => {
    let accept: any = [];
    //   props.ext.map((ext) => {
    //     accept.push(`application/${ext}`);
    //   });
    //   return accept.join(",");

    props.ext.map((ext) => {
      accept.push(`.${ext}`);
    });
    return accept.join(",");
  };

  const deleteImg = (del = true) => {
    props.setError({ ...props.error, [props.name]: "" });

    if (!selectedFiles?.name) {
      onChange({
        target: {
          name: props.name,
          value: { ext: "", file: del == false ? "" : "delete" },
        },
      });
    }
    setSelectedFiles({});
    // onChange &&
    //   onChange({
    //     target: {
    //       name: props.name,
    //       value: { file: del == false ? "" : "delete", ext: "" },
    //     },
    //   });
  };

  return (
    <ControlLabel
      {...props}
      value={value}
      className={styles.uploadFile + " " + className}
    >
      <section
        // onClick={() => {
        //   const fileUpload = document.getElementById(props.name);
        //   if (fileUpload) {
        //     fileUpload.click();
        //   }
        // }}
        style={{
          borderColor: props.error[props.name]
            ? "var(--cError)"
            : value?.file || isDraggingFile
            ? "var(--cPrimary)"
            : "var(--cWhiteV3)",
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnter={() => setIsDraggingFile(true)}
        onDragLeave={() => setIsDraggingFile(false)}
      >
        <input
          type="file"
          name={props.name}
          id={props.name}
          onChange={onChangeFile}
          value=""
          required={props.required}
          disabled={props.disabled}
          accept={accept()}
        />
        {
          // !selectedFiles?.name || selectedFiles?.name == "" && onlyImg?(
          //   <>
          //       <IconImage size={40} color={"white"} />
          //   <span>Adjunta o arrastra y suelta </span>
          //   <span>{`${placeholderMsg}`}</span>
          //   <span>{props.ext.join(", ")}</span>
          // </>
          // ):
          (!selectedFiles?.name || selectedFiles?.name == "") &&
          (!value || value == "") ? (
            <div
              onClick={() => {
                const fileUpload = document.getElementById(props.name);
                if (fileUpload) {
                  fileUpload.click();
                }
              }}
            >
              {img ? (
                <IconImage size={40} color={"var(--cWhite)"} />
              ) : (
                <IconDocs size={40} color={"var(--cWhite)"} />
              )}
              <span>
                {props.placeholder || "Cargar un archivo o arrastrar y soltar "}
              </span>
              <span>{props.ext.join(", ")}</span>
            </div>
          ) : (
            <div style={{ position: "relative" }}>
              {(value || selectedFiles?.type?.startsWith("image/")) && img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={
                    selectedFiles?.name
                      ? URL.createObjectURL(selectedFiles)
                      : value || ""
                  }
                  alt="Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
              ) : selectedFiles.type === "application/pdf" ? (
                <IconPDF size={80} color={"var(--cWhite)"} />
              ) : (
                <IconDocs size={80} color={"var(--cWhite)"} />
              )}
              {/* <p>
                Archivo seleccionado: <span>{selectedFiles.name}</span>
              </p>
              <Button
                // onClick={() => {
                //   const fileUpload = document.getElementById(props.name);
                //   if (fileUpload) {
                //     fileUpload.click();
                //   }
                // }}
                variant="terciary"
              >
                Editar elemento
              </Button> */}
              <IconEdit
                size={20}
                style={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  padding: 2,
                  backgroundColor: "var(--cBlack)",
                }}
                color={"var(--cWarning)"}
                circle
                onClick={() => {
                  const fileUpload = document.getElementById(props.name);
                  if (fileUpload) {
                    fileUpload.click();
                  }
                }}
              />
              {item[props.name]?.file == "delete" ? (
                <>
                  <IconTrash
                    size={100}
                    style={{
                      cursor: "",
                      padding: "2px",
                      position: "absolute",
                      color: "red",
                      top: 0,
                      left: 0,
                    }}
                  />
                  <IconArrowLeft
                    size={20}
                    circle={true}
                    color="var(--cSuccess)"
                    style={{
                      position: "absolute",
                      top: 2,
                      left: 2,
                      padding: 2,
                      backgroundColor: "var(--cBlack)",
                    }}
                    onClick={() => {
                      deleteImg(false);
                    }}
                  />
                </>
              ) : (
                <IconTrash
                  size={20}
                  style={{
                    position: "absolute",
                    top: 2,
                    left: 2,
                    padding: 2,
                    backgroundColor: "var(--cBlack)",
                  }}
                  color={"var(--cError)"}
                  circle
                  onClick={() => {
                    deleteImg();
                  }}
                />
              )}
            </div>
          )
        }
      </section>
    </ControlLabel>
  );
};
