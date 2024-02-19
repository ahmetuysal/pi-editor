"use client";

import React, { useRef } from "react";

import { Icons } from "@/components/icons";

import { ToolbarButton } from "./toolbar";
import { onSelectCloud } from "@/components/plate-ui/pi-cloud";
import { useEditorState } from "@udecode/plate-common";

export function MediaToolbarButton() {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const editor = useEditorState();

  return (
    <ToolbarButton
      onClick={() => {
        imageInputRef.current?.click();
      }}
    >
      <input
        ref={imageInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          onSelectCloud(editor as any, e);
        }}
      />
      <Icons.image />
    </ToolbarButton>
  );
}
