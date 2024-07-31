import axios from "axios";
import { Appbar } from "../components/Appbar";
import { TextEditor } from "../components/TextEditor";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {

  const [ title, setTitle ] = useState("");
  const [ description, setDescription ] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <div>
        <Appbar />
        <div className="flex justify-center w-full pt-8">
          <div className="max-w-screen-lg w-full">
            <input
             onChange={(e) => {
              setTitle(e.target.value);
             }}
              type="text"
              className="block outline-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Title"
            ></input>
            <TextEditor onChange={(e) => {
                setDescription(e.target.value);
            }}/>
            <button
              onClick={async () => {
                const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                  title,
                  content: description,
                }, {
                  headers: {
                    Authorization: localStorage.getItem("token")
                  }
                });
                navigate(`/blog/${response.data.id}`)
              }}
              type="submit"
              className=" mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800"
            >
              Publish post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
