import React from "react";
import { SelectList } from "react-native-dropdown-select-list";

export default function DropDownInput({selected, setSelected, placeholder, data}) {
//   const [selected, setSelected] = React.useState("");

//   const data = ["Pending", "InProcess", "Complete", "Hold"];
// console.log(selected);
  return (
    <SelectList
      setSelected={(val) => setSelected(val)}
      data={data}
      save="value"
      value={selected}
      search={false}
      placeholder={placeholder}
      boxStyles={{width:"100%"}}
    />
  );
}
