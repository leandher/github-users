import api from '../../services/api';

export const axiosGet = (data: any | any[]) => {
  jest.spyOn(api, 'get').mockImplementation(() => Promise.resolve(data));
};

export const axiosGetWithFunction = (fn: (params: any) => Promise<any>) => {
  jest.spyOn(api, 'get').mockImplementation(fn);
};
