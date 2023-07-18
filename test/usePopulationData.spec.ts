import { renderHook, waitFor } from "@testing-library/react";
import { usePopulationData } from "../src/hooks/usePopulationData";
import { getPrefectures, getDemographicsData } from "../src/api/api";

jest.mock("../src/api/api", () => ({
  getPrefectures: jest.fn(),
  getDemographicsData: jest.fn()
}));

describe("usePopulationDataフック", () => {
  it("初回レンダリング時に都道府県と人口統計データを取得できること", async () => {
    (getPrefectures as jest.Mock).mockResolvedValueOnce([{ prefCode: 1, prefName: "Tokyo" }]);
    (getDemographicsData as jest.Mock).mockResolvedValueOnce({
      boundaryYear: 2020,
      data: [
        {
          label: "総人口",
          data: [
            {
              year: 1960,
              value: 5039206
            },
            {
              year: 1965,
              value: 5171800
            }
          ]
        }
      ]
    });

    const { result } = renderHook(() => usePopulationData());
    await waitFor(() => {
      expect(result.current.prefectures).toEqual([{ prefCode: 1, prefName: "Tokyo" }]);
      expect(result.current.yearList).toEqual([1960, 1965]);
      expect(result.current.categories).toEqual(["総人口"]);
      expect(result.current.targets).toEqual([]);
      expect(result.current.selectedCategoryIndex).toBe(0);
    });
  });

  it("onChangeDemographicsが呼び出されたときに、都道府県の人口統計データが追加または削除されること", async () => {
    (getPrefectures as jest.Mock).mockResolvedValueOnce([
      { prefCode: 1, prefName: "Tokyo" },
      { prefCode: 2, prefName: "Kanagawa" }
    ]);

    (getDemographicsData as jest.Mock)
      .mockResolvedValueOnce({
        boundaryYear: 2020,
        data: [
          {
            label: "総人口",
            data: [
              {
                year: 1960,
                value: 5039206
              },
              {
                year: 1965,
                value: 5171800
              }
            ]
          }
        ]
      })
      .mockResolvedValueOnce({
        boundaryYear: 2020,
        data: [
          {
            label: "年少人口",
            data: [
              {
                year: 1960,
                value: 8675660
              },
              {
                year: 1965,
                value: 9543100
              }
            ]
          }
        ]
      });

    const { result } = renderHook(() => usePopulationData());
    await waitFor(() => {
      expect(result.current.prefectures).toEqual([
        { prefCode: 1, prefName: "Tokyo" },
        { prefCode: 2, prefName: "Kanagawa" }
      ]);
    });

    await waitFor(() => {
      result.current.onChangeDemographics({
        target: { value: "1" }
      } as React.ChangeEvent<HTMLInputElement>);

      expect(result.current.targets).toEqual([
        {
          demographicsData: [
            {
              label: "年少人口",
              data: [
                { year: 1960, value: 8675660 },
                {
                  value: 9543100,
                  year: 1965
                }
              ]
            }
          ],
          prefCode: 1
        }
      ]);
    });

    await waitFor(() => {
      result.current.onChangeDemographics({
        target: { value: "1" }
      } as React.ChangeEvent<HTMLInputElement>);
      expect(result.current.targets).toEqual([]);
    });
  });

  it("onChangeCategoryが呼び出されたときに、選択されたカテゴリのインデックスが変更されること", async () => {
    (getPrefectures as jest.Mock).mockResolvedValueOnce([{ prefCode: 1, prefName: "Tokyo" }]);
    (getDemographicsData as jest.Mock).mockResolvedValueOnce({
      boundaryYear: 2020,
      data: [
        {
          label: "総人口",
          data: [
            {
              year: 1960,
              value: 5039206
            },
            {
              year: 1965,
              value: 5171800
            }
          ]
        }
      ]
    });

    const { result } = renderHook(() => usePopulationData());

    await waitFor(() => {
      expect(result.current.selectedCategoryIndex).toEqual(0);
    });

    await waitFor(() => {
      result.current.onChangeCategory({
        target: { value: "1" }
      } as React.ChangeEvent<HTMLInputElement>);
      expect(result.current.selectedCategoryIndex).toEqual(1);
    });
  });

  it("onChangeDemographicsの処理内部でエラーがあった場合捕捉されること", async () => {
    (getPrefectures as jest.Mock).mockResolvedValueOnce([{ prefCode: 1, prefName: "Tokyo" }]);
    (getDemographicsData as jest.Mock).mockResolvedValueOnce({
      boundaryYear: 2020,
      data: [
        {
          label: "総人口",
          data: [
            {
              year: 1960,
              value: 5039206
            },
            {
              year: 1965,
              value: 5171800
            }
          ]
        }
      ]
    });

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, "error").mockImplementation(() => {});

    (getDemographicsData as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => usePopulationData());

    await waitFor(() => expect(result.current.prefectures).toEqual([]));

    await waitFor(() => {
      result.current.onChangeDemographics({
        target: { value: "1" }
      } as React.ChangeEvent<HTMLInputElement>);

      expect(console.error).toHaveBeenCalledWith("Network error");
    });
  });
});
