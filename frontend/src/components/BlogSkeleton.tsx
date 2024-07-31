import { Circle } from "./Circle";

export const BlogSkeleton = () => {
  return (
    <>
      <div role="status" className=" mt-5 animate-pulse ">
        <div className=" p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
          <div className="flex">
            <div>
              <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
            <div className="pl-2 flex justify-center flex-col">
              <Circle />
            </div>
            <div className="font-thin pl-2 text-sm flex justify-center flex-col text-slate-500">
              <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
            </div>
          </div>
          <div className="text-xl pt-2 font-semibold">
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
          </div>
          <div className="font-thin text-md">
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
          </div>
          <div className="text-slate-500 font-thin pt-2 text-sm">
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
          </div>
        </div>

        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};
