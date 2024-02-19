"use client"


import dynamic from "next/dynamic";
import {useState} from "react";

const PlateEditor = dynamic(() => import("@/components/plate-editor"), {
    ssr: false,
});

const Editor: React.FC = () => {
    const [value, setValue] = useState<any>(null);

    return (
      <div className="relative pt-2 w-full">
        <PlateEditor
          className="min-h-48"
            organizationId=""
            initialValue={value}
            onChange={setValue}
            hideFloatingOptionsFromFixedToolbar
        />
      </div>
    )

}

export default Editor;