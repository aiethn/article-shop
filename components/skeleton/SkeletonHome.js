import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export function SkeletonHome() {
  return (
    <div className="flex flex-wrap justify-center -z-10">
      <SkeletonTheme height="20rem" width="28rem">
        <Skeleton className="m-4" />
        <Skeleton className="m-4" />
        <Skeleton className="m-4" />
        <Skeleton className="m-4" />
      </SkeletonTheme>
    </div>
  );
}
