import { Option } from "./MainSection";

export default function OptionComponent({
  option,
  selectedOption,
  handleSelectOption,
}: {
  option: Option;
  selectedOption: string;
  handleSelectOption: (val: string) => void;
}) {
  return (
    <div
      onClick={() => handleSelectOption(option.optionId)}
      className={`hover:cursor-pointer border-2 hover:bg-gray-400 dark:hover:bg-gray-600 text-2xl rounded-xl flex items-center group ${
        selectedOption === option.optionId
          ? "bg-green-300 border-green-500"
          : ""
      }`}
    >
      <span
        className={`text-white border-r-2 p-4 mr-2 bg-slate-600 dark:bg-slate-400 rounded-l-xl ${
          selectedOption === option.optionId ? "border-r-green-500" : ""
        }`}
      >
        {option.optionId}.
      </span>{" "}
      <span
        className={` ${
          selectedOption === option.optionId ? "text-black dark:group-hover:text-white" : ""
        }`}
      >
        {option.text}
      </span>
    </div>
  );
}
