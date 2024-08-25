import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import PropTypes from "prop-types";

function SelectOptions({label, title ,name, id, value, options, onValueChange, className, triggerClassName }) {
  
  return (
    <div className="mb-2 space-y-1">
      <Label>{label}</Label>
      <Select
      name={name}
      value={value}
      onValueChange={(val) => onValueChange({ target: { name, value: val } })}
      className={` w-full ${className}`} 
      >
        <SelectTrigger className={`${triggerClassName}`}>
          <SelectValue placeholder={title} />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option, index) => (
            <SelectItem
              key={index}
              value={id ? id[index] : option}
              className="w-full "
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

SelectOptions.propTypes = {
  options: PropTypes.array,
  value: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string,
  onValueChange: PropTypes.func,
  className: PropTypes.string,
  id: PropTypes.array,
  triggerClassName: PropTypes.string,
  label: PropTypes.string,
};
export default SelectOptions;
