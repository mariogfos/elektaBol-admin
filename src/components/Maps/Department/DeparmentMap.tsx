import React from "react";
import { formatNumber } from "@/mk/utils/numbers";
import SantaCruz from "./SantaCruz/SantaCruz";
import Tarija from "./Tarija/Tarija";
import Chuquisaca from "./Chuquisaca/Chuquisaca";
import Potosi from "./Potosi/Potosi";
import Pando from "./Pando/Pando";
import Beni from "./Beni/Beni";
import LaPaz from "./LaPaz/LaPaz";
import Oruro from "./Oruro/Oruro";
import Cochabamba from "./Cochabamba/Cochabamba";

type TooltipDataType = {
  id: number;
  titulo: string;
  data: any;
};

type PropsType = {
  department: any;
  onClickBack: () => void;
};

const DepartmentMap = ({ department, onClickBack }: PropsType) => {
  console.log("department", department);

  const getDepartmentComponent = (id: number) => {
    console.log(id);
    switch (id) {
      case 1:
        return <Pando />;
      case 2:
        return <LaPaz />;
      case 3:
        return <Beni />;
      case 4:
        return <Oruro />;
      case 5:
        return <Cochabamba />;
      case 6:
        return <Potosi />;
      case 7:
        return <Chuquisaca />;
      case 8:
        return <Tarija />;
      case 9:
        return (
          <SantaCruz circunscripcion={department} onClickBack={onClickBack} />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* <h2>{department.titulo}</h2>
      <p>Habitantes: {formatNumber(department?.habitantes, 0)}</p>
      <p>Habilitados: {formatNumber(department?.habilitados, 0)}</p>
      <p>
        Afiliados:{" "}
        {department?.data?.afiliados
          ? formatNumber(department?.data?.afiliados, 0)
          : "N/A"}
      </p> */}

      <div>{getDepartmentComponent(department.id)}</div>
    </div>
  );
};

export default DepartmentMap;
