import { BarLoader } from "react-spinners";
export default function Loader() {
  return <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
    <BarLoader color='#c03b2c'/>
</div>
}