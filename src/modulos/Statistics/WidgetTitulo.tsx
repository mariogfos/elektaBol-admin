import React from "react";

const WidgetTitulo = ({ params, histParams, histTitulos }: any) => {
  const [histParam, setHistParam] = histParams;
  const [histTitulo, setHistTitulo] = histTitulos;
  const [param, setParam] = params;
  const level = param.level || 0;
  let title = "Datos electorales históricos de Bolivia";
  if (level == 1) {
    // const ultHistParam = histParam.length - 1;
    title = "Departamento " + histTitulo[level];
  }
  return <div>{title}</div>;
};

export default WidgetTitulo;
