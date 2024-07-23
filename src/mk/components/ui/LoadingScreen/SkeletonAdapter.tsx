import CardSkeleton, { CircleLoading, LatestInvoicesSkeleton } from "../Skeleton/Skeleton";

interface SkeletonAdapter {
  [key: string]: React.FC<any>;
}

export type SkeletonType = "CardSkeleton" | "LatestInvoicesSkeleton" | "CircleLoading";


const SkeletonComponents: SkeletonAdapter = {
  CircleLoading: CircleLoading,
  CardSkeleton: CardSkeleton,
  LatestInvoicesSkeleton: LatestInvoicesSkeleton,
};

const SkeletonAdapterComponent: React.FC<{ type: SkeletonType }> = ({
  type,
}) => {
  const SkeletonComponent = SkeletonComponents[type];
  return <SkeletonComponent />;
};

export default SkeletonAdapterComponent;
