// src/components/Stats/Stats.tsx
import useAxios from "@/mk/hooks/useAxios";
import { useEffect, useState } from "react";
import styles from "./Stats.module.css";
import { useAuth } from "@/mk/contexts/AuthProvider";
import { IconFilter } from "../layout/icons/IconsBiblioteca";
import NotAccess from "../layout/NotAccess/NotAccess";
import FiltersModal from "@/mk/components/forms/FiltersModal/FiltersModal";
import Button from "@/mk/components/forms/Button/Button";
import WidgetVerifiedAccount from "../ Widgets/WidgetVerifiedAccount/WidgetVerifiedAccount";
//  import WidgetTableAffProv from "../ Widgets/WidgetTableAffProv/WidgetTableAffProv";
import WidgetEducation from "../ Widgets/WidgetEducation/WidgetEducation";
import WidgetVolunteers from "../ Widgets/WidgetVolunteers/WidgetVolunteers";
import WidgetIncrease from "../ Widgets/WidgetIncrease/WidgetIncrease";
import WidgetSexo from "../ Widgets/WidgetSexo/WidgetSexo";
import WidgetAge from "../ Widgets/WidgetAge/WidgetAge";
import { WidgetSkeleton } from "@/mk/components/ui/Skeleton/Skeleton";
import WidgetTableAffProv from "../ Widgets/WidgetTableAffProv copy/WidgetTableAffProv";

const lGreader = [
  { id: "M", name: "Hombres" },
  { id: "F", name: "Mujeres" },
  { id: "X", name: "Prefiero no decirlo" },
];

const edad = [
  { id: "18-20", name: "18-20" },
  { id: "21-30", name: "21-30" },
  { id: "31-40", name: "31-40" },
  { id: "41-50", name: "41-50" },
  { id: "51-60", name: "51-60" },
  { id: "61-70", name: "61-70" },
  { id: "71-80", name: "71-80" },
  { id: "81+", name: "81+" },
];

const lCuentas = [
  { id: "A", name: "Validadas" },
  { id: "X", name: "Sin validar" },
];

const Stats: React.FC = () => {
  const { setStore, userCan, waiting } = useAuth();
  const [openFilter, setOpenFilter] = useState(false);
  const { data: metrics, reLoad } = useAxios("/metrics", "POST", {
    extraData: 1,
  });
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [extraData, setExtraData]: any = useState(null);
  useEffect(() => {
    setStore({
      title: "Crecimiento de los afiliados",
    });
  }, []);
  useEffect(() => {
    if (!extraData) {
      setExtraData(metrics?.data?.extraData);
    }
  }, [metrics]);



  if (!userCan("metrics", "R")) return <NotAccess />;
  if (waiting > 0) return <WidgetSkeleton />;

  const getProvs = () => {
    if (filters.dpto_id > 0) {
      
      return extraData?.provs?.filter(
        (item: any) => item.dpto_id === filters.dpto_id
      );
    } else {
      return [];
    }
  };

  const onFilter = async () => {
    await reLoad(filters);
    setFilters({ ...filters, dpto_idV: filters.dpto_id });
    getFilterTags();
    setOpenFilter(false);
  };

  const deleteFilter = async () => {
    await reLoad({});
    setFilters({});
    setOpenFilter(false);
    setFilterTags([]);
  };

  const getNameEtiqueta = (item: string) => {
    if (item === "dpto_id") {
      return (
        "Departamento: " +
        extraData?.dptos?.find((dpto: any) => dpto.id === filters[item])
          ?.name
      );
    }
    if (item === "prov_id") {
      return (
        "Provincia: " +
        extraData?.provs?.find((prov: any) => prov.id === filters[item])?.name
      );
    }
    if (item === "gender") {
      return (
        "Sexo: " + lGreader.find((prov: any) => prov.id === filters[item])?.name
      );
    }
    if (item === "ages") {
      return (
        "Edad: " + edad.find((prov: any) => prov.id === filters[item])?.name
      );
    }
    if (item === "education") {
      return extraData?.educations?.find(
        (prov: any) => prov.id === filters[item]
      )?.name;
    }
    if (item === "is_verify") {
      return lCuentas.find((prov: any) => prov.id === filters[item])?.name;
    }
    return "";
  };

  const getFilterTags = () => {
    const filteredKeys = Object.keys(filters).filter(
      (key) =>
        filters[key] !== null && filters[key] !== "" && key !== "dpto_idV"
    );
    setFilterTags(filteredKeys);
  };

  const _onClose = () => {
    setOpenFilter(false);
    // Puedes descomentar la siguiente línea si deseas limpiar los filtros al cerrar
    // setFilters({});
  };

  if (!metrics) {
    return null;
  }

  // Definición de los filtros
  const filtersList = [
    {
      title: "Departamentos",
      data: extraData?.dptos || [],
      filters: filters,
      setFilters: setFilters,
      type: "dpto_id",
    },
    {
      title: "Provincias",
      data: getProvs(),
      msgEmpty: "Selecciona un departamento para mostrar sus provincias.",
      filters: filters,
      setFilters: setFilters,
      type: "prov_id",
    },
    {
      title: "Género",
      data: lGreader,
      filters: filters,
      setFilters: setFilters,
      type: "gender",
    },
    {
      title: "Edad",
      data: edad,
      filters: filters,
      setFilters: setFilters,
      type: "ages",
    },
    {
      title: "Educación",
      data: extraData?.educations || [],
      filters: filters,
      setFilters: setFilters,
      type: "education",
    },
    {
      title: "Cuentas",
      data: lCuentas,
      filters: filters,
      setFilters: setFilters,
      type: "is_verify",
    },
    // Puedes agregar más filtros aquí según sea necesario
  ];

  return (
    <div className={styles.metrics}>
      <div>
        <div>
          <h1>Resumen general</h1>
          <p>
            Elecciones Nacionales Bolivia 2025
            {/* <span>Campaña activa</span> */}
          </p>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
            }}
            onClick={() => setOpenFilter(true)}
          >
            <IconFilter color="var(--cInfo)" />
            <p>Filtros</p>
          </div>
          {filterTags?.length > 0 && (
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {filterTags?.map((item: string) => (
                <span
                  style={{
                    backgroundColor: "#39ACEC33",
                    fontSize: "10px",
                    padding: "4px 8px",
                    borderRadius: 4,
                  }}
                  key={item}
                >
                  {getNameEtiqueta(item)}
                </span>
              ))}
              <span
                style={{
                  backgroundColor: "#DA5D5D33",
                  fontSize: "10px",
                  padding: "4px 8px",
                  borderRadius: 4,
                  color: "var(--cError)",
                  cursor: "pointer",
                }}
                onClick={deleteFilter}
              >
                Limpiar filtros
              </span>
            </div>
          )}
        </div>
      </div>

      <div>
        <section>
          <div>
            <WidgetVolunteers widget1={metrics?.data.widget1} />
            <WidgetIncrease widget8={metrics?.data.widget8} />
          </div>
          <div>
            <WidgetSexo widget3={metrics?.data.widget3} />
          </div>
          <div>
            <WidgetAge widget2={metrics?.data.widget2} />
          </div>
          <div>
            <WidgetEducation
              widget4={metrics?.data.widget4}
              educations={extraData?.educations}
            />
          </div>
        </section>
        <section>
          <div>
             {!metrics?.data?.widget7 ? (
              <WidgetTableAffProv
                widget={metrics?.data?.widget6}
                data={extraData?.dptos}
                filters={filters}
                type="dpto"
              />
            ) : (
              <WidgetTableAffProv
                widget={metrics?.data?.widget7}
                data={extraData?.provs}
                type="prov"
                filters={filters}
              />
            )} 
          </div>

          <div>
            <WidgetVerifiedAccount widget5={metrics?.data.widget5} />
          </div>
        </section>
      </div>

      <FiltersModal
        open={openFilter}
        onClose={_onClose}
        onSave={onFilter}
        title="Filtros"
        buttonCancel=""
        buttonText="Aplicar filtros"
        buttonExtra={
          <Button variant="secondary" onClick={deleteFilter}>
            Limpiar filtros
          </Button>
        }
        filtersList={filtersList}
      />
    </div>
  );
};

export default Stats;
