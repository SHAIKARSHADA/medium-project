import { Link, useNavigate } from "react-router-dom"
import { LabelledInputBox } from "./LabelledInputBox"
import { SignupInput } from "@shaik555/medium1"
import { useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"


export const Auth = ({type} : {type: "signup" | "signin"}) => {
  const navigate = useNavigate();
  const [ postInputs, setPostInputs ]  = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  const sendRequest = async () => {
   try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,postInputs)
    const jwt = response.data;
    localStorage.setItem("token",jwt);
    navigate("/blogs");
   } catch(e) {
    
   }
  }

 return (
  <div className="h-screen flex justify-center flex-col">
    <div className="flex justify-center">
      <div>
      <div className="px-10">
        <div className="text-3xl font-extrabold">
          {type === "signin" ? "Log In to Your Account" : "Create An Account"}
        </div>
        <div className="text-slate-400 text-center mt-2">
          {type === "signin" ? "Don't have an account?" : "Already have an account?" }
          <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
          {type === "signin" ? "Sign up" : "Login"}</Link>
        </div>
      </div>
      <div className="pt-4">
      {type === "signup" ? <LabelledInputBox label="Name" placeholder="John doe...." onChange={(e) => {
            setPostInputs({
              ...postInputs,
              name: e.target.value
            })
          }} /> : null}
           <LabelledInputBox label="Username" placeholder="Johndoe@gmail.com" onChange={(e) => {
            setPostInputs({
              ...postInputs,
              email: e.target.value
            })
          }} />
           <LabelledInputBox label="Password" type={"password"} placeholder="John doe...." onChange={(e) => {
            setPostInputs({
              ...postInputs,
              password: e.target.value
            })
          }} />
          <button onClick={sendRequest} type="button" className="w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{type === "signup" ? "Sign up" : "Sign in"}</button>
      </div>
    </div>
  </div>
  </div>
 ) 
}