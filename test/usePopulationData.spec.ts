import { renderHook } from "@testing-library/react";
import { usePopulationData } from "../src/hooks/usePopulationData";

describe("useHoge Custom Hooks Test", () => {
  it("Custom Hooks の返り値は hoge になること", () => {
    const { result } = renderHook(() => usePopulationData());
    console.log(result.current.categories);
    console.log(result.current.prefectures);
    expect(result.current.prefectures).toEqual([]);
  });
});
