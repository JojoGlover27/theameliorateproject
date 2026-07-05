import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;
  const btn = "px-2 py-1 text-xs rounded border hover:bg-accent";
  const on = "bg-accent";
  return (
    <div className="flex flex-wrap gap-1 border rounded-md p-2 bg-muted/30 mb-2">
      <button type="button" className={`${btn} ${editor.isActive("heading", { level: 2 }) ? on : ""}`} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
      <button type="button" className={`${btn} ${editor.isActive("heading", { level: 3 }) ? on : ""}`} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>
      <button type="button" className={`${btn} ${editor.isActive("bold") ? on : ""}`} onClick={() => editor.chain().focus().toggleBold().run()}><b>B</b></button>
      <button type="button" className={`${btn} ${editor.isActive("italic") ? on : ""}`} onClick={() => editor.chain().focus().toggleItalic().run()}><i>I</i></button>
      <button type="button" className={`${btn} ${editor.isActive("bulletList") ? on : ""}`} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
      <button type="button" className={`${btn} ${editor.isActive("orderedList") ? on : ""}`} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</button>
      <button type="button" className={`${btn} ${editor.isActive("blockquote") ? on : ""}`} onClick={() => editor.chain().focus().toggleBlockquote().run()}>❝ Quote</button>
      <button
        type="button"
        className={`${btn} ${editor.isActive("link") ? on : ""}`}
        onClick={() => {
          const prev = editor.getAttributes("link").href as string | undefined;
          const url = prompt("Link URL", prev ?? "https://");
          if (url === null) return;
          if (url === "") editor.chain().focus().unsetLink().run();
          else editor.chain().focus().extendMarkRange("link").setLink({ href: url, target: "_blank" }).run();
        }}
      >Link</button>
      <button
        type="button"
        className={btn}
        onClick={() => {
          const url = prompt("Image URL (Unsplash / hosted URL)");
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }}
      >Image</button>
      <button
        type="button"
        className={btn}
        onClick={() => {
          const label = prompt("Button label", "Read more");
          const url = prompt("Button URL", "https://ameliorateproject.org");
          if (!label || !url) return;
          const html = `<p style="text-align:center;margin:24px 0;"><a href="${url}" style="display:inline-block;background:#3C14A0;color:#fff;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:600;">${label}</a></p>`;
          editor.chain().focus().insertContent(html).run();
        }}
      >Button</button>
    </div>
  );
}

export default function NewsletterEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Image.configure({ inline: false, HTMLAttributes: { style: "max-width:100%;height:auto;border-radius:8px;margin:16px 0;" } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { style: "color:#3C14A0;text-decoration:underline;" } }),
      Placeholder.configure({ placeholder: "Write your newsletter…" }),
    ],
    content: value || "<p></p>",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && value && editor.getHTML() !== value && !editor.isFocused) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div>
      <Toolbar editor={editor} />
      <div className="border rounded-md bg-background">
        <EditorContent editor={editor} className="prose prose-sm max-w-none p-4 min-h-[300px] focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[280px]" />
      </div>
    </div>
  );
}
