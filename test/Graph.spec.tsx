import React from "react";
import { render, screen } from "@testing-library/react";
import { Graph } from "../src/components/Graph";
import "@testing-library/jest-dom";

jest.mock("highcharts-react-official", () => {
  return {
    HighchartsReact: jest.fn().mockImplementation(({ options }) => {
      return (
        <div data-testid="highcharts-mock" data-options={JSON.stringify(options)}>
          Highcharts
        </div>
      );
    })
  };
});

describe("Graphコンポーネント", () => {
  const mockData = {
    yearList: [2015, 2016, 2017],
    categories: ["総人口", "生産年齢人口", "年少人口", "老年人口"],
    selectedCategoryIndex: 0,
    prefectures: [
      { prefCode: "1", prefName: "北海道" },
      { prefCode: "2", prefName: "青森" }
    ],
    targets: [
      {
        prefCode: 1,
        demographicsData: [
          {
            label: "総人口",
            data: [
              { year: 2015, value: 5000 },
              { year: 2016, value: 5500 },
              { year: 2017, value: 6000 }
            ]
          }
        ]
      },
      {
        prefCode: 2,
        demographicsData: [
          {
            label: "総人口",
            data: [
              { year: 2015, value: 5000 },
              { year: 2016, value: 5500 },
              { year: 2017, value: 6000 }
            ]
          }
        ]
      }
    ]
  };

  it("プロップスとして渡した値がコンポーネントで正しく表示されていること", () => {
    render(
      <Graph
        yearList={mockData.yearList}
        categories={mockData.categories}
        selectedCategoryIndex={mockData.selectedCategoryIndex}
        targets={mockData.targets}
        prefectures={mockData.prefectures}
      />
    );

    expect(screen.getByText("Highcharts")).toBeInTheDocument();
  });

  it("渡したプロップスの値が正しく整形されていること", () => {
    render(
      <Graph
        yearList={mockData.yearList}
        categories={mockData.categories}
        selectedCategoryIndex={mockData.selectedCategoryIndex}
        targets={mockData.targets}
        prefectures={mockData.prefectures}
      />
    );

    const divElement = screen.getByTestId("highcharts-mock");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const options = JSON.parse(divElement.getAttribute("data-options")!);
    expect(options.title.text).toBe("都道府県別の総人口推移グラフ");
    expect(options.xAxis.categories).toEqual([2015, 2016, 2017]);
    expect(options.series[0].data[0]).toEqual([2015, 5000]);
    expect(options.yAxis.title.text).toBe("総人口");
    expect(options.series[0].name).toBe("北海道");
  });
});
