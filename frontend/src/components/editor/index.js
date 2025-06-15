import React, { useRef } from "react";
import JoditEditor from "jodit-react";

const Editor = ({ initialValue, onChange, placeholder }) => {
  const editor = useRef(null);

  return (
    <JoditEditor
      ref={editor}
      value={initialValue}
      onBlur={(newContent) => onChange(newContent)}
      config={{
        readonly: false,
        placeholder: placeholder,
        height: 400,
      }}
    />
  );
};

export default Editor;
