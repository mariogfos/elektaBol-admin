import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "../../mk/components/ui/Avatar/Avatar";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import {
  IconHome,
  IconUser,
  IconLogout,
  IconComunication,
  IconDashboard,
  IconSetting,
  IconLogoElekta,
  IconRedffiliates,
  IconRolesPermisos,
  IconStatic,
  IconNetwork,
  IconCandidates,
} from "../layout/icons/IconsBiblioteca";
import styles from "./mainmenu.module.css";
import { useRouter } from "next/router";
import useScreenSize from "@/mk/hooks/useScreenSize";
import MainMenuHeader from "./MainMenuHeader";
import MainmenuDropdown from "./MainmenuDropdown";
import MainmenuItem from "./MainMenuItem";

type PropsType = {
  user?: any;
  client?: any;
  setOnLogout: any;
  collapsed: boolean;
};

const MainMenu = ({ user, client, collapsed, setOnLogout }: PropsType) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isMobile } = useScreenSize();

  const Item = ({
    href,
    label,
    labelColor,
    icon,
    onclick,
  }: {
    href: string;
    label: string;
    labelColor?: string;
    icon: React.ReactNode;
    onclick?: () => void;
  }) => (
    <div
      className={`${styles["mainmenu-item"]} ${
        collapsed ? styles["collapsed"] : ""
      } ${pathname === href ? styles["active-item"] : ""}`}
    >
      <Link
        className={pathname === href ? "active" : ""}
        onClick={onclick}
        href={href}
      >
        <p>{icon}</p>
        <p style={{ color: labelColor }}>{label}</p>
      </Link>
    </div>
  );

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
            { href: "/stats", label: "Crecimiento y detalle del afiliado" },
            { href: "/affiliates", label: "Red de afiliados" },
            { href: "/ranking", label: "Ranking" },
          ]}
          collapsed={collapsed}
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
        />
        <MainmenuDropdown
          label="Candidatos"
          icon={<IconCandidates />}
          items={[
            { href: "/candidates", label: "Administrar candidatos" },
            { href: "/typecands", label: "Tipo de candidatos" },
          ]}
          collapsed={collapsed}
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
        onclick={() => setOnLogout(true)}
        label="Cerrar sesión"
        labelColor={"var(--cError)"}
        icon={<IconLogout color={"var(--cError)"} />}
        collapsed={collapsed}
      />
    </div>
  </section>






    // <section
    //   className={`${styles["mainmenu"]} ${
    //     collapsed ? styles["collapsed"] : ""
    //   }`}
    // >
    //   <div>
    //     <IconLogoElekta
    //       size={collapsed ? 44 : 168}
    //       style={{ cursor: "pointer" }}
    //       onClick={() => router.push("/")}
    //     />
    //     <Avatar
    //       w={collapsed ? 64 : 127}
    //       h={collapsed ? 64 : 127}
    //       name={getFullName(user)}
    //       src={getUrlImages(`/ADM-${user?.id}.webp?d=${user?.updated_at}`)}
    //       onClick={() => router.push("/profile")}
    //     />
    //     {!collapsed && (
    //       <>
    //         <p style={{ marginTop: "12px" }}>{getFullName(user)}</p>
    //         <p>{user?.role?.description}</p>
    //         <p>{user?.entidad?.name}</p>
    //       </>
    //     )}
    //   </div>
    //   <div className={styles["menu-content"]}>
    //     <Item href="/" label="Panel de control" icon={<IconDashboard />} />
    //     {/* <Item
    //       href="/profile"
    //       label="Mi perfil"
    //       icon={<IconUser reverse={true} />}
    //     /> */}
    //     <Item href="/users" label="Organización" icon={<IconNet />} />
    //     <Item
    //       href="/affiliates"
    //       label="Red de afiliados"
    //       icon={<IconRedffiliates />}
    //     />
    //     <Item
    //       href="/comunication"
    //       label="Comunicación"
    //       icon={<IconComunication />}
    //     />
    //     <Item href="/statistics" label="Estadísticas" icon={<IconNet />} />
    //     <Item
    //       href="/stats"
    //       label="Estadísticas electorales"
    //       icon={<IconStatic />}
    //     />
    //     <Item
    //       href="/roles"
    //       label="Roles y permisos"
    //       icon={<IconRolesPermisos />}
    //     />
    //     <Item href="/config" label="Configuración" icon={<IconSetting />} />
    //   </div>
    //   <div className={styles["menu-bottom"]}>
    //     <Item
    //       href="#"
    //       onclick={() => setOnLogout(true)}
    //       label="Cerrar sesión"
    //       labelColor={"var(--cError)"}
    //       icon={<IconLogout color={"var(--cError)"} />}
    //     />
    //   </div>
    // </section>
  );
};

export default MainMenu;
