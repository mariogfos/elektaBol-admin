import { useEffect, useState } from "react";
import useScreenSize from "@/mk/hooks/useScreenSize";
import styles from "./layout.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import DataModal from "@/mk/components/ui/DataModal/DataModal";
import { useAuth } from "@/mk/contexts/AuthProvider";
import { usePathname } from "next/navigation";
import SideMenu from "@/mk/components/ui/SideMenu/SideMenu";
import Sidebar from "@/mk/components/ui/Sidebar/Sidebar";

import { useRouter } from "next/router";
import MainMenu from "../MainMenu/MainMenu";
import { getFormattedDate } from "@/mk/utils/date";

const Layout = ({ children }: any) => {
  const { user, logout, store } = useAuth();
  const { isTablet, isDesktop } = useScreenSize();
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [client, setClient]: any = useState(null);
  const [onLogout, setOnLogout] = useState(false);
  const path: any = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const client = user.clients?.find((c: any) => c.id === user.client_id);
      setClient(client);
    }
  }, [user]);

  return (
    <>
      <section className={styles.layout}>
        <div
          style={{
            width: `calc(100% - ${
              isDesktop ? (sideMenuOpen ? 80 : 256) : 0
            }px)`,
            marginLeft: `${isDesktop ? (sideMenuOpen ? 80 : 256) : 0}px`,
            zIndex: "100",
          }}
          className={styles.header}
        >
          <Header
            isTablet={isTablet}
            user={user}
            path={path}
            router={router}
            client={client}
            title={store?.title + " / " + getFormattedDate()}
            right={store?.right}
            customTitle={store?.customTitle}
            openSlider={sideBarOpen}
            setOpenSlider={setSideBarOpen}
          />
        </div>
        {isDesktop && (
          <SideMenu collapsed={sideMenuOpen} setCollapsed={setSideMenuOpen}>
            <MainMenu
              collapsed={sideMenuOpen}
              user={user}
              client={client}
              setOnLogout={setOnLogout}
            />
          </SideMenu>
        )}
        {isTablet && (
          <Sidebar
            open={sideBarOpen}
            onClose={setSideBarOpen}
            iconClose={false}
          >
            <MainMenu
              client={client}
              user={user}
              collapsed={false}
              setOnLogout={setOnLogout}
            />
          </Sidebar>
        )}
        <main
          style={{
            marginTop: "95px",
            marginLeft: `${isDesktop ? (sideMenuOpen ? 80 : 256) : 0}px`,
            transition: "margin-left 0.3s",
          }}
        >
          {children}
        </main>
        <Footer isTablet={isTablet} />
      </section>
      <DataModal
        open={onLogout}
        title=""
        onClose={() => {
          setOnLogout(false);
        }}
        buttonText="Aceptar"
        buttonCancel="Cancelar"
        onSave={() => logout()}
      >
        <p className={styles.modalLogout}>
          ¿Estás seguro de que deseas cerrar sesión?
        </p>
      </DataModal>
    </>
  );
};

export default Layout;
