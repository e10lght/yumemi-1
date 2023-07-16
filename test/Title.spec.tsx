import { render, screen } from "@testing-library/react";
import React from "react";
import { Title } from "../src/components/Title";
import "jest-environment-jsdom";

describe("Title component", () => {
  it("should render correctly", () => {
    render(<Title />);

    // h1要素が存在することを確認
    expect(screen.getByText("ゆめみ課題")).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
  });
});
