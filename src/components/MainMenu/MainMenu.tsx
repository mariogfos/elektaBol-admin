import useScreenSize from "@/mk/hooks/useScreenSize";
import {
  IconComunication,
  IconRedffiliates,
  IconLogout,
  IconNetwork,
  IconCandidates,
  IconFluentVote,
} from "../layout/icons/IconsBiblioteca";
import styles from "./mainmenu.module.css";
import MainmenuDropdown from "./MainmenuDropdown";
import MainMenuHeader from "./MainMenuHeader";
import MainmenuItem from "./MainMenuItem";

type PropsType = {
  user?: any;
  client?: any;
  setLogout: any;
  collapsed: boolean;
  setSideBarOpen?: any;
};

const MainMenu = ({
  user,
  collapsed,
  setLogout,
  setSideBarOpen,
}: PropsType) => {
  const { isMobile } = useScreenSize();
  return (
    <section className={styles.menu}>
      <div>
        <MainMenuHeader user={user} collapsed={collapsed} />
      </div>
      {!isMobile ? (
        <div>
          <MainmenuDropdown
            label="Red Elekta"
            icon={<IconRedffiliates />}
            items={[
              { href: "/", label: "Resumen" },
              { href: "/stats", label: "Crecimiento de los afiliados" },
              { href: "/directAffiliates", label: "Red de afiliados" },
              { href: "/affiliates", label: "Afiliados" },
              { href: "/ranking", label: "Ranking" },
            ]}
            collapsed={collapsed}
            setSideBarOpen={setSideBarOpen}
          />
          <MainmenuDropdown
            label="Organización"
            icon={<IconNetwork />}
            items={[
              { href: "/users", label: "Estructura del partido" },
              { href: "/admins", label: "Administradores" },
              { href: "/roles", label: "Roles y permisos" },
            ]}
            collapsed={collapsed}
            setSideBarOpen={setSideBarOpen}
          />
                <MainmenuDropdown
            label="Estadísticas"
            icon={<IconFluentVote />}
            items={[
              { href: "/statistics", label: "Resultados electorales" },
           
            ]}
            collapsed={collapsed}
            setSideBarOpen={setSideBarOpen}
          />
          <MainmenuDropdown
            label="Comunicación"
            icon={<IconComunication />}
            items={[
              { href: "/contents", label: "Noticias" },
              { href: "/events", label: "Eventos" },
              { href: "/surveys", label: "Encuestas" },
            ]}
            collapsed={collapsed}
            setSideBarOpen={setSideBarOpen}
          />
          <MainmenuDropdown
            label="Candidatos"
            icon={<IconCandidates />}
            items={[
              { href: "/candidates", label: "Administrar candidatos" },
              { href: "/typecands", label: "Tipo de candidatos" },
            ]}
            collapsed={collapsed}
            setSideBarOpen={setSideBarOpen}
          />
        </div>
      ) : (
        <div>
          <MainmenuItem href="/" label="Eventos" icon={<IconCandidates />} />
        </div>
      )}

      <div>
        <MainmenuItem
          href="#"
          onclick={() => setLogout(true)}
          label="Cerrar sesión"
          labelColor={"var(--cError)"}
          icon={<IconLogout color={"var(--cError)"} />}
          collapsed={collapsed}
        />
      </div>
    </section>
  );
};

export default MainMenu;
