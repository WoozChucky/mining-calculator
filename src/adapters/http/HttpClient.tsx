
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

export default class HttpClient {

    private _axios: AxiosInstance = axios.create();

    private static _instance: HttpClient;

    public static getInstance(): HttpClient {
        if (this._instance == null) {
            this._instance = new HttpClient();
        }
        return this._instance;
    }

    public async get(url: string): Promise<any> {
        const response = await this._axios.get(url);
        return response.data;
    }

    public async request<Req = any, Res = any>(request: AxiosRequestConfig<Req>) : Promise<AxiosResponse<Res>> {
        return await this._axios.request(request) as AxiosResponse<Res>;
    }

}