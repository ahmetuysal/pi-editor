import React from "react";
import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import {
  focusEditor,
  useEditorReadOnly,
  useEditorState,
  usePlateStore,
} from "@udecode/plate-common";

import { Icons } from "@/components/icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from "./dropdown-menu";
import { ToolbarButton } from "./toolbar";

export function ModeDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorState();
  const setReadOnly = usePlateStore().set.readOnly();
  const readOnly = useEditorReadOnly();
  const openState = useOpenState();

  let value = "editing";
  if (readOnly) value = "viewing";

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          pressed={openState.open}
          tooltip="Editing mode"
          isDropdown
          className="min-w-[auto] lg:min-w-[130px]"
        >
          {readOnly ? (
            <>
              <Icons.viewing className="mr-2 h-5 w-5" />
              <span className="hidden lg:inline">Viewing</span>
            </>
          ) : (
            <>
              <Icons.editing className="mr-2 h-5 w-5" />
              <span className="hidden lg:inline">Editing</span>
            </>
          )}
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-[180px]">
        <DropdownMenuRadioGroup
          className="flex flex-col gap-0.5"
          value={value}
          onValueChange={(newValue) => {
            if (newValue !== "viewing") {
              setReadOnly(false);
            }

            if (newValue === "viewing") {
              setReadOnly(true);
              return;
            }

            if (newValue === "editing") {
              focusEditor(editor);
              return;
            }
          }}
        >
          <DropdownMenuRadioItem value="editing">
            <Icons.editing className="mr-2 h-5 w-5" />
            <span>Editing</span>
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem value="viewing">
            <Icons.viewing className="mr-2 h-5 w-5" />
            <span>Viewing</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
