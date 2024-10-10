import { useEffect, useState } from "react";
import styles from "./layout.module.css";
import { useAuth } from "@/mk/contexts/AuthProvider";
import DataModal from "@/mk/components/ui/DataModal/DataModal";
import Navbar from "@/mk/components/ui/Navbar/Navbar";
import MainMenu from "../MainMenu/MainMenu";
import Footer from "../Footer/Footer";
import Sidebar from "@/mk/components/ui/Sidebar/Sidebar";
import Profile from "../Profile/Profile";
import Header from "../Header/Header";
import useScreenSize from "@/mk/hooks/useScreenSize";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { getFormattedDate } from "@/mk/utils/date";

const Layout = ({ children }: any) => {
  const { user, logout, store } = useAuth();
  const [client, setClient]: any = useState(null);
  const [open, setOpen]: any = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [onLogout, setOnLogout] = useState(false);
  const { isTablet } = useScreenSize();
  const path: any = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const client = user.clients?.find((c: any) => c.id === user.client_id);
      setClient(client);
    }
  }, [user]);

  return (
    <main className={styles.layout}>
      <section>
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
      </section>
      <section>
        <MainMenu
          client={client}
          user={user}
          collapsed={false}
          setOnLogout={setOnLogout}
        />
      </section>
      <section>{children}</section>
      <section>
        <Footer />
      </section>
      <Sidebar open={sideBarOpen} onClose={setSideBarOpen} iconClose={false}>
        <MainMenu
          client={client}
          user={user}
          collapsed={false}
          setOnLogout={setOnLogout}
        />
      </Sidebar>
      <DataModal
        open={onLogout}
        title="Cerrar sesión"
        onClose={() => {
          setOnLogout(false);
        }}
        buttonText="Cerrar sesión"
        buttonCancel="Cancelar"
        onSave={() => logout()}
      >
        <p className={styles.modalLogout}>
          ¿Estás seguro de que deseas cerrar sesión?
        </p>
      </DataModal>
    </main>
  );
};

export default Layout;
