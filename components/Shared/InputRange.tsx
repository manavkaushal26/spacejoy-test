import React, { useEffect, useState } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import styled from 'styled-components';

const StyledForm = styled.form`
  margin-top: 1rem;
  padding-top: 1rem;
  max-width: 90%;
  padding-left: 8px;
  .input-range__track--active {
    background: black !important;
    border-color: #000000 !important;
  }
  .input-range__slider {
    background: white !important;
    /* border-color: #000000 !important; */
    border: 2px solid black;
  }
  .input-range__label-container {
    color: black !important;
  }
  .input-range__label.input-range__label--max,
  .input-range__label.input-range__label--min {
    display: none;
  }
`;

const Index = ({ min, max, onChangeCallback }) => {
  const [value, setValue] = useState({ min, max });

  useEffect(() => {
    setValue({ min, max });
  }, [min, max]);

  const updateValue = (val) => {
    setValue({ ...val });
  };

  return (
    <StyledForm>
      <InputRange
        maxValue={5000}
        minValue={0}
        formatLabel={(labelValue) => {
          // console.log('label value', labelValue);

          return `$ ${labelValue}`;
        }}
        value={value}
        onChange={(currentValue) => updateValue(currentValue)}
        onChangeComplete={(val) => onChangeCallback(val)}
      />
    </StyledForm>
  );
};

export default Index;
