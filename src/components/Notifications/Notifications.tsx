
import useAxios from "@/mk/hooks/useAxios";
import { ParamsType } from "@/mk/types/generics";
import { getDateStrMes, getDateTimeStrMes } from "@/mk/utils/date";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IconAlertNotification, IconPaymentCommitment, IconPreRegister } from "../layout/icons/IconsBiblioteca";
import ItemList from "@/mk/components/ui/ItemList/ItemList";
import TabsButtons from "@/mk/components/ui/TabsButton/TabsButtons";
import LoadingScreen from "@/mk/components/ui/LoadingScreen/LoadingScreen";
import DataSearch from "@/mk/components/forms/DataSearch/DataSearch";
import List from "@/mk/components/ui/List/List";
import styles from "./notifications.module.css";

const paramInitial: ParamsType = {
  perPage: 10,
  page: 1,
  fullType: "L",
};
const Notifications = () => {
  const [views, _setNViews]: any = useState([]);
  const [params, setParams] = useState(paramInitial);
  const { data, execute, reLoad } = useAxios("/notifications", "GET", params);
  const getSearch = (search: string) => {
    setParams({ ...params, searchBy: search });
  };
 console.log(data,"data")
  const [id, setId] = useState(0);

  const [openComprobante, setOpenComprobante] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const router = useRouter();

  const getViews = () => {
    let v: any = localStorage.getItem("notifViews");
    if (v) {
      v = JSON.parse(v);
      _setNViews(v);
    }
  };

  const setViews = (v: any) => {
    localStorage.setItem("notifViews", JSON.stringify(v));
  };

  useEffect(() => {
    getViews();
  }, []);

  useEffect(() => {
    if (!params) return;
    reLoad(params);
  }, [params?.filterBy, params?.searchBy]);


  const Footer = ({ item }: any) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "56px",
        }}
      >
        <div>{getDateTimeStrMes(item.created_at)}</div>
        <div
          style={{
            color:
              item.level == 3
                ? "var(--cAlertAlto)"
                : item.level == 2
                ? "var(--cAlertMedio)"
                : "var(--cAlertBajo)",
          }}
        >
          {item.level == 3
            ? "Nivel alto"
            : item.level == 2
            ? "Nivel medio"
            : "Nivel bajo"}
        </div>
      </div>
    );
  };

  const IconsNotifications = (data: any) => {
    if (data.info?.act == "alerts") {
      return (
        <section>
          <IconAlertNotification className={"V " + data.info?.act} />
        </section>
      );
    }
    if (data.info?.act == "newPreregister") {
      return (
        <section>
          <IconPreRegister className={"V " + data.info?.act} />
        </section>
      );
    }
    if (data.info?.act == "newVoucher") {
      return (
        <section>
          <IconPaymentCommitment className={"V " + data.info?.act} />
        </section>
      );
    }
  };

  const onClick = (x: any) => {
    if (x?.info?.act == "newVoucher" || x?.info?.act == "newPayment") {
      setId(x.info.id);
      setOpenComprobante(true);
    }
    if (x?.info?.act === "alerts") {
      setId(x.info.id);
      setOpenAlert(true);
    }
    if (x?.info?.act === "newPreregister") {
      // setOpenPayment(true);
      router.push("/");
    }
  };

  const render = (item: any, index: number) => {
    let x = item.message.replace("\\", "");
    if (typeof x == "string") x = JSON.parse(x);
    return (
      <div
        onClick={() => {
          onClick(x);
        }}
        key={index}
      >
        <ItemList
          variant={"V1 " + (views.includes(index) ? "viewed" : "")}
          title={x.msg?.title}
          subtitle={x.msg?.body}
          left={IconsNotifications(x)}
          foot={getDateStrMes(item.created_at)}
        />
      </div>
    );
  };

  return (
    <div className={styles.notifications}>
      <div>Todo lo sucedido en el condominio lo encuentras aquí</div>
      {/* <TabsButtons
        tabs={[
          { value: "T", text: "Todo" },
          { value: "A", text: "Nivel alto" },
          { value: "M", text: "Nivel medio" },
          { value: "B", text: "Nivel bajo" },
        ]}
        sel={typeSearch}
        setSel={setTypeSearch}
      /> */}
      <DataSearch
        setSearch={getSearch}
        name="search"
        value={params?.searchBy || ""}
        label="Buscar"
      />
      <LoadingScreen skeletonType="LatestInvoicesSkeleton">
        <List data={data?.data} renderItem={render} />
      </LoadingScreen>

      {/* {openModal && (
        <DetailAlert
          open={openModal}
          onClose={() => setOpenModal(false)}
          id={id}
          execute={execute}
        />
      )} */}
    </div>
  );
};

export default Notifications;

Notifications.title = "Notificaciones";
