import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import Input, { IProps } from "./Input";
import { Button } from "../Controls/";

interface IInputWIthButtonProps extends IProps {
  handleButtonClick: () => void;
  buttonLabel: string;
  onBlur: React.ChangeEventHandler;
}

const customInputStyle = css`
  padding: 0.5rem 2.25rem 0.5rem 1rem;
`;

const customButtonStyle = css`
  position: absolute;
  height: 1.25rem;
  width: 2rem;
  top: 32;
  right: 48;
`;

const Wrapper = styled.div`
  position: relative;
`;

const InputWithButton: React.FunctionComponent<IInputWIthButtonProps> = ({
  forwardRef,
  buttonLabel,
  handleButtonClick,
  label,
  max,
  min,
  name,
  onChange,
  onBlur,
  placeholder,
  required,
  step,
  type,
  value
}) => {
  return (
    <Wrapper>
      <Input
        data-test="input-with-button-input"
        customStyle={customInputStyle}
        forwardRef={forwardRef}
        label={label}
        max={max}
        min={min}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        step={step}
        type={type}
        value={value}
      />
      <Button
        data-test="input-with-button-button"
        label={buttonLabel}
        small
        customStyle={customButtonStyle}
        onClick={handleButtonClick}
      />
    </Wrapper>
  );
};

export default InputWithButton;
