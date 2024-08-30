import axios, { AxiosInstance } from "axios";

class ApiConfig {

    // private baseURL = 'http://192.168.1.41:8090';//san
    private baseURL = 'http://localhost:8096';
    // private baseURL = 'http://localhost:8096';
   

    private baseSecURL = 'http://localhost:8095';//cms
    private basepepURL = 'http://192.168.1.50:8090';//pep
    // private baseamlURL = 'http://192.168.1.62:8096';//aml
    private baseamlURL = 'http://localhost:8093';//aml
    // private baseamlURL = 'http://localhost:8093';//aml
    private basebtmsURL = 'http://localhost:8082';//btms

    private apiBaseUrl: string;
    private apiBaseSecUrl: string;
    private apibasepepURL: string;
    private apibaseamlURL: string;
    private apibasebtmsURL: string;


    constructor() {
        this.apiBaseUrl = this.baseURL;

        this.apiBaseSecUrl = this.baseSecURL;
        this.apibasepepURL=this.basepepURL;
        this.apibaseamlURL=this.baseamlURL;
        this.apibasebtmsURL=this.basebtmsURL;
    }

    private getApiBaseURL = () => {
        return this.apiBaseUrl;
    }

    public getAxiosInstance = () => {
        return axios.create({
            baseURL: this.getApiBaseURL()
        });
    }

    private getApiBaseSecURL = () => {
        return this.apiBaseSecUrl;
    }

    public getAxiosSecInstance = () => {
        return axios.create({ baseURL: this.getApiBaseSecURL() });
    }

    private getApiPepBaseSecURL = () => {
        return this.apibasepepURL;
    }

    public getAxiosThrirdInstance = () => {
        return axios.create({ baseURL: this.getApiPepBaseSecURL() });
    }
    private getApiAmlBaseSecURL = () => {
        return this.apibaseamlURL;
    }

    public getAxiosFourInstance = () => {
        return axios.create({ baseURL: this.getApiAmlBaseSecURL() });
    }
    private getApiBtmsBaseSecURL = () => {
        return this.apibasebtmsURL;
    }

    public getAxiosFifthInstance = () => {
        return axios.create({ baseURL: this.getApiBtmsBaseSecURL() });
    }
}

export default ApiConfig;