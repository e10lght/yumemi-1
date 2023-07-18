import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DemographicsRadioButtons } from "../src/components/DemographicsRadioButtons";

describe("DemographicsRadioButtonsコンポーネント", () => {
  const mockOnChange = jest.fn();
  const categories = ["総人口", "年少人口", "生産年齢人口", "老年人口"];
  const selectedCategoryIndex = 0;

  it("プロップスとして渡した値がコンポーネントで正しく表示されていること", () => {
    const { getByText } = render(
      <DemographicsRadioButtons
        categories={categories}
        selectedCategoryIndex={selectedCategoryIndex}
        onChange={mockOnChange}
      />
    );

    categories.forEach((category) => {
      expect(getByText(category)).toBeInTheDocument();
    });

    expect(getByText(categories[selectedCategoryIndex]).querySelector("input")?.checked).toBe(true);
  });

  it("ラジオボタンをクリックして、onChangeがトリガーされること", () => {
    const { getByLabelText } = render(
      <DemographicsRadioButtons
        categories={categories}
        selectedCategoryIndex={selectedCategoryIndex}
        onChange={mockOnChange}
      />
    );

    fireEvent.click(getByLabelText("老年人口"));
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "3" })
      })
    );
  });
});
