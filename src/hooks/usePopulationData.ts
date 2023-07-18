import { useCallback, useEffect, useState } from "react";
import { Prefecture, GraphDemographicsData } from "../types/types";
import { getDemographicsData, getPrefectures } from "../api/api";

export const usePopulationData = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [targets, setTargets] = useState<GraphDemographicsData[]>([]);
  const [selectedCategoryIndex, SetselectedCategoryIndex] = useState(0);
  const [yearList, setYearList] = useState<number[]>([]);

  useEffect(() => {
    // 初期描画用のデータ取得のため、引数prefCodeは1とする
    Promise.all([getPrefectures(), getDemographicsData(1)])
      .then(([prefectures, demographicsData]) => {
        setPrefectures(prefectures);
        const labelList = [];
        if (!demographicsData || !demographicsData.data) return;
        for (const data of demographicsData.data) {
          labelList.push(data.label);
        }
        setCategories(labelList);
        const yearCategories = [];
        // 年度は全配列で固定の値かつ要素数のため最初の要素を指定する
        if (!demographicsData || !demographicsData.data[0] || !demographicsData.data[0].data)
          return;
        for (const y of demographicsData.data[0].data) {
          yearCategories.push(y.year);
        }
        setYearList(yearCategories);
      })
      .catch((err) => console.log(err));
  }, []);

  const onChangeDemographics = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const prefCode = Number(e.target.value);
      const demographicsData = await getDemographicsData(prefCode);

      const newTargets = {
        demographicsData: demographicsData.data,
        prefCode: prefCode
      } as GraphDemographicsData;
      setTargets((prevTargets) => {
        if (prevTargets.find((target) => prefCode === target.prefCode)) {
          console.log(prevTargets.filter((demographics) => demographics.prefCode !== prefCode));
          return prevTargets.filter((demographics) => demographics.prefCode !== prefCode);
        } else {
          return [...prevTargets, newTargets];
        }
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }, []);

  const onChangeCategory = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const categoryIndex = Number(e.target.value);
    SetselectedCategoryIndex(categoryIndex);
  }, []);

  return {
    prefectures,
    categories,
    targets,
    selectedCategoryIndex,
    yearList,
    onChangeDemographics,
    onChangeCategory
  };
};
