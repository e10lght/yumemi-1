import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DemographicsRadioButtons } from "../src/components/DemographicsRadioButtons";

describe("DemographicsRadioButtons component", () => {
  const mockOnChange = jest.fn();
  const categories = ["総人口", "年少人口", "生産年齢人口", "老年人口"];
  const selectedCategoryIndex = 1;

  it("should render correctly", () => {
    const { getByText } = render(
      <DemographicsRadioButtons
        categories={categories}
        selectedCategoryIndex={selectedCategoryIndex}
        onChange={mockOnChange}
      />
    );

    // プロップスとして渡した人口分類が表示されていることを確認
    categories.forEach((category) => {
      expect(getByText(category)).toBeInTheDocument();
    });

    // 選択されている人口分類が正しく表示されていることを確認
    expect(getByText(categories[selectedCategoryIndex]).querySelector("input")?.checked).toBe(true);
  });

  it("should trigger onChange when a radio button is clicked", () => {
    const { getByLabelText } = render(
      <DemographicsRadioButtons
        categories={categories}
        selectedCategoryIndex={selectedCategoryIndex}
        onChange={mockOnChange}
      />
    );

    // ラジオボタンをクリックして、onChangeがトリガーされることを確認
    fireEvent.click(getByLabelText("30-39歳"));
    expect(mockOnChange).toHaveBeenCalled();
  });
});
