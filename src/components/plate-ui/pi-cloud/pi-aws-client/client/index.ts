import { DEFAULT_ORIGIN_URL } from "../upload/constants";
import { JsonObject } from "type-fest";
import axios, { AxiosResponse } from "axios";

export type ClientOptions = {
  organizationId?: string;
  apiOrigin?: string;
};

type ClientPost<Data> = {
  organizationId: string;
  data: Data;
};

/**
 * Create a `Client` object and return it.
 */
export function createClient(options: ClientOptions): Client {
  return new Client(options);
}

/**
 * Create a `Client` object that we pass to the API functions.
 *
 * We enforce the creation of a `Client` object for a few reasons:
 *
 * 1. It helps us not have to deal with `authTokenable` separately for every
 *    API function call.
 * 2. It makes it easy for any components to support any initialization changes
 *    by just initializing with `ClienOptions`. For example, if we wanted to
 *    add a `path` property back in the future, we just have to implement at
 *    one place.
 * 3. It's self documenting on what you should probably accept as part of your
 *    initialization if you want to fully support all the options. For example,
 *    we can see here that `apiOrigin` is an option to support. If it's
 *    part of multiple function signature like in `upload`, then it may not
 *    be so easy to remember to pass all the values through at each function
 *    invocation location.
 */
export class Client {
  organizationId?: string;
  apiOrigin: string;
  constructor({
    organizationId,
    apiOrigin = DEFAULT_ORIGIN_URL,
  }: ClientOptions) {
    if (apiOrigin.endsWith("/"))
      throw new Error("apiOrigin should not end with a '/'");
    // This is not necessary because we are using the next api routes ("/api/proxy")
    // if (!apiOrigin.startsWith("http"))
    //   throw new Error(`Expected apiOrigin to start with http`);

    this.organizationId = organizationId;
    this.apiOrigin = apiOrigin;
  }

  /**
   * Posts at the given path with the `apiKey` or `authToken`.
   */
  async post<D extends JsonObject, R extends JsonObject>(
    path: string,
    data: D,
  ): Promise<R> {
    if (!path.startsWith("/"))
      throw new Error(
        `Expected path to start with "/" but is ${JSON.stringify(path)}`,
      );
    const url = `${this.apiOrigin}${path}`;

    if (!this.organizationId)
      throw new Error(
        `Expected organizationId to be defined but is ${JSON.stringify(
          this.organizationId,
        )}`,
      );

    const post: ClientPost<D> = {
      data,
      organizationId: this.organizationId,
    };

    const axiosResponse = await axios.post<R, AxiosResponse<R>, ClientPost<D>>(
      url,
      post,
      {
        withCredentials: true,
      },
    );
    return axiosResponse.data;
  }
}
