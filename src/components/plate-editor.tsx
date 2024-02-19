"use client";

import {
  createPlugins,
  Plate,
  RenderAfterEditable,
  PlateLeaf,
  TElement,
} from "@udecode/plate-common";
import { withProps } from "@udecode/cn";
import {
  createParagraphPlugin,
  ELEMENT_PARAGRAPH,
} from "@udecode/plate-paragraph";
import {
  createHeadingPlugin,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from "@udecode/plate-heading";
import {
  createBlockquotePlugin,
  ELEMENT_BLOCKQUOTE,
} from "@udecode/plate-block-quote";
import {
  createCodeBlockPlugin,
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  ELEMENT_CODE_SYNTAX,
} from "@udecode/plate-code-block";
import {
  createHorizontalRulePlugin,
  ELEMENT_HR,
} from "@udecode/plate-horizontal-rule";
import { createLinkPlugin, ELEMENT_LINK } from "@udecode/plate-link";
import {
  createImagePlugin,
  ELEMENT_IMAGE,
  createMediaEmbedPlugin,
  ELEMENT_MEDIA_EMBED,
} from "@udecode/plate-media";
import { createCaptionPlugin } from "@udecode/plate-caption";
import {
  createTablePlugin,
  ELEMENT_TABLE,
  ELEMENT_TR,
  ELEMENT_TD,
  ELEMENT_TH,
} from "@udecode/plate-table";
import { createTodoListPlugin, ELEMENT_TODO_LI } from "@udecode/plate-list";
import {
  createExcalidrawPlugin,
  ELEMENT_EXCALIDRAW,
} from "@udecode/plate-excalidraw";
import {
  createBoldPlugin,
  MARK_BOLD,
  createItalicPlugin,
  MARK_ITALIC,
  createUnderlinePlugin,
  MARK_UNDERLINE,
  createStrikethroughPlugin,
  MARK_STRIKETHROUGH,
  createCodePlugin,
  MARK_CODE,
  createSubscriptPlugin,
  MARK_SUBSCRIPT,
  createSuperscriptPlugin,
  MARK_SUPERSCRIPT,
} from "@udecode/plate-basic-marks";
import {
  createFontColorPlugin,
  createFontBackgroundColorPlugin,
  createFontSizePlugin,
} from "@udecode/plate-font";
import {
  createHighlightPlugin,
  MARK_HIGHLIGHT,
} from "@udecode/plate-highlight";
import { createKbdPlugin, MARK_KBD } from "@udecode/plate-kbd";
import { createAlignPlugin } from "@udecode/plate-alignment";
import { createIndentPlugin } from "@udecode/plate-indent";
import { createIndentListPlugin } from "@udecode/plate-indent-list";
import { createLineHeightPlugin } from "@udecode/plate-line-height";
import { createComboboxPlugin } from "@udecode/plate-combobox";
import { createDndPlugin } from "@udecode/plate-dnd";
import { createEmojiPlugin } from "@udecode/plate-emoji";
import {
  createExitBreakPlugin,
  createSoftBreakPlugin,
} from "@udecode/plate-break";
import { createNodeIdPlugin } from "@udecode/plate-node-id";
import { createResetNodePlugin } from "@udecode/plate-reset-node";
import { createSelectOnBackspacePlugin } from "@udecode/plate-select";
import { createTabbablePlugin } from "@udecode/plate-tabbable";
import { createAutoformatPlugin } from "@udecode/plate-autoformat";
import { createBlockSelectionPlugin } from "@udecode/plate-selection";
import { createDeserializeDocxPlugin } from "@udecode/plate-serializer-docx";
import { createDeserializeCsvPlugin } from "@udecode/plate-serializer-csv";
import { createDeserializeMdPlugin } from "@udecode/plate-serializer-md";
import { createJuicePlugin } from "@udecode/plate-juice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { BlockquoteElement } from "@/components/plate-ui/blockquote-element";
import { CodeBlockElement } from "@/components/plate-ui/code-block-element";
import { CodeLineElement } from "@/components/plate-ui/code-line-element";
import { CodeSyntaxLeaf } from "@/components/plate-ui/code-syntax-leaf";
import { ExcalidrawElement } from "@/components/plate-ui/excalidraw-element";
import { HrElement } from "@/components/plate-ui/hr-element";
import { ImageElement } from "@/components/plate-ui/image-element";
import { LinkElement } from "@/components/plate-ui/link-element";
import { LinkFloatingToolbar } from "@/components/plate-ui/link-floating-toolbar";
import { HeadingElement } from "@/components/plate-ui/heading-element";
import { MediaEmbedElement } from "@/components/plate-ui/media-embed-element";
import { ParagraphElement } from "@/components/plate-ui/paragraph-element";
import { TableElement } from "@/components/plate-ui/table-element";
import { TableRowElement } from "@/components/plate-ui/table-row-element";
import {
  TableCellElement,
  TableCellHeaderElement,
} from "@/components/plate-ui/table-cell-element";
import { TodoListElement } from "@/components/plate-ui/todo-list-element";
import { CodeLeaf } from "@/components/plate-ui/code-leaf";
import { HighlightLeaf } from "@/components/plate-ui/highlight-leaf";
import { KbdLeaf } from "@/components/plate-ui/kbd-leaf";
import { Editor } from "@/components/plate-ui/editor";
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons";
import { withPlaceholders } from "@/components/plate-ui/placeholder";
import { withDraggables } from "@/components/plate-ui/with-draggables";
import { EmojiCombobox } from "@/components/plate-ui/emoji-combobox";
import { TooltipProvider } from "@/components/plate-ui/tooltip";
import { useMemo } from "react";
import { nanoid } from "nanoid/non-secure";

import {
  // createCloudAttachmentPlugin,
  createCloudImagePlugin,
  createCloudPlugin,
  // ELEMENT_CLOUD_ATTACHMENT,
  ELEMENT_CLOUD_IMAGE,
} from "./plate-ui/pi-cloud";

// import { CloudAttachmentElement } from '@/components/plate-ui/cloud-attachment-element';
import { CloudImageElement } from "@/components/plate-ui/cloud-image-element";
// import { CloudToolbarButtons } from "@/components/plate-ui/cloud-toolbar-buttons";

const getPlugins = (organizationId?: string) =>
  createPlugins(
    [
      createParagraphPlugin(),
      createHeadingPlugin(),
      createBlockquotePlugin(),
      createCodeBlockPlugin(),
      createHorizontalRulePlugin(),
      createLinkPlugin({
        renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
      }),
      createImagePlugin(),
      createMediaEmbedPlugin(),
      createCaptionPlugin({
        options: {
          pluginKeys: [ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED],
        },
      }),
      createTablePlugin(),
      createTodoListPlugin(),
      createExcalidrawPlugin(),
      createBoldPlugin(),
      createItalicPlugin(),
      createUnderlinePlugin(),
      createStrikethroughPlugin(),
      createCodePlugin(),
      createSubscriptPlugin(),
      createSuperscriptPlugin(),
      createFontColorPlugin(),
      createFontBackgroundColorPlugin(),
      createFontSizePlugin(),
      createHighlightPlugin(),
      createKbdPlugin(),
      createAlignPlugin({
        inject: {
          props: {
            validTypes: [
              ELEMENT_PARAGRAPH,
              ELEMENT_H1,
              ELEMENT_H2,
              ELEMENT_H3,
              ELEMENT_H4,
              ELEMENT_H5,
              ELEMENT_H6,
            ],
          },
        },
      }),
      createIndentPlugin({
        inject: {
          props: {
            validTypes: [
              ELEMENT_PARAGRAPH,
              ELEMENT_H1,
              ELEMENT_H2,
              ELEMENT_H3,
              ELEMENT_H4,
              ELEMENT_H5,
              ELEMENT_H6,
              ELEMENT_BLOCKQUOTE,
              ELEMENT_CODE_BLOCK,
            ],
          },
        },
      }),
      createIndentListPlugin({
        inject: {
          props: {
            validTypes: [
              ELEMENT_PARAGRAPH,
              ELEMENT_H1,
              ELEMENT_H2,
              ELEMENT_H3,
              ELEMENT_H4,
              ELEMENT_H5,
              ELEMENT_H6,
              ELEMENT_BLOCKQUOTE,
              ELEMENT_CODE_BLOCK,
            ],
          },
        },
      }),
      createLineHeightPlugin({
        inject: {
          props: {
            defaultNodeValue: 1.5,
            validNodeValues: [1, 1.2, 1.5, 2, 3],
            validTypes: [
              ELEMENT_PARAGRAPH,
              ELEMENT_H1,
              ELEMENT_H2,
              ELEMENT_H3,
              ELEMENT_H4,
              ELEMENT_H5,
              ELEMENT_H6,
            ],
          },
        },
      }),
      createComboboxPlugin(),
      createDndPlugin({
        options: { enableScroller: true },
      }),
      createEmojiPlugin({
        renderAfterEditable: EmojiCombobox,
      }),
      createExitBreakPlugin({
        options: {
          rules: [
            {
              hotkey: "mod+enter",
            },
            {
              hotkey: "mod+shift+enter",
              before: true,
            },
            {
              hotkey: "enter",
              query: {
                start: true,
                end: true,
                // allow: KEYS_HEADING,
              },
              relative: true,
              level: 1,
            },
          ],
        },
      }),
      createNodeIdPlugin(),
      createResetNodePlugin({
        options: {
          rules: [
            // Usage: https://platejs.org/docs/reset-node
          ],
        },
      }),
      createSelectOnBackspacePlugin({
        options: {
          query: {
            allow: [ELEMENT_IMAGE, ELEMENT_HR, ELEMENT_EXCALIDRAW],
          },
        },
      }),
      createSoftBreakPlugin({
        options: {
          rules: [
            { hotkey: "shift+enter" },
            {
              hotkey: "enter",
              query: {
                allow: [ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD],
              },
            },
          ],
        },
      }),
      createTabbablePlugin(),
      createAutoformatPlugin({
        options: {
          rules: [
            // Usage: https://platejs.org/docs/autoformat
          ],
          enableUndoOnDelete: true,
        },
      }),
      createBlockSelectionPlugin({
        options: {
          sizes: {
            top: 0,
            bottom: 0,
          },
        },
      }),
      createDeserializeDocxPlugin(),
      createDeserializeCsvPlugin(),
      createDeserializeMdPlugin(),
      createJuicePlugin(),
      createCloudPlugin({
        options: {
          organizationId,
        },
      }),
      // createCloudAttachmentPlugin(),
      createCloudImagePlugin({
        options: {
          maxInitialWidth: 1080,
          maxInitialHeight: 720,
          minResizeWidth: 100,
          maxResizeWidth: 1920,
        },
      }),
    ],
    {
      components: withDraggables(
        withPlaceholders({
          [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
          [ELEMENT_CODE_BLOCK]: CodeBlockElement,
          [ELEMENT_CODE_LINE]: CodeLineElement,
          [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
          [ELEMENT_EXCALIDRAW]: ExcalidrawElement,
          [ELEMENT_HR]: HrElement,
          [ELEMENT_IMAGE]: ImageElement,
          [ELEMENT_CLOUD_IMAGE]: CloudImageElement,
          // [ELEMENT_CLOUD_ATTACHMENT]: CloudAttachmentElement,
          [ELEMENT_LINK]: LinkElement,
          [ELEMENT_H1]: withProps(HeadingElement, { variant: "h1" }),
          [ELEMENT_H2]: withProps(HeadingElement, { variant: "h2" }),
          [ELEMENT_H3]: withProps(HeadingElement, { variant: "h3" }),
          [ELEMENT_H4]: withProps(HeadingElement, { variant: "h4" }),
          [ELEMENT_H5]: withProps(HeadingElement, { variant: "h5" }),
          [ELEMENT_H6]: withProps(HeadingElement, { variant: "h6" }),
          [ELEMENT_MEDIA_EMBED]: MediaEmbedElement,
          [ELEMENT_PARAGRAPH]: ParagraphElement,
          [ELEMENT_TABLE]: TableElement,
          [ELEMENT_TR]: TableRowElement,
          [ELEMENT_TD]: TableCellElement,
          [ELEMENT_TH]: TableCellHeaderElement,
          [ELEMENT_TODO_LI]: TodoListElement,
          [MARK_BOLD]: withProps(PlateLeaf, { as: "strong" }),
          [MARK_CODE]: CodeLeaf,
          [MARK_HIGHLIGHT]: HighlightLeaf,
          [MARK_ITALIC]: withProps(PlateLeaf, { as: "em" }),
          [MARK_KBD]: KbdLeaf,
          [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: "s" }),
          [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: "sub" }),
          [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: "sup" }),
          [MARK_UNDERLINE]: withProps(PlateLeaf, { as: "u" }),
        }),
      ),
    },
  );

type Props = {
  value?: Array<TElement>;
  initialValue?: Array<TElement>;
  placeholder?: string;
  dense?: boolean;
  hideFloatingOptionsFromFixedToolbar?: boolean;
  className?: string;
  containerClassName?: string;
} & (
  | {
      readOnly: true;
      onChange?: never;
      organizationId?: never;
    }
  | {
      readOnly?: false;
      onChange: (value: Array<TElement>) => void;
      organizationId: string;
    }
);

const isElementEmpty = (element: TElement) => {
  return (
    [
      ELEMENT_PARAGRAPH,
      ELEMENT_H1,
      ELEMENT_H2,
      ELEMENT_H3,
      ELEMENT_H4,
      ELEMENT_H5,
      ELEMENT_H6,
    ].includes(element.type) &&
    element.children.length === 1 &&
    /^\s*$/.test(element.children[0]!.text as string)
  );
};

const PlateEditor: React.FC<Props> = ({
  initialValue,
  value,
  onChange,
  dense,
  className,
  containerClassName,
  hideFloatingOptionsFromFixedToolbar,
  organizationId,
  readOnly = false,
}) => {
  // Hack for rerendering on value change https://github.com/udecode/plate/discussions/1262#discussioncomment-6851423
  const valueKey = useMemo(nanoid, [value]);
  const plugins = useMemo(() => getPlugins(organizationId), [organizationId]);

  const onChangeIgnoreEmptyElements = useMemo(() => {
    if (!onChange) return undefined;

    return (value: Array<TElement>) => {
      const firstNonEmptyElementIndex = value.findIndex(
        (element) => !isElementEmpty(element),
      );

      if (firstNonEmptyElementIndex === -1) {
        onChange([]);
      } else {
        const lastNonEmptyElementIndex = value.findLastIndex(
          (element) => !isElementEmpty(element),
        );

        onChange(
          value.slice(firstNonEmptyElementIndex, lastNonEmptyElementIndex + 1),
        );
      }
    };
  }, [onChange]);

  if (readOnly) {
    return (
      <Plate
        key={valueKey}
        plugins={plugins}
        initialValue={initialValue}
        value={value}
        readOnly
      >
        <Editor
          variant="ghost"
          dense={dense}
          readOnly
          className={className}
          containerClassName={containerClassName}
        />
      </Plate>
    );
  }

  return (
    <TooltipProvider
      disableHoverableContent
      delayDuration={500}
      skipDelayDuration={0}
    >
      <DndProvider backend={HTML5Backend} context={window}>
        <Plate
          plugins={plugins}
          initialValue={initialValue}
          onChange={onChangeIgnoreEmptyElements}
        >
          <FixedToolbar>
            <FixedToolbarButtons
              hideFloatingOptions={hideFloatingOptionsFromFixedToolbar}
            />
          </FixedToolbar>

          <Editor
            dense={dense}
            className={className}
            containerClassName={containerClassName}
          />

          <FloatingToolbar>
            <FloatingToolbarButtons />
          </FloatingToolbar>
        </Plate>
      </DndProvider>
    </TooltipProvider>
  );
};

export default PlateEditor;
