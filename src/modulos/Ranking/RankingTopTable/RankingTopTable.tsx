import React from "react";
import styles from "./RankingTopTable.module.css";
import Table from "../../../mk/components/ui/Table/Table";
import {
  IconDownSolid,
  IconEqualSolid,
  IconUpSolid,
} from "@/components/layout/icons/IconsBiblioteca";
import { Avatar } from "../../../mk/components/ui/Avatar/Avatar";
import { getFullName, getUrlImages } from "@/mk/utils/string";
import LevelAvatar from "@/components/NoQr/LevelAvatar";

interface RankingTopTableProps {
  data: any[];
  header?: any;
  type: string;
}

// Función auxiliar para renderizar el cambio de posición
const renderPosition = (position: number, previousPos: number) => {
  if (position === previousPos) {
    return <IconEqualSolid size={12} color="Var(--cWarning)" />;
  }
  return position < previousPos ? (
    <IconUpSolid size={12} color="Var(--cSuccess)" />
  ) : (
    <IconDownSolid size={12} color="Var(--cError)" />
  );
};

const getAffiliateData = (item: any) => {
  // const affiliate = item?.affiliate?.[0];
  const affiliate = item?.affiliate;
  return {
    id: affiliate?.id,
    name: affiliate?.name,
    updatedAt: affiliate?.updated_at,
    fullName: getFullName(affiliate),
  };
};

const RankingTopTable = ({ data, header, type }: RankingTopTableProps) => {
  const headerRankingTopTable = [
    {
      key: "position",
      width: "170px",
      onRender: (item: any) => {
        const { position, previousPos } = item.item;
        return (
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            {renderPosition(position, previousPos)}
            <p>{position}</p>
          </div>
        );
      },
    },
    {
      key: "name",
      onRender: (item: any) => {
        const affiliateData = getAffiliateData(item.item);
        return (
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <Avatar
              src={getUrlImages(
                `/AFF-${affiliateData.id}.webp?d=${affiliateData.updatedAt}`
              )}
              name={affiliateData.fullName}
              w={32}
              h={32}
              styleText={{ fontSize: 12, fontWeight: 600 }}
            >
              <LevelAvatar
                level={item?.item?.level?.name}
                size={20}
                style={{ fontSize: 10 }}
              />
            </Avatar>
            <div>
              <div className={styles["titleOfFullName"]}>
                {affiliateData.fullName}
              </div>
              <div style={{ fontSize: 14 }}>
                {type === "N" ? item.item.prov : item.item.canton}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      key: "points",
      responsive: "onlyDesktop",
      onRender: (item: any) => (
        <div className={styles["points"]}>{item?.item?.points} pts</div>
      ),
    },
  ];

  return (
    <div className={styles["rankingTopTable"]}>
      <Table
        data={data}
        header={header || headerRankingTopTable}
        onRenderHead={null}
        showHeader={false}
        className="striped"
      />
    </div>
  );
};

export default RankingTopTable;
