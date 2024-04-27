"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Props = {
  firstTab: string;
  secondTab: string;
  isProfile?: boolean;
};

const Tabs = ({ firstTab, secondTab, isProfile }: Props) => {
  return (
    <div className="mt-8">
      <div className="flex gap-5 my-4 ">
        <div className="flex items-center justify-center">
          <div className="text-sm font-semibold mr-2">{firstTab}</div>

          {!isProfile && (
            <Badge
              variant="destructive"
              className=" bg-[#006EED] hover:bg-[#0b65cc]"
            >
              For you
            </Badge>
          )}
        </div>
        <div>
          <div className="flex items-center justify-center">
            <div className="text-sm font-semibold mr-2">{secondTab}</div>
            {isProfile && (
              <Badge
                variant="destructive"
                className=" bg-[#006EED] hover:bg-[#0b65cc]"
              >
                For me
              </Badge>
            )}
          </div>
        </div>
      </div>
      <Separator className="bg-[#444C56]" />
    </div>
  );
};

export default Tabs;
