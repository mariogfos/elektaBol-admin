import React from "react";
import { formatNumber } from "@/mk/utils/numbers";
import SantaCruz from "./SantaCruz/SantaCruz";
import Pando from "./Pando/Pando";
import Beni from "./Beni/Beni";
import LaPaz from "./LaPaz/LaPaz";
// import LaPaz from "./LaPaz/LaPaz";
// import Cochabamba from "./Cochabamba/Cochabamba";
// import Oruro from "./Oruro/Oruro";
// import Potosi from "./Potosi/Potosi";
// import Tarija from "./Tarija/Tarija";
// import Chuquisaca from "./Chuquisaca/Chuquisaca";
// import Beni from "./Beni/Beni";
// import Pando from "./Pando/Pando";

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

  const getDepartmentComponent = (id: number) => {
    switch (id) {
      case 9:
        return <SantaCruz circunscripcion={department} />;
      case 2:
        return <LaPaz />;
      // case 3:
      //   return <Cochabamba data={data} />;
      // case 4:
      //   return <Oruro data={data} />;
      // case 5:
      //   return <Potosi data={data} />;
      // case 6:
      //   return <Tarija data={data} />;
      // case 7:
      //   return <Chuquisaca data={data} />;
      case 3:
        return <Beni />;
      case 1:
        return <Pando />;
      default:
        return null;
    }
  };

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

      <div>{getDepartmentComponent(department.id)}</div>
    </div>
  );
};

export default DepartmentMap;
