import axios from "axios";
import { getPrefectures, getDemographicsData } from "../src/api/api";

// axiosをモック化
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("api", () => {
  it("都道府県データの取得", async () => {
    // モックの結果を設定
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        result: [
          {
            prefCode: 1,
            prefName: "北海道"
          },
          {
            prefCode: 2,
            prefName: "青森県"
          }
        ]
      }
    });

    const prefectures = await getPrefectures();

    // 結果の確認
    expect(prefectures[0].prefName).toEqual("北海道");
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://opendata.resas-portal.go.jp/api/v1/prefectures/",
      { headers: { "X-API-KEY": process.env.REACT_APP_API_KEY } }
    );
  });

  it("人口推移データの取得", async () => {
    // モックの結果を設定
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        message: null,
        result: {
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
        }
      }
    });

    const demographicsData = await getDemographicsData(1);
    console.log(demographicsData);

    // 結果の確認
    expect(demographicsData.boundaryYear).toEqual(2020);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=1",
      { headers: { "X-API-KEY": process.env.REACT_APP_API_KEY } }
    );
  });

  it("人口推移データの取得の際、エラーの場合", async () => {
    // モックの結果を設定
    mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));

    const demographicsData = await getDemographicsData(1);
    console.log(demographicsData);

    // 結果の確認
    expect(demographicsData).toEqual({ boundaryYear: 0, data: [] });
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://opendata.resas-portal.go.jp/api/v1/prefectures/",
      { headers: { "X-API-KEY": process.env.REACT_APP_API_KEY } }
    );
  });

  it("都道府県をフェッチした際、エラーの場合", async () => {
    // モックの結果を設定
    mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));

    const prefectures = await getPrefectures();
    console.log(prefectures);

    // 結果の確認
    expect(prefectures).toEqual([]);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://opendata.resas-portal.go.jp/api/v1/prefectures/",
      { headers: { "X-API-KEY": process.env.REACT_APP_API_KEY } }
    );
  });
});
