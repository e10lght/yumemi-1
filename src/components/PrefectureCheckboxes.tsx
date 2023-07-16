import React, { memo } from "react";
import "./styles/prefectureCheckboxes.css";
import { Prefecture } from "../types/types";

type typePrefectures = {
  prefectures: Prefecture[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
};

export const PrefectureCheckboxes: React.FC<typePrefectures> = memo(({ prefectures, onChange }) => {
  return (
    <>
      <h2>都道府県</h2>
      <div className="prefectureCheckboxes">
        {prefectures &&
          prefectures.map((prefecture) => (
            <label htmlFor={prefecture.prefCode} key={prefecture.prefCode}>
              {prefecture.prefName}
              <input
                id={prefecture.prefCode}
                type="checkbox"
                value={prefecture.prefCode}
                onChange={onChange}
              />
            </label>
          ))}
      </div>
    </>
  );
});
