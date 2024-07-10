type TooltipDataType = {
  id: number;
  titulo: string;
  data: any;
};

type PropsType = {
  circunscripcion: TooltipDataType;
};

const Recintos = ({ circunscripcion }: PropsType) => {
  console.log("circunscripcion", circunscripcion);
  return (
    <div>
      <div></div>
    </div>
  );
};

export default Recintos;
