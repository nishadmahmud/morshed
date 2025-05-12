import { ScaleLoader } from "react-spinners";
export default function Loader() {
  return <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
    <ScaleLoader color='#115e59'/>
</div>
}