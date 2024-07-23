"use client";

import { useState } from "react";
import { IconArrowDown } from "@/components/layout/icons/IconsBiblioteca";
import Button from "@/mk/components/forms/Button/Button";
import Check from "@/mk/components/forms/Check/Check";
import DataSearch from "@/mk/components/forms/DataSearch/DataSearch";
import Input from "@/mk/components/forms/Input/Input";
import InputCode from "@/mk/components/forms/InputCode/InputCode";
import InputFullName from "@/mk/components/forms/InputFullName/InputFullName";
import InputImage from "@/mk/components/forms/InputImage/InputImage";
import InputPassword from "@/mk/components/forms/InputPassword/InputPassword";
import Select from "@/mk/components/forms/Select/Select";
import Switch from "@/mk/components/forms/Switch/Switch";
import TextArea from "@/mk/components/forms/TextArea/TextArea";
import { UploadFile } from "@/mk/components/forms/UploadFile/UploadFile";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import Box from "@/mk/components/ui/Box/Box";
import { Card } from "@/mk/components/ui/Card/Card";
import DataModal from "@/mk/components/ui/DataModal/DataModal";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import KeyValue from "@/mk/components/ui/KeyValue/KeyValue";
import Pagination from "@/mk/components/ui/Pagination/Pagination";
import TabsButtons from "@/mk/components/ui/TabsButton/TabsButtons";
import LoadingScreen from "@/mk/components/ui/LoadingScreen/LoadingScreen";

const Damian = () => {
  // const [formState, setFormState] = React.useState({
  //     // activo: "Y",
  // });
  const [formState, setFormState]: any = useState({});
  const [typeSearch, setTypeSearch]: any = useState("T");
  const [errors, setErrors]: any = useState({});
  const [params, setParams]: any = useState({
    perPage: 10,
    page: 5,
    fullType: "L",
  });
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen]: any = useState(false);
  const lestado = [
    { id: "", name: "Todos" },
    { id: "P", name: "Cobrado" },
    { id: "S", name: "Por confirmar" },
    { id: "R", name: "Rechazado" },
    { id: "E", name: "Subir comprobante" },
  ];
  const [valueSwitch, setValueSwitch] = useState("N");
  const onSelItem = (e: any) => {
    const { checked } = e.target;
    setValueSwitch(checked ? "Y" : "N");
  };
  const [editProfile, setEditProfile] = useState(false);
  const handleChange = (e: any) => {
    let value = e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
  };
  const handleChangeInput = (e: any) => {
    let value = e.target.value;
    if (e.target.type == "checkbox") {
      value = e.target.checked ? "Y" : "N";
    }
    setFormState({ ...formState, [e.target.name]: value });
    console.log(formState, "formState");
  };
  const [filter, setFilter]: any = useState({
    date: "month",
    searchBy: "",
    status: "",
    category: "",
  });
  const getSearch = (search: string) => {
    setParams({ ...params, searchBy: search });
  };
  const setCode = (code: string) => {
    setFormState({ ...formState, code });
  };
  const render = (item: any) => {
    return (
      <ItemList
        variant="V2"
        title={item.name}
        left={<Avatar name={item.id} />}
      />
    );
  };
  const onChangePage = (page: any) => {
    if (params.page == page) return;
    setParams({ ...params, page });
  };

  return (
    <div>
      damian
      <Check
        label="Activo"
        name="activo"
        value={formState.activo}
        onChange={handleChangeInput}
        optionValue={["Y", "N"]}
        error={{}}
      />
       <LoadingScreen skeletonType="CardSkeleton">aaa




      {/* <InputImage placeholderMsg='una fotografía de tu cédula de identidad'/> */}
      <UploadFile
        name="file"
        label="Archivo...."
        ext={["pdf", "jpg", "png"]}
        value={{ file: "", name: "" }}
        onChange={() => {}}
        error={{}}
        setError={() => {}}
        required={true}
        placeholder="aaaaa"
        img={true}
      />
      <TabsButtons
        tabs={[
          { value: "T", text: "Todo" },
          { value: "R", text: "Por aprobar" },
          { value: "A", text: "Aprobados" },
          { value: "X", text: "Rechazados" },
        ]}
        sel={typeSearch}
        setSel={setTypeSearch}
      />
      {/* <Select
              value={filter?.status}
              onChange={(e: any) => {
                setFilter({ ...filter, status: e.target.value });
              }}
              name="status"
              label="Estado"
              options={lestado}
            />
*/}
      <TextArea
        label="Motivo del rechazo de cuenta"
        placeholder="aaaaaaaaaaa"
        name="obs"
        required={true}
        error={errors}
        onChange={handleChangeInput}
        value={formState.obs}
      />
      <Switch
        name="switch"
        optionValue={["Y", "N"]}
        value={valueSwitch}
        onChange={onSelItem}
      />
      <InputFullName
        name="name"
        value={formState}
        errors={errors}
        onChange={handleChange}
        //disabled={true}
        style={{ opacity: editProfile ? 0.4 : 1 }}
      />
      input probar kg
      <Input
        placeholder="flkkfk"
        label="red"
        value={formState["fl"]}
        name="fl"
        onChange={handleChangeInput}
      />
      <DataSearch
        setSearch={getSearch}
        name="search"
        value={params?.searchBy || ""}
        label="Buscar"
      />
      <InputCode
        label=""
        type="text"
        name="code"
        error={errors}
        required={true}
        value={formState.code}
        setCode={setCode}
        onChange={handleChangeInput}
      ></InputCode>
      aaaaaassss
      <InputPassword
        label="Contraseña"
        required
        name="password"
        value={formState.password}
        onChange={handleChange}
        error={errors}
      />
      <Avatar name={"getFullName(item.guardia"} />
      <Box
        title="Alertas"
        icon={
          <Button onClick={() => setOpen(true)} small>
            Ver todo
          </Button>
        }
        className="widget-alert"
      >
        aa
      </Box>
      <Card>
        Hola soy un card!
        <IconArrowDown />
      </Card>
      <ItemList
        variant="V2"
        title={"aaaasfffd"}
        left={<Avatar name={"aaaasfffd"} />}
        subtitle={"sdsfdgfdf"}
        //foot={"asasasasasassssssssss2"}
      />
      {/* <List data={lestado} renderItem={render} /> */}
      <Pagination
        currentPage={params.page}
        onPageChange={onChangePage}
        totalPages={10}
        previousLabel=""
        nextLabel=""
      />
      <DataModal
        //id={mod.modulo + "View"}
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        buttonText={"Confirmar pago"}
        buttonCancel={""}
        onSave={() => console.log(true)}
        buttonExtra={
          <Button variant="secondary" onClick={() => console.log(true)}>
            Rechazar pago
          </Button>
        }
        className="confirm-payment"
        title={"Detalle del Pago"}
      >
        <ItemList
          variant="V2"
          title={"aaaasfffd"}
          left={<Avatar name={"aaaasfffd"} />}
          subtitle={"sdsfdgfdf"}
          foot={"asasasasasassssssssss2"}
        />
      </DataModal>
      <KeyValue title="Celular" value={"Sin registrar"} />
      </LoadingScreen>
    </div>
  );
};

export default Damian;
