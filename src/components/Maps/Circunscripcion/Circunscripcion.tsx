import { formatNumber } from "@/mk/utils/numbers";

const CircunscripcionMap = ({ circunscripcion }: any) => {
  console.log("circunscripcion", circunscripcion);
  return (
    <div>
      <h2>{circunscripcion.titulo}</h2>
      <p>Habitantes: {formatNumber(circunscripcion?.habitantes, 0)}</p>
      <p>Habilitados: {formatNumber(circunscripcion?.habilitados, 0)}</p>
      <p>
        Afiliados:{" "}
        {circunscripcion?.data?.afiliados
          ? formatNumber(circunscripcion?.data?.afiliados, 0)
          : "N/A"}
      </p>
    </div>
  );
};

export default CircunscripcionMap;
