import { useState } from "react";
import TabsButtons from "@/mk/components/ui/TabsButton/TabsButtons";
import Levels from "@/modulos/Levels/Levels";
import Medals from "@/modulos/Medals/Medals";
import Leagues from "@/modulos/Leagues/Leagues";
import GameActions from "@/modulos/GameActions/GameActions";

const Gamification = () => {
  const [typeSearch, setTypeSearch] = useState("I");
  return (
    <div>
      <div style={{ marginTop: 20 }}>
        <TabsButtons
          tabs={[
            { value: "LI", text: "Ligas" },
            { value: "L", text: "Niveles" },
            { value: "I", text: "Insignias" },
            { value: "A", text: "Acciones" },
          ]}
          sel={typeSearch}
          setSel={setTypeSearch}
        />
      </div>
      {typeSearch === "LI" && <Leagues />}
      {typeSearch === "L" && <Levels />}
      {typeSearch === "I" && <Medals />}
      {typeSearch === "A" && <GameActions />}
    </div>
  );
};

export default Gamification;
