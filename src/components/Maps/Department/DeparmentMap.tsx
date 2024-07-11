import React, { useState } from "react";
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

type PropsType = {
  department: any;
  onClickBack: () => void;
  onClickLevel: () => void;
  selectedCircunscripcion: any;
  setSelectedCircunscripcion: any;
};

const DepartmentMap = ({
  department,
  onClickBack,
  onClickLevel,
  selectedCircunscripcion,
  setSelectedCircunscripcion,
}: PropsType) => {
  const getDepartmentComponent = (id: number) => {
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
        return <Tarija  circunscripcion={department} onClickBack={onClickBack}/>;
      case 9:
        return (
          <SantaCruz
            circunscripcion={department}
            onClickBack={onClickBack}
            onClickLevel={onClickLevel}
            selectedCircunscripcion={selectedCircunscripcion}
            setSelectedCircunscripcion={setSelectedCircunscripcion}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div>{getDepartmentComponent(department.id)}</div>
    </div>
  );
};

export default DepartmentMap;
