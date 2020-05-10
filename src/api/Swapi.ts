import appConfig from "config/app.config";
import axios, { AxiosRequestConfig } from "axios";
import { People, Person } from "./types/People";

export const swapi = (() => {
  const swapiInstance = axios.create({ baseURL: appConfig.apiUrl });

  return {
    /**
     * @param param  id and (or) filter
     */
    getPeople: async <T = number | undefined>(
      id?: T,
      query?: string,
      config?: AxiosRequestConfig
    ) => {
      const baseUrl = "/people";
      const paramUrl = typeof id !== "undefined" ? `/${id}` : "";
      const queryUrl = query || "";
      const url = baseUrl + paramUrl + queryUrl;
      return swapiInstance.get<T extends number ? Person : People>(url, config);
    },
  };
})();
