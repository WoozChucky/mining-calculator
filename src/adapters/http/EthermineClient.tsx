import HttpClient from "./HttpClient";
import {AxiosRequestConfig, Method} from "axios";

export default class EthermineClient {

    private readonly httpClient: HttpClient = HttpClient.getInstance();

    private readonly baseUrl: string = process.env.REACT_APP_ETHERMINE_URL;

    public async getCurrentHashrate() : Promise<number> {

        const request : AxiosRequestConfig = this.buildRequest<undefined>(
            `networkStats`,
        );

        const response = await this.httpClient.request<undefined, any>(request);

        if (response.status !== 200) {
            return Promise.reject(response.data);
        }

        return response.data.data.hashrate;
    }

    private buildRequest<Req>(
        endpoint: string,
        method: Method = 'GET',
        body: any | undefined = undefined,
        params: Record<string, string> | undefined = undefined,
        timeout: number = 2500) : AxiosRequestConfig<Req> {
        return {
            baseURL: this.baseUrl,
            url: endpoint,
            method: method,
            data: body,
            responseType: "json",
            timeout: timeout,
            params: params
        };
    }

}