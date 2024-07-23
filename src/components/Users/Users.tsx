/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useAxios from "@/mk/hooks/useAxios";
import LoadingScreen from "@/mk/components/ui/LoadingScreen/LoadingScreen";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import styles from "./users.module.css";
import DetailUsers from "./DetailUsers";
import { useUsers } from "./useUsers";
import AddUsers from "./AddUsers";
import { Card } from "@/mk/components/ui/Card/Card";
import LeadershipHierarchy from "@/mk/components/ui/LeaderShipHierarchy/LeaderShipHierarchy";
import { useAuth } from "@/mk/contexts/AuthProvider";
import { formatNumberCustom, getDateStrMes, getUTCNow } from "@/mk/utils/date";
import { lEntity, lLevels } from "./type";
import HistoryManager from "./HistoryManager";
import { formatNumber } from "@/mk/utils/numbers";

const Users = () => {
  const { user, setStore } = useAuth();
  const [currentList, setCurrentList] = useState(0);
  const [precarga, setPrecarga] = useState({});
  const [params, setParams]: any = useState({
    fullType: "DATA",
    perPage: -1,
    page: 1,
    searchBy: "",
  });
  const [paramsHist, setParamsHist] = useState([params]);
  const { data: dataUsers, reLoad } = useAxios("/users", "GET", params);

  const [level, setLevel] = useState(user?.role?.level);
  useEffect(() => {
    setStore({
      title: "Organización",
    });
  }, []);

  useEffect(() => {
    reLoad(params);
    if (params?.level == 3) {
      setCurrentList(params.searchBy);
    }
  }, [params]);

  const {
    openDetail,
    setOpenDetail,
    item,
    openDetailUsers,
    // admins,
    open,
    setOpen,
    isTablet,
  } = useUsers({ onClose: () => {} });

  const addClick = (entity: any, line: number = 1) => {
    if (line === 1) {
      setPrecarga({
        level: level,
        [lEntity[level]]: entity.id,
        line,
        entidad: dataUsers?.data?.entidad,
      });
    } else {
      setPrecarga({
        level: level + 1,
        [lEntity[level]]: entity.id,
        line,
      });
    }

    setOpen(true);
  };

  const renderItem = (row: any) => {
    return (
      <div key={row.id} onClick={() => openDetailUsers(row)}>
        <ItemList
          title={getFullName(row)}
          subtitle={"CI: " + row.ci}
          left={
            <Avatar
              name={getFullName(row)}
              src={getUrlImages("/ADM-" + row.id + ".png?d=" + row.updated_at)}
            />
          }
        />
      </div>
    );
  };

  return (
    <div className={styles.users}>
      <div>
        <HistoryManager
          setParamsHist={setParamsHist}
          paramsHist={paramsHist}
          reload={reLoad}
          level={level}
          setLevel={setLevel}
          setParams={setParams}
          user={user}
        />
      </div>
      <div>
        <div style={{ position: "relative", padding: "0px 16px 70px 16px" }}>
          <div>
            <Card>
              <div className="tTitle">
                Nivel{" "}
                <span>
                  {lLevels[level]}: {dataUsers?.data?.entidad}
                </span>
              </div>
              <div className="tSubtitle">Al {getDateStrMes(getUTCNow())}</div>
              <div className={styles["cardInfoContainer"]}>
                {dataUsers?.data?.resumen?.map((item: any, i: number) => (
                  <div key={i} className={styles["cardInfo"]}>
                    <div>
                      {item.cant} / {item.total}
                    </div>
                    <div> {item.title}</div>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <div className="tTitle">
                Resumen hasta {getDateStrMes(getUTCNow())}
              </div>
              <div className="tSubtitle">
                Esta es la suma total de los los administrativos de mi red y los
                afiliados.
              </div>
              <div className={styles["cardInfoContainer"]}>
                <div className={styles["cardInfo"]}>
                  <div>{dataUsers?.data?.demografico?.administrativos}</div>
                  <div> Administrativos en la red</div>
                </div>

                <div className={styles["cardInfo"]}>
                  <div>
                    {formatNumber(dataUsers?.data?.demografico?.afiliados, 0)}
                  </div>
                  <div> Afiliados en la red</div>
                </div>

                <div className={styles["cardInfo"]}>
                  <div>
                    {formatNumber(
                      dataUsers?.data?.demografico?.administrativos +
                        dataUsers?.data?.demografico?.afiliados,
                      0
                    )}
                  </div>
                  <div>Total en la red </div>
                </div>
              </div>
            </Card>
          </div>
          {/* <div>{renderContent()}</div> */}
          <LoadingScreen type="TableSkeleton">
            <div style={{ marginBottom: 16 }}>
              <div style={{ width: "100%" }}>
                <LeadershipHierarchy
                  user={user}
                  line1={dataUsers?.data?.line1}
                  line2={dataUsers?.data?.line2}
                  setParams={setParams}
                  params={params}
                  addClick={addClick}
                  listaActual={currentList}
                  level={level}
                  setLevel={setLevel}
                  setParamsHist={setParamsHist}
                  entidad={dataUsers?.data?.entidad}
                />
              </div>
              {/* <Button
                  onClick={() => {
                    setOpen(true);
                    setPrecarga({});
                  }}
                >
                  Agregar Personal
                </Button> */}
            </div>
          </LoadingScreen>
        </div>
      </div>
      {open && (
        <AddUsers
          open={open}
          onClose={() => setOpen(false)}
          precarga={precarga}
          reLoad={reLoad}
        />
      )}
      <DetailUsers
        open={openDetail}
        close={() => setOpenDetail(false)}
        item={item}
      />
    </div>
  );
};

export default Users;
