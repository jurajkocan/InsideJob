import appConfig from "config/app.config";
import axios, { AxiosRequestConfig } from "axios";
import { People } from "./types/People";

export const swapi = (() => {
  const swapiInstance = axios.create({ baseURL: appConfig.apiUrl });

  return {
    /**
     * @param param  id and (or) filter
     */
    getPeople: async (
      id?: number,
      filter?: { [key: string]: string },
      config?: AxiosRequestConfig
    ) => {
      const baseUrl = "/people";
      const paramUrl = typeof id !== "undefined" ? `/${id}` : "";
      // TODO: filter query
      const filterUrl =
        typeof filter !== "undefined"
          ? "?" +
            Object.keys(filter)
              .map((key) => key + "=" + filter[key])
              .join("&")
          : "";

      const url = baseUrl + paramUrl + filterUrl;
      return swapiInstance.get<People>(url, config);
    },
  };
})();
