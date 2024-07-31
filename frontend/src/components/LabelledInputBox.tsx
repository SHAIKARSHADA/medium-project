import type { ChangeEvent } from "react"

interface LabelledInputBox {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string
}

export const LabelledInputBox = ({label, placeholder, onChange, type}: LabelledInputBox) => {
  return <div>
    <div>
            <label className="block mb-2 text-sm font-semibold text-black pt-4">{label}</label>
            <input type={type || "text"} onChange={onChange} id="first_name" className="bg-gray-50 m-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
  </div>
}