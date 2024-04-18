"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Tabs = () => {
  return (
    <div
      className="mt-8"
      style={{
        position: "sticky",
        top: "0",
        zIndex: "1",
      }}
    >
      <div className="flex gap-5 my-4">
        <div className="flex items-center justify-center">
          <div className="text-sm font-semibold mr-2">Feed</div>

          <Badge
            variant="destructive"
            className=" bg-[#006EED] hover:bg-[#0b65cc]"
          >
            For you
          </Badge>
        </div>
        <div>
          <div className="flex items-center justify-center">
            <div className="text-sm font-semibold">Following</div>
          </div>
        </div>
      </div>
      <Separator className="bg-[#444C56]" />
    </div>
  );
};

export default Tabs;
