import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { PrefectureCheckboxes } from "../src/components/PrefectureCheckboxes";
import "@testing-library/jest-dom";

describe("PrefectureCheckboxes component", () => {
  const mockOnChange = jest.fn();
  const prefectures = [
    { prefCode: "1", prefName: "北海道" },
    { prefCode: "2", prefName: "青森県" }
  ];

  it("should render correctly", () => {
    const { getByText } = render(
      <PrefectureCheckboxes prefectures={prefectures} onChange={mockOnChange} />
    );

    // プロップスとして渡した都道府県名が表示されていることを確認
    prefectures.forEach((prefecture) => {
      expect(getByText(prefecture.prefName)).toBeInTheDocument();
    });
  });

  it("should trigger onChange when a checkbox is clicked", () => {
    const { getByLabelText } = render(
      <PrefectureCheckboxes prefectures={prefectures} onChange={mockOnChange} />
    );

    // チェックボックスをクリックして、onChangeがトリガーされることを確認
    fireEvent.click(getByLabelText("北海道"));
    expect(mockOnChange).toHaveBeenCalled();
  });
});
