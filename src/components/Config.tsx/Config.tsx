import TabsButtons from "@/mk/components/ui/TabsButton/TabsButtons";
import Barrios from "@/modulos/Barrios/Barrios";
import Circuns from "@/modulos/Circuns/Circuns";
import Countries from "@/modulos/Countries/Countries";
import Dptos from "@/modulos/Dptos/Dptos";
import Listas from "@/modulos/Listas/Listas";
import Locals from "@/modulos/Locals/Locals";
import Muns from "@/modulos/Muns/Muns";
import Provs from "@/modulos/Provs/Provs";
import Sublemas from "@/modulos/Sublemas/Sublemas";
import { useState } from "react";

const Config = () => {
  const [typeSearch, setTypeSearch] = useState("S");
  return (
    <div>
      <div style={{ marginTop: 20 }}>
        <TabsButtons
          variant="scrollable"
          tabs={[
            { value: "S", text: "Sublemas" },
            { value: "L", text: "Listas" },
            { value: "1", text: "Paises" },
            { value: "2", text: "Departamentos" },
            { value: "3", text: "Provincias" },
            { value: "4", text: "Circuncripciones" },
            { value: "5", text: "Municipios" },
            { value: "6", text: "Localidades" },
            { value: "7", text: "Recintos" },
            { value: "8", text: "Mesas" },
            { value: "B", text: "Barrios" },
          ]}
          sel={typeSearch}
          setSel={setTypeSearch}
        />
      </div>
      {typeSearch === "S" && <Sublemas />}
      {typeSearch === "L" && <Listas />}
      {typeSearch === "1" && <Countries />}
      {typeSearch === "2" && <Dptos />}
      {typeSearch === "3" && <Provs />}
      {typeSearch === "4" && <Circuns />}
      {typeSearch === "5" && <Muns />}
      {typeSearch === "6" && <Locals />}
      {typeSearch === "7" && <Dptos />}
      {typeSearch === "8" && <Dptos />}
      {typeSearch === "B" && <Barrios />}
    </div>
  );
};

export default Config;
