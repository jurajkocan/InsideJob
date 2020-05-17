import appConfig from "config/app.config";
import axios, { AxiosRequestConfig } from "axios";
import { People, Person } from "./types/People";
import { store } from "src/frontend/redux/Store";
import { wookieeLanguage } from "src/types/Common";
import Box from "src/utils/Box";
import { remapJson } from "src/utils/JsonMapper";

export const swapi = (() => {
  const swapiInstance = axios.create({ baseURL: appConfig.apiUrl });
  swapiInstance.interceptors.request.use((config) => {
    try {
      const language = store.getState().app.language;
      if (language === wookieeLanguage) {
        config.params = {
          ...config.params,
          format: wookieeLanguage,
        };
      }
      return config;
    } catch (err) {
      return config;
    }
  });

  swapiInstance.interceptors.response.use((response) => {
    try {
      if (response.config.params?.format === wookieeLanguage) {
        response.data = Box(response.data as string)
          .map((data) => data.replace(/whhuanan/g, "null"))
          .map((data) => JSON.parse(data))
          .fold((data) => remapJson(data));
      }
    } catch (err) {
      console.log(err);
    } finally {
      return response;
    }
  });
  return {
    /**
     * @param param  id and (or) filter
     */
    getPeople: async <T = number | undefined>(
      id?: T,
      query?: string,
      config?: AxiosRequestConfig
    ) => {
      const baseUrl = "/people/";
      const paramUrl = typeof id !== "undefined" ? `${id}/` : "";
      const queryUrl = query || "";
      const url = baseUrl + paramUrl + queryUrl;
      return swapiInstance.get<T extends number ? Person : People>(url, config);
    },
  };
})();
