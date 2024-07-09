import { getFullName, getUrlImages } from "@/mk/utils/string";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import HeadTitle from "@/HeadTitle/HeadTitle";
import styles from "./header.module.css";
import {
  IconEmail,
  IconMenu,
  IconNotification,
} from "../layout/icons/IconsBiblioteca";
import DataSearch from "@/mk/components/forms/DataSearch/DataSearch";
import { getDateStrMes, getDateTimeStrMes } from "@/mk/utils/date";
type PropsType = {
  isTablet: boolean;
  user: any;
  path: string;
  router: any;
  client: any;
  setOpenSlider: Function;
  openSlider: boolean;
  title: string;
  right?: Function;
  customTitle?: Function;
};

const Header = ({
  isTablet,
  user,
  path,
  router,
  client,
  setOpenSlider,
  openSlider,
  title,
  right = () => {
    return null;
  },
  customTitle = () => {
    return null;
  },
}: PropsType) => {
  const isHome = router.pathname === "/";
  const Title = () => {
    return (
      <div className={styles["header-title"]}>
        <Avatar
          name={getFullName(user)}
          src={getUrlImages("/ADM-" + user?.id + ".png?d=" + user?.updated_at)}
          onClick={() => {
            router.push("/profile");
          }}
        />
        <p>{getFullName(user)}</p>
        <p>{client?.name}</p>
      </div>
    );
  };
  if (isTablet)
    return (
      <>
        <HeadTitle
          title={title}
          customTitle={path == "/" ? <Title /> : customTitle()}
          left={
            path == "/" ? (
              <IconMenu
                onClick={() => setOpenSlider(!openSlider)}
                circle
                size={32}
              />
            ) : null
          }
          right={path == "/" ? <IconNotification circle size={32} /> : right()}
        />
      </>
    );

  return (
    <div className={styles["header-desktop"]}>
      <div>
        <div>{title}</div>
      </div>
      <div
        style={{
          marginTop: "var(--spL)",
        }}
      >
        {/* <DataSearch
          placeholder="Buscar"
          value=""
          onChange={() => {}}
          setSearch={() => {}}
          name="search"
        /> */}
      </div>
      <div>
        <IconEmail />
      </div>
      <div>
        <IconNotification />
      </div>
    </div>
  );
};

export default Header;
