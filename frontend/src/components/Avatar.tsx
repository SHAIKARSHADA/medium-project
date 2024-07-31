export const Avatar = ({
  name,
  size = "small",
}: {
  name: string;
  size: "small" | "big";
}) => {
  return (
    <>
      <div
        className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${
          size === "small" ? "w-6  h-6" : "w-10 h-10"
        }  `}
      >
        <span
          className={`font-xs font-extralight text-gray-600 dark:text-gray-300 ${
            size === "small" ? "text-xs" : "text-md"
          }`}
        >
          {name[0].toUpperCase()}
        </span>
      </div>
    </>
  );
};
