import { render, screen } from "@testing-library/react";
import React from "react";
import { Title } from "../src/components/Title";
import "jest-environment-jsdom";

describe("Titleコンポーネント", () => {
  it("h1要素が指定した文字列で存在すること", () => {
    render(<Title />);

    expect(screen.getByText("ゆめみ課題")).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
  });
});
