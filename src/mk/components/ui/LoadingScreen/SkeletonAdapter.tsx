import CardSkeleton, { TableSkeleton } from "../Skeleton/Skeleton";

interface SkeletonAdapter {
  [key: string]: React.FC<any>;
}

export type SkeletonType = "CardSkeleton" | "TableSkeleton";

const SkeletonComponents: SkeletonAdapter = {
  CircleLoading: CircleLoading,
  CardSkeleton: CardSkeleton,
  TableSkeleton: TableSkeleton,
};

const SkeletonAdapterComponent: React.FC<{ type: SkeletonType }> = ({
  type,
}) => {
  const SkeletonComponent = SkeletonComponents[type];
  return <SkeletonComponent />;
};

export default SkeletonAdapterComponent;
