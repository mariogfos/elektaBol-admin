import CardSkeleton, { LatestInvoicesSkeleton } from "../Skeleton/Skeleton";

interface SkeletonAdapter {
  [key: string]: React.FC<any>;
}

export type SkeletonType = "CardSkeleton" | "LatestInvoicesSkeleton";


const SkeletonComponents: SkeletonAdapter = {
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
