"use client";

import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import useSavedTab from "@/store/use-saved-tab";
import { Compass, SquareKanban, Star, Users } from "lucide-react";
import { size } from "zod";

type Props = {
  firstTab: string;
  secondTab?: string;
  isProfile?: boolean;
  owner?: string;
};

const Tabs = ({ firstTab, secondTab, isProfile, owner }: Props) => {
  const { userId, isLoaded } = useAuth();
  const { isSelected, onCancel, onSelect } = useSavedTab();

  if (!isLoaded) return null;

  const showSecondTab = Boolean(secondTab) && (isProfile ? owner === userId : true);

  return (
    <div className="mt-6">
      <div
        role="tablist"
        aria-label="Content tabs"
        className="flex gap-8 border-b border-[#30363D]"
      >
        <button
          type="button"
          role="tab"
          aria-selected={!isSelected}
          className={cn(
            "relative -mb-px cursor-pointer flex items-center gap-2 border-b-2 px-1 pb-3 text-sm font-semibold transition-colors",
            !isSelected
              ? "border-[#1F6FEB] text-[#1F6FEB]"
              : "border-transparent text-[#8B949E] hover:text-[#C9D1D9]"
          )}
          onClick={onCancel}
        >
          {!isProfile ? <Compass size={18} className="shrink-0" /> : <SquareKanban size={18} className="shrink-0" />}
          <span>{firstTab}</span>
        </button>

        {showSecondTab && (
          <button
            type="button"
            role="tab"
            aria-selected={isSelected}
            className={cn(
              "relative -mb-px cursor-pointer flex items-center gap-2 border-b-2 px-1 pb-3 text-sm font-semibold transition-colors",
              isSelected
                ? "border-[#1F6FEB] text-[#1F6FEB]"
                : "border-transparent text-[#8B949E] hover:text-[#C9D1D9]"
            )}
            onClick={onSelect}
          >
            {!isProfile ? <Users size={18} className="shrink-0" /> : <Star size={18} className="shrink-0" />}
            <span>{secondTab}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Tabs;
