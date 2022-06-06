import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Discount() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md w-full p-4">
      <div className="relative overflow-hidden">
        <input
          type="checkbox"
          className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"
        />
        <div className="h-12 w-full pl-5 flex items-center justify-between">
          <h1>Have a discount code?</h1>
          <FontAwesomeIcon icon={faArrowDown} className="w-4" />
        </div>
        <div className="overflow-hidden bg-white transition-all duration-500 max-h-0 peer-checked:max-h-40 m-4">
          <input
            className="p-5 border-t rounded-lg w-full border-2"
            placeholder="Input Code"
            type="text"
            // onChange={(e) => handleOnChange(e)}
          />
        </div>
      </div>
    </div>
  );
}
