import React from "react";
import MapaPais from "./MapaPais";

const WidgetMapa = ({ data, onClick, params }: any) => {
  const [param, setParam] = params;
  const level = param?.level || 0;
  const id = param?.searchBy || "";
  return (
    <div>
      <MapaPais onClick={onClick} data={data} param={param} />
    </div>
  );
  // return (
  //   <div>
  //     Mapa {level}-{id}
  //   </div>
  // );
};

export default WidgetMapa;
