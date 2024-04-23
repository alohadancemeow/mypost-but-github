"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { RotateCcw } from "lucide-react";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className="bg-blue-700 hover:bg-blue-900"
      disabled={pending}
      type="submit"
    >
      {`${pending ? <RotateCcw className="mr-2 h-4 w-4 animate-spin" /> : "Create post"}`}
    </Button>
  );
}
