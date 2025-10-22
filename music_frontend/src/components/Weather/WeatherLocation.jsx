/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import useCityListQuery from "../../queries/Weather/useCityListQuery";
import useDistrictListQuery from "../../queries/Weather/useDistrictListQuery";
import CustomSelect from "../Custom/CustomSelect";

export default function WeatherLocation({
  selectedCity,
  selectedDistrict,
  onSelectCity,
  onSelectDistrict,
  onApply,
}) {
  const { data: cityList = [] } = useCityListQuery();
  const { data: districtList = [] } = useDistrictListQuery(selectedCity);

  return (
    <div css={locationSelect}>
      <CustomSelect
        options={cityList}
        value={selectedCity}
        onChange={onSelectCity}
        placeholder="도시 선택"
      />
      <CustomSelect
        options={districtList}
        value={selectedDistrict}
        onChange={onSelectDistrict}
        placeholder="구 선택"
        disabled={!selectedCity || districtList.length === 0}
      />
      <button css={applyButton} onClick={() => onApply(selectedCity, selectedDistrict)}>
        적용
      </button>
    </div>
  );
}

/* ---------------- Styles ---------------- */
const locationSelect = css`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
`;

const applyButton = css`
  font-family: inherit;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  padding: 8px;
  height: 38px;
  background: none;
  color: #333;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background-color: #f0f0f0;
  }
`;
