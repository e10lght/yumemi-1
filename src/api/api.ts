import axios from "axios";
import {
  DemographicsDataList,
  Prefecture,
  ResponseDemographicsDataList,
  ResponsePrefectures
} from "../types/types";

export const getPrefectures = async (): Promise<Prefecture[]> => {
  try {
    const result = await axios.get<ResponsePrefectures>(
      "https://opendata.resas-portal.go.jp/api/v1/prefectures/",
      { headers: { "X-API-KEY": process.env.REACT_APP_API_KEY } }
    );
    if (result.data.message !== null) {
      throw new Error(result.data.message);
    }
    const prefectures = result.data.result;
    return prefectures;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      console.error(error.message);
    }
    return [];
  }
};

export const getDemographicsData = async (prefCode: number): Promise<DemographicsDataList> => {
  try {
    const result = await axios.get<ResponseDemographicsDataList>(
      `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
      { headers: { "X-API-KEY": process.env.REACT_APP_API_KEY } }
    );
    if (result.data.message !== null) {
      throw new Error(result.data.message);
    }
    const demographicsDataList = result.data.result;
    return demographicsDataList;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return { boundaryYear: 0, data: [] };
  }
};
