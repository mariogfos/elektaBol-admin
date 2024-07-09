import TabsButtons from "@/mk/components/ui/TabsButton/TabsButtons";
import Barrios from "@/modulos/Barrios/Barrios";
import Dptos from "@/modulos/Dptos/Dptos";
import Listas from "@/modulos/Listas/Listas";
import Locals from "@/modulos/Locals/Locals";
import Sublemas from "@/modulos/Sublemas/Sublemas";
import { useState } from "react";

const Config = () => {
  const [typeSearch, setTypeSearch] = useState("S");
  return (
    <div>
      <div style={{ marginTop: 20 }}>
        <TabsButtons
          tabs={[
            { value: "S", text: "Sublemas" },
            { value: "L", text: "Listas" },
            { value: "D", text: "Departamentos" },
            { value: "O", text: "Localidades" },
            { value: "B", text: "Barrios" },
          ]}
          sel={typeSearch}
          setSel={setTypeSearch}
        />
      </div>
      {typeSearch === "S" && <Sublemas />}
      {typeSearch === "L" && <Listas />}
      {typeSearch === "D" && <Dptos />}
      {typeSearch === "O" && <Locals />}
      {typeSearch === "B" && <Barrios />}
    </div>
  );
};

export default Config;
