import { lLevels } from "./type";

const HistoryManager = ({
  setParamsHist,
  paramsHist,
  reload,
  level,
  setLevel,
  setParams,
  user,
}: any) => {
  const handleGoBack = () => {
    let newParamsHist = [...paramsHist];
    const ult = newParamsHist.pop();
    setLevel((old: number) => old - 1);
    setParamsHist(newParamsHist);
    setParams(ult);
    // console.log("newParamsHist", newParamsHist, level, ult);
    reload(ult);
  };

  return (
    <div
      style={{
        marginBottom: 10,
        marginTop: 12,
        marginLeft: 16,
      }}
    >
      {level > 1 && user?.role?.level < level && (
        <div
          onClick={() => handleGoBack()}
          style={{ color: "var(--cAccent)", cursor: "pointer" }}
        >
          &lt; Volver al Nivel {lLevels[level - 1]}
        </div>
      )}
    </div>
  );
};

export default HistoryManager;
