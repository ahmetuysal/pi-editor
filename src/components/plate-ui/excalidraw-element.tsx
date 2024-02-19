"use client";

import React, { useState } from "react";
import {
  findNodePath,
  PlateElement,
  PlateElementProps,
  setNodes,
  useEditorReadOnly,
  Value,
} from "@udecode/plate-common";
import {
  TExcalidrawElement,
  useExcalidrawElement,
} from "@udecode/plate-excalidraw";
import { useReadOnly } from "slate-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function ExcalidrawElement({
  nodeProps,
  ...props
}: PlateElementProps<Value, TExcalidrawElement>) {
  const { children, element, editor } = props;
  const { resolvedTheme, forcedTheme } = useTheme();

  const activeTheme = forcedTheme ?? resolvedTheme;

  const { Excalidraw, excalidrawProps } = useExcalidrawElement({
    element,
  });

  const readonly = useReadOnly();
  const { toast } = useToast();

  const excalidrawRef = React.useRef<any>(null);

  return (
    <PlateElement {...props}>
      <div contentEditable={false}>
        <div
          className="relative h-[600px]"
          data-mode={readonly ? "view" : "edit"}
        >
          {Excalidraw && (
            <Excalidraw
              viewModeEnabled={readonly}
              theme={activeTheme === "dark" ? "dark" : "light"}
              UIOptions={{
                canvasActions: {
                  changeViewBackgroundColor: !readonly,
                  clearCanvas: !readonly,
                  loadScene: !readonly,
                  saveToActiveFile: !readonly,
                  toggleTheme: false,
                  saveAsImage: readonly ? false : undefined,
                  export: readonly ? false : undefined,
                },
              }}
              ref={excalidrawRef}
              {...nodeProps}
              {...(excalidrawProps as any)}
            ></Excalidraw>
          )}
          {!readonly && (
            <Button
              onClick={() => {
                const path = findNodePath(editor, element);

                setNodes(
                  editor,
                  {
                    data: {
                      elements: excalidrawRef.current.getSceneElements(),
                    },
                  },
                  { at: path },
                );

                toast({
                  title: "Çizim güncellendi.",
                  description:
                    "Kalıcı olarak kaydetmek için hala formu göndermeniz gerektiğini unutmayın!",
                });
              }}
              variant="outline"
              className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2"
              type="button"
            >
              Çizimi Kaydet
            </Button>
          )}
        </div>
      </div>
      {children}
    </PlateElement>
  );
}
