import React from "react";

import Form from "react-bootstrap/Form";

const InputField = (props) => {
  return (
    <Form>
      <Form.Group>
        <Form.Control
          type="number"
          label={props.data.label}
          placeholder="Enter the number"
          name={props.data.name}
          value={props.data.currentValue}
          onChange={props.handleInput}
        />
      </Form.Group>
    </Form>
  );
};

export default InputField;
