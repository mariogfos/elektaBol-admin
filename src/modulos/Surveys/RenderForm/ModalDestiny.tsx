import Check from "@/mk/components/forms/Check/Check";
import DataSearch from "@/mk/components/forms/DataSearch/DataSearch";
import DataModal from "@/mk/components/ui/DataModal/DataModal";
import React, { use, useEffect, useState } from "react";

const ModalDestiny = ({
  open,
  onClose,
  selDestinies,
  formState,
  setFormState,
  onSave,
  execute,
}: any) => {
  const [sel, setSel]: any = useState([]);
  const [destiniesFiltered, setDestiniesFiltered]: any = useState([]);
  console.log(formState);
  useEffect(() => {
    setSel(formState?.lDestiny || []);
  }, [formState]);
  // const getMeta = async () => {
  //   const { data } = await execute("/surveys", "GET", {
  //     destiny: sel,
  //     fullType: "DES",
  //     lDestinies: formState.lDestiny,
  //   });

  //   setFormState({
  //     ...formState,
  //     affCount: data?.data?.affCount,
  //     lDestiny: sel,
  //   });
  // };

  useEffect(() => {
    if (!formState?.searchDestiny) {
      setDestiniesFiltered(selDestinies);
      return;
    }
    const search = formState?.searchDestiny;
    const filtered = selDestinies.filter((d: any) =>
      d.name.toLowerCase().includes(search?.toLowerCase())
    );
    setDestiniesFiltered(filtered);
  }, [formState?.searchDestiny]);
  const _onSave = async () => {
    // getMeta();
    onSave(sel);
    onClose();
  };

  const setSearch = (e: any) => {
    setFormState({ ...formState, searchDestiny: e });
  };
  return (
    <DataModal open={open} onClose={onClose} onSave={_onSave}>
      {/* <Check
        key={"check0"}
        name={"destiny_0"}
        reverse
        label="Todos"
        checked={sel.length == 0}
        onChange={(e: any) => {
          const { name, checked } = e.target;
          if (checked) {
            setSel([]);
          }
        }}
        value={0}
        optionValue={["0", "N"]}
      /> */}
      <DataSearch
        name="searchDestiny"
        setSearch={setSearch}
        value={formState.searchDestiny}
      />
      {destiniesFiltered.map((d: any, i: number) => (
        <Check
          key={"check" + i}
          name={"destiny_" + d.id}
          reverse
          label={d.name}
          checked={sel.includes(d.id)}
          onChange={(e: any) => {
            const { name, checked } = e.target;
            const id: any = parseInt(name.replace("destiny_", ""));

            const il: any = sel?.filter((d: number) => d != id) || [];
            if (checked) {
              il.push(d.id);
            }
            setSel(il);
          }}
          value={d.id}
          optionValue={[d.id, "N"]}
        />
      ))}
    </DataModal>
  );
};

export default ModalDestiny;
