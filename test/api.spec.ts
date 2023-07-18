import axios from "axios";
import { getPrefectures, getDemographicsData } from "../src/api/api";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("api", () => {
  beforeEach(() => {
    mockedAxios.get.mockClear();
  });

  it("都道府県データの取得", async () => {
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
        ],
        message: null
      },
      status: 200
    });

    const prefectures = await getPrefectures();

    const result = [
      { prefCode: 1, prefName: "北海道" },
      { prefCode: 2, prefName: "青森県" }
    ];
    for (let i = 0; i < prefectures.length; i++) {
      expect(prefectures[i].prefName).toEqual(result[i].prefName);
      expect(prefectures[i].prefCode).toEqual(result[i].prefCode);
    }
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://opendata.resas-portal.go.jp/api/v1/prefectures/",
      { headers: { "X-API-KEY": process.env.REACT_APP_API_KEY } }
    );
  });

  it("人口推移データの取得", async () => {
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

    expect(demographicsData).toEqual({
      boundaryYear: 2020,
      data: [
        {
          label: "総人口",
          data: [
            { year: 1960, value: 5039206 },
            { year: 1965, value: 5171800 }
          ]
        }
      ]
    });

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=1",
      { headers: { "X-API-KEY": process.env.REACT_APP_API_KEY } }
    );
  });

  it("人口推移データの取得の際、エラーの場合", async () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation();
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        message: "404. That's an error.",
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
      },
      status: 200
    });

    const demographicsData = await getDemographicsData(99);
    console.log(demographicsData);

    expect(errorSpy).toHaveBeenCalledWith("404. That's an error.");
    expect(demographicsData).toEqual({ boundaryYear: 0, data: [] });
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=99`,
      { headers: { "X-API-KEY": process.env.REACT_APP_API_KEY } }
    );
  });

  it("都道府県をフェッチした際、エラーの場合", async () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation();
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
        ],
        message: "404. That's an error."
      },
      status: 200
    });

    const prefectures = await getPrefectures();

    expect(errorSpy).toHaveBeenCalledWith("404. That's an error.");
    expect(prefectures).toEqual([]);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://opendata.resas-portal.go.jp/api/v1/prefectures/",
      { headers: { "X-API-KEY": process.env.REACT_APP_API_KEY } }
    );
  });
});
