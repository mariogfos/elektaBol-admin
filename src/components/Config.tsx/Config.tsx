import TabsButtons from "@/mk/components/ui/TabsButton/TabsButtons";
import Barrios from "@/modulos/Barrios/Barrios";
import Circuns from "@/modulos/Circuns/Circuns";
import Countries from "@/modulos/Countries/Countries";
import Dmuns from "@/modulos/Dmun/Dmuns";
import Dptos from "@/modulos/Dptos/Dptos";
import Locals from "@/modulos/Locals/Locals";
import Macroregions from "@/modulos/Macroregions/Macroregions";
import Mesas from "@/modulos/Mesas/Mesas";
import Muns from "@/modulos/Muns/Muns";
import Partidos from "@/modulos/Partidos/Partidos";
import Provs from "@/modulos/Provs/Provs";
import Recintos from "@/modulos/Recintos/Recintos";
import Uvs from "@/modulos/Uvs/Uvs";
import { useState } from "react";

const Config = () => {
  const [typeSearch, setTypeSearch] = useState("2");
  return (
    <div>
      <div style={{ marginTop: 20 }}>
        <TabsButtons
          tabs={[
            // { value: "S", text: "Sublemas" },
            // { value: "L", text: "Listas" },
            // { value: "P", text: "Paises" },
            // { value: "1", text: "Partidos" },
            { value: "2", text: "Departamentos" },
            // { value: "3", text: "Macroregiones" },
            { value: "4", text: "Provincias" },
            { value: "5", text: "Municipios" },
            { value: "6", text: "Distritos municipales" },
            // { value: "7", text: "Localidades" },
            // { value: "8", text: "Unidad vecinal" },
            // { value: "9", text: "Barrios" },

            // { value: "R", text: "Recintos" },
            // { value: "M", text: "Mesas" },
            // { value: "CI", text: "Circuncripciones" },
          ]}
          sel={typeSearch}
          setSel={setTypeSearch}
        />
      </div>
      {/* {typeSearch === "S" && <Sublemas />} */}
      {/* {typeSearch === "L" && <Listas />} */}
      {/* {typeSearch === "P" && <Countries />}
      {typeSearch === "1" && <Partidos />} */}
      {typeSearch === "2" && <Dptos />}
      {/* {typeSearch == "3" && <Macroregions />} */}
      {typeSearch === "4" && <Provs />}
      {typeSearch === "5" && <Muns />}
      {typeSearch === "6" && <Dmuns />}
      {/* {typeSearch === "7" && <Locals />} */}
      {/* {typeSearch === "8" && <Uvs />} */}
      {/* {typeSearch === "9" && <Barrios />} */}

      {/* {typeSearch === "R" && <Recintos />}
      {typeSearch === "CI" && <Circuns />}
      {typeSearch === "M" && <Mesas />} */}
    </div>
  );
};

export default Config;
