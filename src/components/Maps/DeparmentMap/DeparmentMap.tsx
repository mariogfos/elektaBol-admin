import React from "react";
import { formatNumber } from "@/mk/utils/numbers";

type TooltipDataType = {
  id: number;
  titulo: string;
  data: any;
};

type PropsType = {
  department: TooltipDataType;
};

const DepartmentMap = ({ department }: PropsType) => {
  console.log("department", department);
  return (
    <div>
      <h2>{department.titulo}</h2>
      <p>Habitantes: {formatNumber(department?.data?.habitantes, 0)}</p>
      <p>Habilitados: {formatNumber(department?.data?.habilitados, 0)}</p>
      <p>
        Afiliados:{" "}
        {department?.data?.afiliados
          ? formatNumber(department?.data?.afiliados, 0)
          : "N/A"}
      </p>
      <svg viewBox="0 0 200 200">
        {/* Aquí puedes poner el SVG del mapa del departamento */}
        <circle cx="100" cy="100" r="50" />
      </svg>
    </div>
  );
};

export default DepartmentMap;
