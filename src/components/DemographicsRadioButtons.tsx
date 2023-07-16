import React, { memo } from "react";
import "./styles/demographicsRadioButtons.css";

type typeDemographicsRadioButtons = {
  categories: string[];
  selectedCategoryIndex: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const DemographicsRadioButtons: React.FC<typeDemographicsRadioButtons> = memo(
  ({ categories, selectedCategoryIndex, onChange }) => {
    return (
      <>
        <h2>人口分類</h2>
        <div className="demographicsRadioButtons">
          {categories &&
            categories.map((item, index) => {
              const id = `demographics-category-${index}`;
              return (
                <label htmlFor={id} key={id}>
                  {item}
                  <input
                    type="radio"
                    value={index}
                    name={item}
                    id={id}
                    checked={selectedCategoryIndex === index}
                    onChange={onChange}
                  />
                </label>
              );
            })}
        </div>
      </>
    );
  }
);
