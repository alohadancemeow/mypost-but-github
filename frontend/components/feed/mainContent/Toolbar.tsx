"use client";

import React, { ElementRef, SetStateAction, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

type Props = {
  title: string;
  preview?: boolean;
  setTitle: React.Dispatch<SetStateAction<string>>;
};

const Toolbar = ({ title, preview }: Props) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onInput = (value: string) => {
    setValue(value);
    // update({
    //   id: initialData._id,
    //   title: value || "Untitled",
    // });
  };

  return (
    <div className="pl-[54px] group relative">
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl  bg-transparent font-bold break-words outline-none text-[#CFCFCF] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#CFCFCF]"
        >
          {title}
        </div>
      )}
    </div>
  );
};

export default Toolbar;
