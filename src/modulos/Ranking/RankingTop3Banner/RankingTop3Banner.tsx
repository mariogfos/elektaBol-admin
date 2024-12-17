import React from "react";
import styles from "./RankingTop3Banner.module.css";
import { Avatar } from "@/mk/components/ui/Avatar/Avatar";
import { getUrlImages } from "@/mk/utils/string";
import {
  IconFirstPlace,
  IconSecondPlace,
  IconThirdPlace,
} from "@/components/layout/icons/IconsBiblioteca";
import Image from "next/image";
import crown from "@/../public/images/AvatarCampeon.png";
import { getFullName } from "../../../mk/utils/string";

interface RankingTop3BannerProps {
  image?: any;
  data: any;
}

interface RankingCardProps {
  affiliate: any;
  prov: string;
  canton?: string;
  points: number;
  size: number;
  borderColor?: string;
  icon: React.ReactNode;
  crownImage?: boolean;
}

const RankingCard: React.FC<RankingCardProps> = ({
  affiliate,
  prov,
  canton,
  points,
  size,
  borderColor,
  icon,
  crownImage,
}) => (
  <div className={styles.card}>
    <div style={{ position: "relative" }}>
      <Avatar
        src={getUrlImages(
          "/AFF-" + affiliate?.id + ".webp?d=" + affiliate?.updated_at
        )}
        name={getFullName(affiliate)}
        styleText={{ fontWeight: 600, fontSize: 16 }}
        w={size}
        h={size}
        style={{ border: `5px solid ${borderColor || "#000"}` }}
      />
      {crownImage && (
        <Image
          src={crown}
          alt="crownavatar"
          width={132}
          height={150}
          style={{ position: "absolute", objectFit: "contain", top: -40 }}
        />
      )}
      <div className={styles.iconPlaces}>{icon}</div>
    </div>
    <h3>{affiliate?.name}</h3>
    <h4>{prov || canton}</h4>
    <section>{points || 0} puntos</section>
  </div>
);

const RankingTop3Banner = ({ image, data }: RankingTop3BannerProps) => {
  if (!data || data.length < 3) {
    return <div>No hay suficientes datos para mostrar el top 3.</div>;
  }

  return (
    <div
      className={styles.rankingTop3Banner}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={styles.cardsContainer}>
        <RankingCard
          // affiliate={data[1]?.affiliate?.[0]}
          affiliate={data[1]?.affiliate}
          prov={data[1]?.prov}
          points={data[1]?.points}
          canton={data[1]?.canton}
          size={64}
          borderColor="#477D95"
          icon={<IconSecondPlace size={32} />}
        />
        <RankingCard
          // affiliate={data[0]?.affiliate?.[0]}
          affiliate={data[0]?.affiliate}
          prov={data[0]?.prov}
          points={data[0]?.points}
          canton={data[0]?.canton}
          size={92}
          borderColor="#FFD700"
          icon={<IconFirstPlace size={32} />}
          crownImage={true}
        />
        <RankingCard
          // affiliate={data[2]?.affiliate?.[0]}
          affiliate={data[2]?.affiliate}
          prov={data[2]?.prov}
          canton={data[2]?.canton}
          points={data[2]?.points}
          size={64}
          borderColor="#B48146"
          icon={<IconThirdPlace size={32} />}
        />
      </div>
    </div>
  );
};

export default RankingTop3Banner;
