"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Eye, EyeClosed } from "lucide-react";

type CodeCellProps = {
  code: string;
};

export const CodeCell = React.memo(({ code }: Readonly<CodeCellProps>) => {
  const [visible, setVisible] = useState(false);

  function toggle() {
    setVisible(!visible);
  }

  return (
    <section className="flex items-center justify-center w-full py-1 gap-2 hover:bg-gray-50 rounded-md transition-all duration-300">
      <span>{visible ? code : "*******"}</span>

      <Button
        variant="ghost"
        size="icon"
        onClick={toggle}
        className="cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
      >
        {visible ? <EyeClosed /> : <Eye />}
      </Button>
    </section>
  );
});
