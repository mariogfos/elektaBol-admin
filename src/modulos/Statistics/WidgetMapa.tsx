import MapaPais from "./MapaPais";

type PropsType = {
  data: any;
  onClick?: any;
  params?: any;
};

const WidgetMapa = ({
  data,
  onClick = () => {},
  params = [{}, () => {}],
}: PropsType) => {
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
