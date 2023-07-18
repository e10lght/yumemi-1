import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { PrefectureCheckboxes } from "../src/components/PrefectureCheckboxes";
import "@testing-library/jest-dom";

describe("PrefectureCheckboxesコンポーネント", () => {
  const mockOnChange = jest.fn();
  const prefectures = [
    { prefCode: "1", prefName: "北海道" },
    { prefCode: "2", prefName: "青森県" }
  ];

  it("プロップスとして渡した値がコンポーネントで正しく表示されていること", () => {
    const { getByText } = render(
      <PrefectureCheckboxes prefectures={prefectures} onChange={mockOnChange} />
    );

    prefectures.forEach((prefecture) => {
      expect(getByText(prefecture.prefName)).toBeInTheDocument();
    });
  });

  it("チェックボックスをクリックすると、onChangeがトリガーされること", () => {
    const { getByLabelText } = render(
      <PrefectureCheckboxes prefectures={prefectures} onChange={mockOnChange} />
    );

    fireEvent.click(getByLabelText("北海道"));
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "1" })
      })
    );
  });
});
