import { act, renderHook, waitFor } from "@testing-library/react";
import { usePopulationData } from "../src/hooks/usePopulationData";
import { getPrefectures, getDemographicsData } from "../src/api/api";

jest.mock("../src/api/api", () => ({
  getPrefectures: jest.fn(),
  getDemographicsData: jest.fn()
}));

describe("usePopulationData", () => {
  it("Custom Hooks の返り値は hoge になること", () => {
    const { result } = renderHook(() => usePopulationData());
    expect(result.current.prefectures).toEqual([]);
  });

  it("fetches prefectures and demographic data on initial render", async () => {
    (getPrefectures as jest.Mock).mockResolvedValueOnce([{ prefCode: 1, prefName: "Tokyo" }]);
    (getDemographicsData as jest.Mock).mockResolvedValueOnce([
      { label: "Total Population", data: [{ year: 2023, value: 10000 }] }
    ]);

    const { result } = renderHook(() => usePopulationData());
    await waitFor(() => {
      expect(result.current.prefectures).toEqual([{ prefCode: 1, prefName: "Tokyo" }]);
      expect(result.current.categories).toEqual([]);
      expect(result.current.yearList).toEqual([]);
    });
  });

  it("adds or removes the demographics data of a prefecture when onChangeDemographics is called", async () => {
    (getPrefectures as jest.Mock).mockResolvedValueOnce([
      { prefCode: 1, prefName: "Tokyo" },
      { prefCode: 2, prefName: "Kanagawa" }
    ]);

    (getDemographicsData as jest.Mock)
      .mockResolvedValueOnce({
        data: [{ label: "Total Population", data: [{ year: 2023, value: 10000 }] }]
      })
      .mockResolvedValueOnce({
        data: [{ label: "Total Population", data: [{ year: 2023, value: 10000 }] }]
      });

    const { result } = renderHook(() => usePopulationData());
    await waitFor(() => {
      expect(result.current.prefectures).toEqual([
        { prefCode: 1, prefName: "Tokyo" },
        { prefCode: 2, prefName: "Kanagawa" }
      ]);
    });

    // Add the demographics data of Tokyo
    act(() => {
      result.current.onChangeDemographics({ target: { value: "1" } } as any);
    });
    await waitFor(() => {
      expect(result.current.targets).toEqual([
        {
          demographicsData: [{ label: "Total Population", data: [{ year: 2023, value: 10000 }] }],
          prefCode: 1
        }
      ]);
    });

    // Remove the demographics data of Tokyo
    act(() => {
      result.current.onChangeDemographics({ target: { value: "1" } } as any);
    });
    await waitFor(() => {
      expect(result.current.targets).toEqual([]);
    });
  });

  it("changes the selected category index when onChangeCategory is called", async () => {
    (getPrefectures as jest.Mock).mockResolvedValueOnce([{ prefCode: 1, prefName: "Tokyo" }]);
    (getDemographicsData as jest.Mock).mockResolvedValueOnce([
      { label: "Total Population", data: [{ year: 2023, value: 10000 }] }
    ]);

    const { result } = renderHook(() => usePopulationData());
    await waitFor(() => {
      expect(result.current.selectedCategoryIndex).toEqual(0);
    });

    // Change the selected category index
    act(() => {
      result.current.onChangeCategory({ target: { value: "1" } } as any);
    });
    expect(result.current.selectedCategoryIndex).toEqual(1);
  });

  it("handles errors in onChangeDemographics", async () => {
    (getPrefectures as jest.Mock).mockResolvedValueOnce([{ prefCode: 1, prefName: "Tokyo" }]);
    (getDemographicsData as jest.Mock).mockResolvedValueOnce([
      { label: "Total Population", data: [{ year: 2023, value: 10000 }] }
    ]);

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, "error").mockImplementation(() => {});

    (getDemographicsData as jest.Mock).mockRejectedValueOnce(new Error("Async error"));

    const { result } = renderHook(() => usePopulationData());

    // 状態の初期化を待つ
    await waitFor(() => expect(result.current.prefectures).toEqual([]));

    // エラーを引き起こすための操作を模倣
    await act(async () => {
      await result.current.onChangeDemographics({
        target: { value: "1" }
      } as React.ChangeEvent<HTMLInputElement>);
    });

    // console.errorが呼び出されたことを確認する
    expect(console.error).toHaveBeenCalledWith("Async error");
  });
});
