import React from "react";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const SelectUnits = (props) => {
  console.log(props);
  return (
    <Form>
      <Form.Group className="mt-3 mb-3">
        <FloatingLabel controlId="floatingSelect" label={props.data.label}>
          <Form.Select
            size="sm"
            value={props.data.selectedValue}
            onChange={props.handleUnitSelector}
            name={props.data.populateType}
          >
            <option value="">Select Unit</option>
            {props.data.populateType === "unitOptionsSelector"
              ? props.data.populateWith.map((ele, index) => (
                  <option value={props.data.measurements[index]} key={index}>
                    {ele}
                  </option>
                ))
              : props.data.populateWith.map((ele) => (
                  <option value={ele.abbr} key={ele.abbr}>
                    {ele.plural}
                  </option>
                ))}
          </Form.Select>
        </FloatingLabel>
      </Form.Group>
    </Form>
  );
};

export default SelectUnits;
