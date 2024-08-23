import { Option } from "./MainSection";

export default function OptionComponent ({
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
      className={`p-4 hover:cursor-pointer border-2 hover:bg-[#eee3e1] text-2xl rounded-xl ${
        selectedOption === option.optionId
          ? "bg-green-200 border-green-500"
          : "border-[#e3cabe]"
      }`}
    >
      <span className="text-[#deb8a5]">{option.optionId}.</span> {option.text}
    </div>
  );
}
