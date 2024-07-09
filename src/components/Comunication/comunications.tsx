import { useState } from "react";
import styles from "./comunication.module.css";
import TabsButtons from "@/mk/components/ui/TabsButton/TabsButtons";
import Surveys from "@/modulos/Surveys/Surveys";
import Contents from "@/modulos/Contents/Contents";
import Events from "@/modulos/Events/Events";

export const Comunication = () => {
  const [typeSearch, setTypeSearch] = useState("C");
  return (
    <div className={styles.comunication}>
      <nav className={styles.tabsSection}>
        <TabsButtons
          tabs={[
            { value: "C", text: "Mis publicaciones" },
            { value: "E", text: "Eventos" },
            { value: "S", text: "Encuestas" },
          ]}
          sel={typeSearch}
          setSel={setTypeSearch}
        />
      </nav>

      <section className={styles.itemsSection}>
        {typeSearch === "E" && <Events />}
        {typeSearch === "S" && <Surveys />}
        {typeSearch === "C" && <Contents />}
      </section>
    </div>
  );
};
//
