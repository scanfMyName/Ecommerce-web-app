import React, { useState } from "react";

const CheckboxGroup = () => {
  const [selected, setSelected] = useState("");
  
  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  
  return (
    <div>
      <input
        type="checkbox"
        value="option1"
        checked={selected === "option1"}
        onChange={handleChange}
      />
      
      <br />
      <input
        type="checkbox"
        value="option2"
        checked={selected === "option2"}
        onChange={handleChange}
      />
      
      <br />
      <input
        type="checkbox"
        value="option3"
        checked={selected === "option3"}
        onChange={handleChange}
      />
    </div>
  );
};

export default CheckboxGroup;