import React, { useState } from "react";
import { formatNumber } from "@/mk/utils/numbers";
import Tarija from "./Tarija/Tarija";
import Chuquisaca from "./Chuquisaca/Chuquisaca";
import Potosi from "./Potosi/Potosi";
import Pando from "./Pando/Pando";
import Beni from "./Beni/Beni";
import LaPaz from "./LaPaz/LaPaz";
import Oruro from "./Oruro/Oruro";
import Cochabamba from "./Cochabamba/Cochabamba";
import SantaCruz from "./SantaCruz/SantaCruz";

type PropsType = {
  department: any;
  onClickBack: () => void;
  onClickLevel: () => void;
  selectedCircunscripcion: any;
  setSelectedCircunscripcion: any;
  params: any;
  tooltipsData: any;
};

const DepartmentMap = ({
  department,
  onClickBack,
  onClickLevel,
  selectedCircunscripcion,
  setSelectedCircunscripcion,
  tooltipsData,
  params,
}: PropsType) => {
  const getDepartmentComponent = (id: string) => {
    console.log("id funcion", id);
    switch (id) {
      case "1":
        return <Chuquisaca />;
      case "2":
        return <LaPaz />;
      case "3":
        return <Cochabamba />;
      case "4":
        return <Oruro />;
      case "5":
        return <Potosi />;
      case "6":
        return <Tarija />;
      case "7":
        return (
          <SantaCruz
            tooltipsData={tooltipsData}
            onClickLevel={onClickLevel}
            selectedCircunscripcion={selectedCircunscripcion}
          />
        );
      // case "7":
      //   return (
      //     <CircunscripcionesSczMaps
      //       tooltipsData={tooltipsData}
      //       onClickLevel={onClickLevel}
      //       selectedCircunscripcion={selectedCircunscripcion}
      //     />
      //   );
      case "8":
        return <Beni />;
      case "9":
        return <Pando />;
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

      <div>{getDepartmentComponent(department?.code)}</div>
    </div>
  );
};

export default DepartmentMap;
