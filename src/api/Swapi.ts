import appConfig from "config/app.config";
import axios, { AxiosRequestConfig } from "axios";
import { People } from "./types/People";

export const swapi = (() => {
  const swapiInstance = axios.create({ baseURL: appConfig.apiUrl });

  return {
    /**
     * @param param  id or filter
     */
    getPeople: async (
      param?: number | object | undefined,
      config?: AxiosRequestConfig
    ) => {
      const baseUrl = "/people";
      const paramUrl =
        typeof param === "number"
          ? `/${param}`
          : typeof param === "object"
          ? `/${JSON.stringify(param)}`
          : "";
      const url = baseUrl + paramUrl;
      return swapiInstance.get<People>(url, config);
    },
  };
})();
