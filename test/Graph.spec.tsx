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

  it("should render correctly when targets is empty", () => {
    render(
      <Graph
        yearList={mockData.yearList}
        categories={mockData.categories}
        selectedCategoryIndex={mockData.selectedCategoryIndex}
        targets={[]} // targets is empty
        prefectures={mockData.prefectures}
      />
    );
    // Add assertions here
  });

  it("should render correctly when categories is empty", () => {
    render(
      <Graph
        yearList={mockData.yearList}
        categories={[]} // categories is empty
        selectedCategoryIndex={mockData.selectedCategoryIndex}
        targets={mockData.targets}
        prefectures={mockData.prefectures}
      />
    );
    // Add assertions here
  });

  it("should render correctly when targets is empty", () => {
    render(
      <Graph
        yearList={mockData.yearList}
        categories={mockData.categories}
        selectedCategoryIndex={mockData.selectedCategoryIndex}
        targets={[]} // targets is empty
        prefectures={mockData.prefectures}
      />
    );
    // ここで期待する結果に対するアサーションを行います。例えば：
    // expect(screen.queryByText(/北海道/)).toBeNull(); // "北海道"というテキストが存在しないことをチェック
  });
});

/*
describe("Graph component", () => {
  it("should map targets to series data correctly", () => {
    const props: typeGraph = {
      yearList: [2023],
      categories: ["Total Population"],
      selectedCategoryIndex: 0,
      targets: [
        {
          demographicsData: [
            {
              label: "Total Population",
              data: [{ year: 2023, value: 10000 }]
            }
          ],
          prefCode: 1
        }
      ],
      prefectures: [{ prefCode: "1", prefName: "Tokyo" }]
    };

    const { container } = render(<Graph {...props} />);

    // Replace the following with your assertion
    // For example, you could verify that the expected series data is present
    // in the Highcharts options, but the specific assertion will depend on your implementation.
    expect(container).toMatchSnapshot();
  });
});
*/
