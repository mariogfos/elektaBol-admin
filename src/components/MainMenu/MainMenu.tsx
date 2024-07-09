import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "../../mk/components/ui/Avatar/Avatar";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import {
  IconHome,
  IconUser,
  IconLogout,
  IconNet,
  IconComunication,
  IconDashboard,
  IconSetting,
  IconLogoElekta,
} from "../layout/icons/IconsBiblioteca";
import styles from "./mainmenu.module.css";
import { useRouter } from "next/router";

type PropsType = {
  user?: any;
  client?: any;
  setOnLogout: any;
  collapsed: boolean;
};

const MainMenu = ({ user, client, collapsed, setOnLogout }: PropsType) => {
  const pathname = usePathname();
  const router = useRouter();

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
    <section
      className={`${styles["mainmenu"]} ${
        collapsed ? styles["collapsed"] : ""
      }`}
    >
      <div>
        <IconLogoElekta size={collapsed ?44:88}/>
        <Avatar
          w={collapsed ? 64 : 127}
          h={collapsed ? 64 : 127}
          name={getFullName(user)}
          src={getUrlImages(`/ADM-${user?.id}.png?d=${user?.updated_at}`)}
          onClick={() => router.push("/profile")}
        />
        {!collapsed && (
          <>
            <p>{getFullName(user)}</p>
            <p>{user?.role?.description}</p>
            <p>{user?.entidad?.name}</p>
          </>
        )}
      </div>
      <div className={styles["menu-content"]}>
        <Item href="/" label="Panel de control" icon={<IconDashboard />} />
        <Item href="/profile" label="Mi perfil" icon={<IconUser />} />
        <Item href="/users" label="Organización" icon={<IconNet />} />
        <Item
          href="/comunication"
          label="Comunicación"
          icon={<IconComunication />}
        />
        <Item href="/config" label="Configuracion" icon={<IconSetting />} />
      </div>
      <div className={styles["menu-bottom"]}>
        <Item
          href="#"
          onclick={() => setOnLogout(true)}
          label="Cerrar Sesión"
          labelColor={"var(--cError)"}
          icon={<IconLogout color={"var(--cError)"} />}
        />
      </div>
    </section>
  );
};

export default MainMenu;
