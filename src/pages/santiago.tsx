import DataSearch from "@/mk/components/forms/DataSearch/DataSearch";
import Input from "@/mk/components/forms/Input/Input";
import InputFullName from "@/mk/components/forms/InputFullName/InputFullName";
import InputPassword from "@/mk/components/forms/InputPassword/InputPassword";
import Select from "@/mk/components/forms/Select/Select";
import Switch from "@/mk/components/forms/Switch/Switch";
import TextArea from "@/mk/components/forms/TextArea/TextArea";
import { UploadFile } from "@/mk/components/forms/UploadFile/UploadFile";
import { useState } from "react";

const Santiago = () => {
  // const [valueSwitch, setValueSwitch] = useState("N");
  // const onSelItem = (e: any) => {
  //   const { checked } = e.target;
  //   setValueSwitch(checked ? "Y" : "N");
  // };
  const [value, setValue] = useState("");
  const [error, setError] = useState(true);
  const [formState, setFormState] = useState({
    search: "",
  });
  const onChange = (e: any) => {
    const { value } = e.target;
    setValue(value);
  };

  return (
    <main
      style={{
        padding: "24px",
      }}
    >
      {/* <Switch
        name="switch"
        optionValue={["Y", "N"]}
        value={valueSwitch}
        onChange={onSelItem}
      /> */}
      <h1
        style={{
          color: "black",
        }}
      >
        -------------Inputs------------
      </h1>
      <Input
        name="input"
        type="text"
        label="Name"
        placeholder="Name"
        value={value}
        onChange={onChange}
      />
      <Input
        name="input"
        type="text"
        label="Name"
        value={value}
        onChange={onChange}
      />
      <Input
        name="input"
        type="text"
        label="Nombre completo"
        value={value}
        error={{ input: "Error en el campo input" }}
        onChange={onChange}
      />
      <Input
        name="input"
        type="text"
        label="Nombre completo"
        placeholder="Nombre completo"
        value={value}
        error={{ input: "Error en el campo input" }}
        onChange={onChange}
      />
      <h1
        style={{
          color: "black",
        }}
      >
        -------------Textareas------------
      </h1>
      {/* <InputPassword
        name="password"
        label="Contraseña"
        value={value}
        onChange={onChange}
        error={{ password: "Error en el campo password" }}
      />
      <InputFullName
        name="fullname"
        value={value}
        onChange={onChange}
        errors={error}
      /> */}
      <TextArea
        name="textarea"
        label="Label"
        // placeholder="Placeholder"
        value={value}
        onChange={onChange}
      />
      <TextArea
        name="textarea"
        label="Label"
        placeholder="Placeholder"
        value={value}
        onChange={onChange}
      />
      <TextArea
        name="textarea"
        label="Label"
        // placeholder="Placeholder"
        value={value}
        error={{ textarea: "Error en el campo textarea" }}
        onChange={onChange}
      />
      <TextArea
        name="textarea"
        label="Label"
        placeholder="Placeholder"
        value={value}
        error={{ textarea: "Error en el campo textarea" }}
        onChange={onChange}
      />
      {/* <Select
        name="perPage"
        value={value}
        onChange={onChange}
        placeholder="Todos"
        label="Per Page"
        options={[
          { id: "10", name: "10" },
          { id: "20", name: "20" },
          { id: "30", name: "30" },
          { id: "40", name: "40" },
          { id: "50", name: "50" },
        ]}
      ></Select>
      <DataSearch
        setSearch={(e: any) => {
          setFormState({ ...formState, search: e });
        }}
        name="search"
        value={value}
        label="Buscar"
      />
      <UploadFile
        name="file"
        label="Archivo"
        value={value}
        onChange={onChange}
        ext={["pdf", "doc", "docx"]}
        setError={setError}
        error={error}
      /> */}
    </main>
  );
};

export default Santiago;
