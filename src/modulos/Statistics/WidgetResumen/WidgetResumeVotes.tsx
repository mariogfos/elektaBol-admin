import {
  IconCheck,
  IconElectoralParty,
  IconPercentage,
  IconVotes,
  IconWhiteVotes,
  IconX,
} from "@/components/layout/icons/IconsBiblioteca";
import { Card } from "@/mk/components/ui/Card/Card";
import styles from "./WidgetResume.module.css";
import { formatNumber } from "@/mk/utils/numbers";
import InfoCard from "@/components/InfoCard/InfoCard";
type PropsType = {
  title: string;
  subtitle?: string;
  data?: any;
  extras?: any;
  total: number;
};

const WidgetResumeVotes = ({
  title,
  subtitle,
  data,
  extras,
  total,
}: PropsType) => {
  // console.log('data16',extras);
  // const totalHabilitados = data?.reduce((acc: number, curr: any) => acc + Number(curr.habilitados), 0) || 0;
  const totalEmitidos =
    Number(extras?.nulos) + Number(extras?.blancos) + Number(extras?.validos);

  return (
    <Card className={styles["widgetResumeVotes"]}>
      <div>
        <div>{title}</div>
        <div>{subtitle}</div>
      </div>
      <div>
        <InfoCard
          icon={<IconElectoralParty color={"var(--cBlackV2)"} />}
          title={"Padrón electoral"}
          value={total}
        />
        <InfoCard
          icon={<IconVotes color={"var(--cBlackV2)"} />}
          title={"Votos emitidos"}
          value={totalEmitidos}
        />
        <InfoCard
          icon={<IconPercentage color={"var(--cBlackV2)"} />}
          title={"Participación"}
          value={(totalEmitidos / total) * 100}
          ext={"%"}
        />
        <InfoCard
          icon={<IconCheck color={"var(--cBlackV2)"} />}
          title={"Votos válidos"}
          value={extras?.validos}
        />
        <InfoCard
          icon={<IconX color={"var(--cBlackV2)"} />}
          title={"Votos nulos"}
          value={extras?.nulos}
        />
        <InfoCard
          icon={<IconWhiteVotes color={"var(--cBlackV2)"} />}
          title={"Votos blancos"}
          value={extras?.blancos}
        />
      </div>
    </Card>
  );
};

export default WidgetResumeVotes;
