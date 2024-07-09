import {
  IconAdmin,
  IconGroup,
  IconHome,
  IconSimpleAdd,
  IconUser,
} from "../layout/icons/IconsBiblioteca";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./footer.module.css";
import Image from "next/image";
import footer from "@/../public/images/footer.png";

type PropsType = {
  isTablet: boolean;
};

const Footer = ({ isTablet }: PropsType) => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const Item = ({
    href,
    label,
    icon,
  }: {
    href: string;
    label: string;
    icon: any;
  }) => {
    return (
      <Link className={pathname == href ? "active" : ""} href={href}>
        {icon}
        <p>{label}</p>
      </Link>
    );
  };

  if (isTablet)
    return (
      <div
        className={styles["footer"]}
        style={!isHome ? { borderTop: "1px solid rgba(255, 255, 255, 0.1)" } : {}}
      >
        {isHome && (
          <>
            <Image src={footer} alt="footer" style={{}} />
            <div>
              <IconSimpleAdd />
            </div>
          </>
        )}
        <Item href="/" label="Home" icon={<IconHome />} />
        <Item href="/profile" label="Perfil" icon={<IconUser />} />
        <Item href="/users" label="Usuarios" icon={<IconAdmin />} />
        <Item href="/affiliates" label="Afiliados" icon={<IconGroup />} />
      </div>
    );

  return (
    <>
      {/* <div
      style={{
        color: "white",
      }}
    >
      Desktop Footer
    </div> */}
    </>
  );
};

export default Footer;
