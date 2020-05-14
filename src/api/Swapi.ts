import appConfig from "config/app.config";
import axios, { AxiosRequestConfig } from "axios";
import { People, Person } from "./types/People";
import { store } from "src/frontend/redux/Store";
import { wookieeLanguage } from "src/types/Common";

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
