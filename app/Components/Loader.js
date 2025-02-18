import { MoonLoader } from "react-spinners";
export default function Loader() {
  return <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
    <MoonLoader color='#F16724'/>
</div>
}