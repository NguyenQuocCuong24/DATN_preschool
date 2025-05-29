import { Suspense } from "react";
import LeftMenu from "../../components/sidebar/leftMenu";
import ShuttleScheduleContent from "./ShuttleScheduleContent";

export default function ShuttleSchedulePage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <LeftMenu />
      <Suspense fallback={<div>Loading...</div>}>
        <ShuttleScheduleContent />
      </Suspense>
    </div>
  );
}
