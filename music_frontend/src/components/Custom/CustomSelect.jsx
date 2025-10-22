/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";

export default function CustomSelect({ options, value, onChange, placeholder, disabled = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const displayValue = value || placeholder;

  return (
    <div css={customSelect} ref={selectRef}>
      <button
        type="button"
        css={[selectTrigger, isOpen && selectTriggerOpen, disabled && selectTriggerDisabled]}
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
      >
        {displayValue}
      </button>

      {isOpen && (
        <div css={optionsList}>
          {placeholder && (
            <div css={[optionItem, !value && optionSelected]} onClick={() => handleOptionClick("")}>
              {placeholder}
            </div>
          )}
          {options.map((option, idx) => (
            <div key={idx} css={[optionItem, value === option && optionSelected]} onClick={() => handleOptionClick(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- 🎨 Styles ---------------- */

const customSelect = css`
  position: relative;
  font-family: inherit;
  font-size: 14px;
`;

const selectTrigger = css`
  font-family: inherit;
  font-size: 14px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 8px 36px 8px 12px;
  background-color: #ffffff;
  height: 38px;
  box-sizing: border-box;
  transition: all 0.2s ease;
  cursor: pointer;
  width: 150px;
  text-align: left;
  display: flex;
  align-items: center;
  background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="%235f6368"><path d="M7 10l5 5 5-5H7z"/><path d="M0 0h24v24H0V0z" fill="none"/></svg>');
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 20px;

  &:hover {
    border-color: #b0b0b0;
  }
`;

const selectTriggerOpen = css`
  border-color: #888;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
`;

const selectTriggerDisabled = css`
  background-color: #f5f5f5;
  color: #999;
  cursor: not-allowed;
  border-color: #e0e0e0;
`;

const optionsList = css`
  position: absolute;
  top: 42px;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  z-index: 100;
  max-height: 240px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #ccc #f5f5f5;
`;

const optionItem = css`
  padding: 10px 14px;
  cursor: pointer;
  transition: background-color 0.15s ease;
  font-size: 14px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const optionSelected = css`
  background-color: #f0f3ff;
  font-weight: 500;
  color: #333;
`;
