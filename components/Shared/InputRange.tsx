import React, { useEffect, useState } from 'react';
import InputRange from 'react-input-range';
import styled from 'styled-components';

const StyledForm = styled.form`
  margin-top: 1rem;
  padding-top: 1rem;
  max-width: 90%;
  padding-left: 8px;
  .input-range__track--active,
  .input-range__slider {
    background: #fa4a5b;
    border-color: #fa4a5b;
  }
  .input-range__label-container {
    color: black;
  }
`;

const Index = ({ min, max, onChangeCallback }) => {
  const [value, setValue] = useState({ min, max });

  useEffect(() => {
    setValue({ min, max });
  }, [min, max]);

  const updateValue = (val) => {
    console.log(val);
  };

  return (
    <StyledForm>
      <InputRange
        maxValue={5000}
        minValue={0}
        formatLabel={(labelValue) => `$ ${labelValue}`}
        value={value}
        onChange={(currentValue) => updateValue(currentValue)}
        onChangeComplete={(val) => onChangeCallback(val)}
      />
    </StyledForm>
  );
};

export default Index;
