import React, { memo } from "react";
import "./styles/prefectureCheckboxes.css";
import { Prefecture } from "../types/types";

type typePrefectures = {
  prefectures: Prefecture[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  isDrawing: boolean;
};

export const PrefectureCheckboxes: React.FC<typePrefectures> = memo(
  ({ prefectures, onChange, isDrawing }) => {
    return (
      <>
        <h2>都道府県</h2>
        <div className="prefectureCheckboxes">
          {prefectures &&
            prefectures.map((prefecture) => {
              const id = `prefcode-${prefecture.prefCode}`;
              return (
                <label htmlFor={id} key={prefecture.prefCode}>
                  {prefecture.prefName}
                  <input
                    id={id}
                    type="checkbox"
                    value={prefecture.prefCode}
                    onChange={onChange}
                    disabled={isDrawing}
                  />
                </label>
              );
            })}
        </div>
      </>
    );
  }
);
