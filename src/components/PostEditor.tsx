import { useEffect, useState } from "react";

import "immutable";
import * as Draft from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./PostEditor.css";

import classNames from "classnames";

interface RichEditorProps {
  initialValue?: string;
  onChange: (value: string) => void;
  className?: string;
  label?: string;
}

export const PostEditor: React.FC<RichEditorProps> = ({
  initialValue = "",
  className,
  onChange,
  label,
}) => {
  const [editorState, setEditorState] = useState(
    () =>
      Draft.EditorState &&
      Draft.EditorState.createWithContent(
        Draft.convertFromRaw(markdownToDraft(initialValue))
      )
  );

  const onEditorStateChange = (editorState: Draft.EditorState) => {
    setEditorState(editorState);

    onChange(
      draftToMarkdown(Draft.convertToRaw(editorState.getCurrentContent()))
    );
  };

  useEffect(() => {
    if (Draft.EditorState) {
      setEditorState(
        Draft.EditorState.createWithContent(
          Draft.convertFromRaw(markdownToDraft(initialValue))
        )
      );
    }
  }, [Draft.EditorState, initialValue]);

  return (
    <div className={classNames("wrapper-class", className)}>
      <p className="block text-md font-medium text-gray-600 m-0">{label}</p>
      <Editor
        toolbar={{
          options: ["inline", "blockType", "list", "emoji", "history"],
          inline: {
            options: ["bold", "italic", "underline", "strikethrough"],
          },
        }}
        onEditorStateChange={onEditorStateChange}
        editorState={editorState}
        editorClassName="bg-white p-4 shadow-md"
        toolbarClassName="shadow-md"
      />
    </div>
  );
};
