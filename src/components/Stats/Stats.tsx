import useAxios from "@/mk/hooks/useAxios";
import { useEffect, useState } from "react";
import WidgetVolunteers from "../ Widgets/WidgetVolunteers/WidgetVolunteers";
import styles from "./Stats.module.css";
import { useAuth } from "@/mk/contexts/AuthProvider";
import WidgetIncrease from "../ Widgets/WidgetIncrease/WidgetIncrease";
import Button from "@/mk/components/forms/Button/Button";
import DataModal from "@/mk/components/ui/DataModal/DataModal";
import FilterTags from "../FilterTags/FilterTags";
import WidgetSexo from "../ Widgets/WidgetSexo/WidgetSexo";
import WidgetAge from "../ Widgets/WidgetAge/WidgetAge";
import WidgetEducation from "../ Widgets/WidgetEducation/WidgetEducation";
import WidgetVerifiedAccount from "../ Widgets/WidgetVerifiedAccount/WidgetVerifiedAccount";
import { IconFilter } from "../layout/icons/IconsBiblioteca";
import WidgetTableAffDpto from "../ Widgets/WidgetTableAffProv/WidgetTableAffDpto";

let lGreader = [
  { id: "M", name: "Hombres" },
  { id: "F", name: "Mujeres" },
  { id: "X", name: "Prefiero no decirlo" },
];
let edad = [
  { id: "18-20", name: "18-20" },
  { id: "21-30", name: "21-30" },
  { id: "31-40", name: "31-40" },
  { id: "41-50", name: "41-50" },
  { id: "51-60", name: "51-60" },
  { id: "61-70", name: "61-70" },
  { id: "71-80", name: "71-80" },
  { id: "81+", name: "81+" },
];
let lCuentas = [
  { id: "A", name: "Verificadas" },
  { id: "X", name: "No verificadas" },
];
const Stats = () => {
  const { setStore } = useAuth();
  const [openFilter, setOpenFilter] = useState(false);
  const { data: metrics, reLoad } = useAxios("/metrics", "POST", {});
  const [filters, setFilters]: any = useState({});
  const [filterTags, setFilterTags]: any = useState({});
  useEffect(() => {
    setStore({
      title: "Métricas de campaña",
    });
  }, []);
  const { data: provs } = useAxios("/provs", "GET", {
    fullType: "L",
    perPage: -1,
  });
  const { data: dptos } = useAxios("/dptos", "GET", {
    fullType: "L",
    perPage: -1,
  });
  const { data: education } = useAxios("/educations", "GET", {
    perPage: -1,
    fullType: "L",
  });

  const getProvs = () => {
     if (filters.dpto_id > 0) {
       return provs?.data.filter(
         (item: any) => item.dpto_id === filters.dpto_id
       );
     } else {
       return [];
     }
  };

  const onFilter = async () => {
    await reLoad(filters);
    setFilters({ ...filters, prov_idV: filters.prov_id });
    getFilterTags();
    setOpenFilter(false);
  };
  if (!metrics) {
    return null;
  }

  const deleteFilter = async () => {
    await reLoad({});
    setFilters({});
    setOpenFilter(false);
    setFilterTags({});
  };
  const getNameEtiqueta = (item: any) => {
    if (item === "dpto_id") {
      return (
        "Departamento: " +
        dptos?.data.find((prov: any) => prov.id === filters[item])?.name
      );
    }
    if (item === "prov_id") {
      return (
        "Provincia: " +
        provs?.data.find((canton: any) => canton.id === filters[item])?.name
      );
    }
    if (item == "gender") {
      return (
        "Sexo: " + lGreader.find((prov: any) => prov.id === filters[item])?.name
      );
    }
    if (item == "ages") {
      return (
        "Edad: " + edad.find((prov: any) => prov.id === filters[item])?.name
      );
    }
    if (item == "education") {
      return education?.data.find((prov: any) => prov.id === filters[item])
        ?.name;
    }
    if (item == "is_verify") {
      return lCuentas.find((prov: any) => prov.id === filters[item])?.name;
    }
    // return "";
  };

  const getFilterTags = () => {
    const filteredKeys = Object.keys(filters).filter(
      (key) =>
        filters[key] !== null && filters[key] !== "" && key !== "prov_idV"
    );
    setFilterTags(filteredKeys);
  };

  const _onClose = () => {
    setOpenFilter(false);
    // setFilters({});
  };

  return (
    <div className={styles.metrics}>
      <div>
        <div>
          <h1>Resumen general</h1>
          <p>
            Plebiscito - Seguridad Social 2024 <span>Campaña activa</span>
          </p>
        </div>
        <div>
          <IconFilter
            onClick={() => setOpenFilter(true)}
            color="var(--cInfo)"
            style={{ cursor: "pointer" }}
          />
          <p>Filtros</p>
          {filterTags?.length > 0 && (
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {filterTags?.map((item: any) => (
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
            <WidgetEducation widget4={metrics?.data.widget4} />
          </div>
        </section>
        <section>
          <div>
            {!metrics?.data?.widget7 ? (
              <WidgetTableAffDpto
                widget={metrics?.data?.widget6}
                data={dptos?.data}
                filters={filters}
                type="dpto"
              />
            ) : (
              <WidgetTableAffDpto
                widget={metrics?.data?.widget7}
                data={dptos?.data}
                type="dpto"
                filters={filters}
              />
            )}
          </div>

          <div>
            <WidgetVerifiedAccount widget5={metrics?.data.widget5} />
          </div>
        </section>
      </div>
      <DataModal
        open={openFilter}
        onClose={() => _onClose()}
        onSave={() => onFilter()}
        title="Filtros"
        buttonCancel=""
        buttonText="Aplicar filtros"
        buttonExtra={
          <Button variant="secondary" onClick={deleteFilter}>
            Limpiar filtros
          </Button>
        }
      >
    <FilterTags
          title="Departamentos"
          data={dptos?.data}
          msgEmpty="Selecciona un departamento para mostrar sus cantonidades."
          filters={filters}
          setFilters={setFilters}
          type="dptos_id"
        />
        <FilterTags
          title="Provincias"
          data={getProvs()}
          filters={filters}
          setFilters={setFilters}
          type="prov_id"
        />
        {/* <FilterTags
          title="Cantones"
          data={getCantons()}
          msgEmpty="Selecciona un departamento para mostrar sus cantonidades."
          filters={filters}
          setFilters={setFilters}
          type="canton_id"
        /> */}
        <FilterTags
          title="Género"
          data={lGreader}
          filters={filters}
          setFilters={setFilters}
          type="gender"
        />
        <FilterTags
          title="Edad"
          data={edad}
          filters={filters}
          setFilters={setFilters}
          type="ages"
        />

        <FilterTags
          title="Educación"
          data={education?.data}
          filters={filters}
          setFilters={setFilters}
          type="education"
        />
        <FilterTags
          title="Cuentas"
          data={lCuentas}
          filters={filters}
          setFilters={setFilters}
          type="is_verify"
        />
      </DataModal>
    </div>
  );
};

export default Stats;
