import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { Circle } from "./Circle";

interface BlogCardProps {
  id: number;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <>
      <Link to={`/blog/${id}`}>
        <div className=" p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
          <div className="flex">
            <div>
              <Avatar size={"small"} name={authorName} />
            </div>
            <div className="font-extralight pl-2 font-sm flex justify-center flex-col">
              {authorName}
            </div>
            <div className="pl-2 flex justify-center flex-col">
              <Circle />
            </div>
            <div className="font-thin pl-2 text-sm flex justify-center flex-col text-slate-500">
              {publishedDate}
            </div>
          </div>
          <div className="text-xl pt-2 font-semibold">{title}</div>
          <div className="font-thin text-md">
            {content.length > 170 ? content.slice(0, 170) + "..." : content}
          </div>
          <div className="text-slate-500 font-thin pt-2 text-sm">
            {`${Math.ceil(content.length / 100)} minutes read`}
          </div>
        </div>
      </Link>
    </>
  );
};
