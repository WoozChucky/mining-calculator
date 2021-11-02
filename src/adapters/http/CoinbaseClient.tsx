import HttpClient from "./HttpClient";
import {AxiosRequestConfig, Method} from "axios";
import {Currency} from "../../model/Currency";

export default class CoinbaseClient {

    private readonly httpClient: HttpClient = HttpClient.getInstance();

    private readonly baseUrl: string = process.env.REACT_APP_COINBASE_URL;
    private readonly apiVersion: string = process.env.REACT_APP_COINBASE_VERSION;

    public async getEthereumPrice(currency: Currency) : Promise<number> {

        const request : AxiosRequestConfig = this.buildRequest<undefined>(
            `prices/ETH-${currency}/spot`,
        );

        const response = await this.httpClient.request<undefined, any>(request);

        if (response.status !== 200) {
            return Promise.reject(response.data);
        }

        return response.data.data.amount;
    }

    private buildRequest<Req>(
        endpoint: string,
        method: Method = 'GET',
        body: any | undefined = undefined,
        params: Record<string, string> | undefined = undefined,
        timeout: number = 2500) : AxiosRequestConfig<Req> {
        return {
            baseURL: `${this.baseUrl}/${this.apiVersion}`,
            url: endpoint,
            method: method,
            data: body,
            responseType: "json",
            timeout: timeout,
            params: params
        };
    }

}