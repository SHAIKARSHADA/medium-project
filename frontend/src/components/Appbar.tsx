import { Avatar } from "./Avatar";
import { Link } from "react-router-dom";

export const Appbar = () => {
  return (
    <div className="border-b py-4 flex justify-between px-10">
      <Link to={"/blogs"} className="flex justify-center text-lg flex-col">
        Medium
      </Link>
      <div>
        <Link to={`/publish`}>
          <button
            type="button"
            className="mr-8 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            New Blog
          </button>
        </Link>
        <Avatar size={"big"} name="shaik" />
      </div>
    </div>
  );
};
