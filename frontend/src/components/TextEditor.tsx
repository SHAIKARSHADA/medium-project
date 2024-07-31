import type { ChangeEvent } from "react";


export const TextEditor = ({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) => {
  return (
    <>
      <div className="mt-2">
        <div className="w-full mb-4 ">
          <div className="flex items-center justify-between border">
            <div className="my-2 bg-white w-full">
              <label className="sr-only">Publish post</label>
              <textarea
              onChange={onChange}
                id="editor"
                rows={8}
                className="pl-2 outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0"
                placeholder="Write an article..."
                required
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
