import { useEffect, useState } from "react";
import styles from "./Statistics.module.css";
import WidgetTableStats from "@/components/Widgets/WidgetTableStats/WidgetTableStats";
import WidgetResumeWinnerParty from "@/modulos/Statistics/WidgetResumen/WidgetResumeWinnerParty";
import { useAuth } from "@/mk/contexts/AuthProvider";
import WidgetTitulo from "./WidgetTitulo";
import WidgetMapa from "./WidgetMapa";
import WidgetResumen from "./WidgetResumen/WidgetResumen";
import useAxios from "@/mk/hooks/useAxios";
import LoadingScreen from "@/mk/components/ui/LoadingScreen/LoadingScreen";
import DataModal from "@/mk/components/ui/DataModal/DataModal";

const paramInitial: any = {
  searchBy: "",
  level: 0,
};
const Statistics = () => {
  const { setStore } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [params, setParams] = useState(paramInitial);
  const { data: stads, reLoad } = useAxios("/estads", "POST", {
    ...params,
  });

  const secondCardTitle: any = {
    0: "recintos",
    1: "mesas",
  };
  useEffect(() => {
    setStore({
      title: "Estadísticas electorales",
    });
  }, []);
  useEffect(() => {
    reLoad(params);
  }, [params]);

  const histParam = useState([]);
  const histTitulo: any = useState(["Mapa de Bolivia"]);

  const calculateTotalHabilitados = () => {
    if (params.level == 4) return stads?.data?.tabla?.habilitados;
    let total = 0;
    stads?.data?.tabla?.forEach((item: any) => {
      total += item?.habilitados * 1;
    });

    return total % 1 === 0 ? total : Number(total.toFixed(2));
  };
  const onClick = (code: any) => {
    const item: any = stads.data.tabla.find((d: any) => d.code == code);

    const t = histTitulo[0];
    t.push(item?.name);
    histTitulo[1](t);
    const h: any = histParam[0];
    h.push(params);
    histParam[1](h);
    setParams({
      ...params,
      searchBy: item?.id,
      level: (params?.level || 0) + 1,
      code: code.toString(),
    });
  };

  const onBack = (index: number) => {
    let h: any = histParam[0];
    let t: any = histTitulo[0];
    // eliminar los duplicados de h
    h = h.filter((item: any, i: number) => h.indexOf(item) === i);
    const param = h[index];
    h = h.slice(0, index + 1);
    t = t.slice(0, index + 1);
    if (index === 0) {
      h = [];
      t = ["Mapa de Bolivia"];
    }

    histParam[1](h);
    histTitulo[1](t);
    setParams(param);
  };

  let totalVotos = stads?.data?.extras?.winner?.reduce(
    (acc: number, current: any) => acc + current.total_votos,
    0
  );

  console.log("totalVotos", totalVotos);

  const dataFormated = (data: any) => {
    if (!data?.tabla || !data?.extras?.winner) {
      return [];
    }

    data.tabla.forEach((item: any) => {
      const winner = data.extras.winner.find(
        (p: any) => item.winner_id === p.id
      );
      item.partido = winner ? winner.name : null;
      item.total_votos = winner ? winner.total_votos : 0;
    });

    return data.tabla;
  };

  const formattedData = dataFormated(stads?.data);
  console.log("dataFormated", formattedData);

  return (
    <LoadingScreen skeletonType="LatestInvoicesSkeleton">
      <div className={styles["statistics"]}>
        <div>
          <WidgetTitulo
            histParams={histParam}
            params={[params, setParams]}
            histTitulos={histTitulo}
            onBack={onBack}
          />
        </div>
        <div>
          {params.level < 3 && (
            <div>
              <WidgetMapa
                params={[params, setParams]}
                onClick={onClick}
                data={dataFormated(stads?.data)}
              />
            </div>
          )}
          <div>
            <WidgetResumen
              params={[params, setParams]}
              data={stads?.data?.tabla}
              dataExtra={stads?.data?.extra}
              openModal={() => setOpenModal(true)}
              calculateTotalHabilitados={calculateTotalHabilitados}
              extra={stads?.data?.extra?.[secondCardTitle[params.level]]}
            />
          </div>
        </div>
        {params?.level < 4 && (
          <div>
            <WidgetTableStats
              data={stads?.data?.tabla}
              onClick={onClick}
              params={[params, setParams]}
            />
          </div>
        )}
        {params.level === 4 && (
          <div>
            <WidgetResumeWinnerParty
              data={stads?.data?.extra?.winner?.slice(1)}
              title={"Otros resultados"}
              total={calculateTotalHabilitados()}
            />
          </div>
        )}
        <DataModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          buttonCancel=""
          buttonText=""
        >
          <WidgetResumeWinnerParty
            data={stads?.data?.extra?.winner}
            title={"Otros resultados"}
            total={calculateTotalHabilitados()}
          />
        </DataModal>
      </div>
    </LoadingScreen>
  );
};

export default Statistics;
