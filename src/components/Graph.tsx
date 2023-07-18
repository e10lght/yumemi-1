import { HighchartsReact } from "highcharts-react-official";
import Highcharts from "highcharts";
import React, { memo } from "react";
import { GraphDemographicsData, Prefecture } from "../types/types";

export type typeGraph = {
  yearList: number[];
  categories: string[];
  selectedCategoryIndex: number;
  targets: GraphDemographicsData[];
  prefectures: Prefecture[];
};

export const Graph: React.FC<typeGraph> = memo(
  ({ yearList, categories, selectedCategoryIndex, targets, prefectures }) => {
    const options = {
      title: {
        text: "都道府県別の総人口推移グラフ"
      },
      xAxis: {
        title: {
          text: "年度"
        },
        categories: yearList
      },
      yAxis: {
        title: {
          text: categories && categories[selectedCategoryIndex]
        }
      },
      series:
        targets &&
        targets.map((target) => ({
          data: target.demographicsData[selectedCategoryIndex].data.map((item) => [
            item.year,
            item.value
          ]),
          name: prefectures[target.prefCode - 1].prefName
        }))
    };
    return <HighchartsReact highcharts={Highcharts} options={options} />;
  }
);
