import React from "react";
import { render, screen } from "@testing-library/react";
import { Graph } from "../src/components/Graph";
import "@testing-library/jest-dom";

jest.mock("highcharts-react-official", () => ({
  HighchartsReact: () => <div>Highcharts</div>
}));

describe("Graph component", () => {
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

  it("should render correctly", () => {
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
});
