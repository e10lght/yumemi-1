export type GraphDemographicsData = {
  demographicsData: DemographicsDetail[];
  prefCode: number;
};

export type DemographicsDetail = {
  label: string;
  data: {
    value: number;
    year: number;
  }[];
};

export type Prefecture = {
  prefCode: string;
  prefName: string;
};

export type ResponsePrefectures = {
  message: null | string;
  result: Prefecture[];
};

export type DemographicsDataList = {
  boundaryYear: number;
  data: DemographicsDetail[];
};

export type ResponseDemographicsDataList = {
  message: null | string;
  result: DemographicsDataList;
};
