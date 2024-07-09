import { useContext } from "react";
import { AxiosContext } from "@/mk/contexts/AxiosInstanceProvider";
import SkeletonAdapterComponent, { SkeletonType } from "./SkeletonAdapter";
import styles from "./loadingScreen.module.css";

interface PropsType {
  skeletonType?: SkeletonType;
  className?: string;
  children?: any;
}

const LoadingScreen = ({
  skeletonType = "CardSkeleton",
  className,
  children = null,
}: PropsType) => {
  const isSkeleton = !!skeletonType;
  const { waiting }: any = useContext(AxiosContext);
  if (waiting == 0) return children;
  if (isSkeleton) return <SkeletonAdapterComponent type={skeletonType} />;
  return (
    <div className={styles.loadingScreen + " " + className}>
      <div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
