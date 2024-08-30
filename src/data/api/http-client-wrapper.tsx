import ApiConfig from "./api-config";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from 'react-toastify';
import StorageService from "../storage/storage-service";

class HttpClientWrapper {

  private axiosClient: AxiosInstance;
  private axiosClient2: AxiosInstance;
  private axiosClient3: AxiosInstance;
  private axiosClient4: AxiosInstance;
  private axiosClient5: AxiosInstance;

  constructor() {
    this.axiosClient = new ApiConfig().getAxiosInstance();//san
    this.axiosClient2 = new ApiConfig().getAxiosSecInstance();//cms
    this.axiosClient3 = new ApiConfig().getAxiosThrirdInstance();//pep
    this.axiosClient4 = new ApiConfig().getAxiosFourInstance();//aml
    this.axiosClient5 = new ApiConfig().getAxiosFifthInstance();

  }

  public ALpost = async (path: string, payload: any) => {
    console.log("HttpClientWrapper post() start path = '" + path + "', payload = " + JSON.stringify(payload));
    try {
      let response: any = await this.axiosClient2.post(path, payload, this.getJsonHeaderConfig());
      console.log("HttpClientWrapper post() response data " + JSON.stringify(response.data.data));
      console.log("HttpClientWrapper post() end");
      return response.data;
    } catch (err: any) {
      console.error("HttpClientWrapper post() error: ", err);
      toast.error(err.response?.data?.message || "An error occurred", { containerId: 'TR' });
      throw err;
    }
  };

  public post = async (path: string, payload: any) => {
    console.log("HttpClientWrapper post() start path = '" + path + "', payload = " + JSON.stringify(payload));
    try {
      let response: any = await this.axiosClient.post(path, payload, this.getJsonHeaderConfig());
      console.log("HttpClientWrapper post() response data " + JSON.stringify(response.data.data));
      console.log("HttpClientWrapper post() end");
      return response.data;
    } catch (err: any) {
      console.error("HttpClientWrapper post() error: ", err);
      toast.error(err.response?.data?.message || "An error occurred", { containerId: 'TR' });
      throw err;
    }
  };

  public ALget = async (path: string) => {
    console.log("HttpClientWrapper get() start path = " + path);
    try {
      let response: any = await this.axiosClient2.get(path, this.getJsonHeaderConfig());
      console.log("HttpClientWrapper get() response data " + JSON.stringify(response.data.data));
      console.log("HttpClientWrapper get() end path = " + path);
      return response.data;
    } catch (err: any) {
      console.log("HttpClientWrapper get() error=== " + JSON.stringify(err));
      throw err;
    }
  };
  public ALget3 = async (path: string) => {
    console.log("HttpClientWrapper get() start path = " + path);
    try {
      let response: any = await this.axiosClient3.get(path, this.getJsonHeaderConfig());
      console.log("HttpClientWrapper get() response data " + JSON.stringify(response.data.data));
      console.log("HttpClientWrapper get() end path = " + path);
      return response.data;
    } catch (err: any) {
      console.log("HttpClientWrapper get() error=== " + JSON.stringify(err));
      throw err;
    }
  };
  public ALpost3 = async (path: string, payload: any) => {
    console.log("HttpClientWrapper post() start path = '" + path + "', payload = " + JSON.stringify(payload));
    try {
      let response: any = await this.axiosClient3.post(path, payload, this.getJsonHeaderConfig());
      console.log("HttpClientWrapper post() response data " + JSON.stringify(response.data.data));
      console.log("HttpClientWrapper post() end");
      return response.data;
    } catch (err: any) {
      console.error("HttpClientWrapper post() error: ", err);
      toast.error(err.response?.data?.message || "An error occurred", { containerId: 'TR' });
      throw err;
    }
  };

  public get = async (path: string) => {
    console.log("HttpClientWrapper get() start path = " + path);
    try {
      let response: any = await this.axiosClient.get(path, this.getJsonHeaderConfig());
      console.log("HttpClientWrapper get() response data " + JSON.stringify(response.data.data));
      console.log("HttpClientWrapper get() end path = " + path);
      return response.data;
    } catch (err: any) {
      console.log("HttpClientWrapper get() error=== " + JSON.stringify(err));
      throw err;
    }
  };

  public gets = async (path: string, config?: AxiosRequestConfig) => {
    console.log("HttpClientWrapper get() start path = " + path);
    try {
      const mergedConfig = { ...this.getJsonHeaderConfig(), ...config };
      let response: any = await this.axiosClient.get(path, mergedConfig);
      console.log("HttpClientWrapper get() response data " + JSON.stringify(response.data.data));
      console.log("HttpClientWrapper get() end path = " + path);
      return response.data;
    } catch (err: any) {
      console.log("HttpClientWrapper get() error=== " + JSON.stringify(err));
      throw err;
    }
  };

  public put = async (path: string, payload?: any) => {
    console.log("HttpClientWrapper put() start path = '" + path + "', payload = " + JSON.stringify(payload));
    try {
      let response: any = await this.axiosClient.put(path, payload, this.getJsonHeaderConfig());
      console.log("HttpClientWrapper put() response data " + JSON.stringify(response.data.data));
      console.log("HttpClientWrapper put() end");
      return response.data;
    } catch (err: any) {
      console.error("HttpClientWrapper put() error: ", err);
      toast.error(err.response?.data?.message || "An error occurred", { containerId: 'TR' });
      throw err;
    }
  };
  public ALput = async (path: string, payload?: any) => {
    console.log("HttpClientWrapper put() start path = '" + path + "', payload = " + JSON.stringify(payload));
    try {
      let response: any = await this.axiosClient.put(path, payload, this.getJsonHeaderConfig());
      console.log("HttpClientWrapper put() response data " + JSON.stringify(response.data.data));
      console.log("HttpClientWrapper put() end");
      return response.data;
    } catch (err: any) {
      console.error("HttpClientWrapper put() error: ", err);
      toast.error(err.response?.data?.message || "An error occurred", { containerId: 'TR' });
      throw err;
    }
  };

  public delete = async (path: string, payload?: any) => {
    console.log("HttpClientWrapper put() start path = '" + path + "");
    try {
      let response: any = await this.axiosClient.delete(path, this.getJsonHeaderConfig());
      console.log("HttpClientWrapper delete() response data " + JSON.stringify(response.data.data));
      console.log("HttpClientWrapper delete() end");
      return response.data;
    } catch (err: any) {
      console.error("HttpClientWrapper delete() error: ", err);
      toast.error(err.response?.data?.message || "An error occurred", { containerId: 'TR' });
      throw err;
    }
  };

  public postFormData = async (path: string, formData: FormData) => {
    console.log("HttpClientWrapper post() start path = '" + path + "'");
    try {
      let response: any = await this.axiosClient.post(path, formData, this.getFormDataHeaderConfig());
      console.log("HttpClientWrapper post() end path = '" + path + "'");
      return response.data;
    } catch (err: any) {
      console.log("HttpClientWrapper post() error=== " + JSON.stringify(err));
      toast.error(err.response.data.message, { containerId: 'TR' });
      throw err;
    }
  };

  public putFormData = async (path: string, formData: FormData) => {
    console.log("HttpClientWrapper post() start path = '" + path + "'");
    try {
      let response: any = await this.axiosClient.put(path, formData, this.getFormDataHeaderConfig());
      console.log("HttpClientWrapper post() end path = '" + path + "'");
      return response.data;
    } catch (err: any) {
      console.log("HttpClientWrapper post() error=== " + JSON.stringify(err));
      toast.error(err.response.data.message, { containerId: 'TR' });
      throw err;
    }
  };

  public pute = async (url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return await this.axiosClient.put(url, data, config);
  };

  async gete(url: string, config: any): Promise<any> {
    try {
      const response = await this.axiosClient.get(url, config);
      return response;
    } catch (error) {
      throw new Error('Request failed');
    }
  };

  getFormDataHeaderConfig = () => {
    return this.getHeaderConfig('multipart/form-data');
  };

  getHeaderConfig = (contentType: string) => {
    let headers: any = {};
    headers['Content-Type'] = contentType;
    let token = StorageService.getToken();
    if (token) {
      headers['Authorization'] = 'Bearer ' + token;
    }
    return { headers: headers }
  };

  getJsonHeaderConfig = () => {
    return this.getHeaderConfig('application/json');
  };

  public getLocalImage = async (path: string) => {
    console.log("HttpClientWrapper getLocalImage() start path = " + path);
    try {
      const response: any = await this.axiosClient.get(path, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });
      return response.data;
    } catch (err: any) {
      console.error("HttpClientWrapper getLocalImage() error: ", err);
      throw err;
    }
  };
  
  public getLocalImagepep = async (path: string) => {
    console.log("HttpClientWrapper getLocalImage() start path = " + path);
    try {
      const response: any = await this.axiosClient3.get(path, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });
      return response.data;
    } catch (err: any) {
      console.error("HttpClientWrapper getLocalImage() error: ", err);
      throw err;
    }
  };
  public getLocalImageCms = async (path: string) => {
    console.log("HttpClientWrapper getLocalImage() start path = " + path);
    try {
      const response: any = await this.axiosClient2.get(path, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });
      return response.data;
    } catch (err: any) {
      console.error("HttpClientWrapper getLocalImage() error: ", err);
      throw err;
    }
  };
  
  getLocalPDFpep = async (path: string) => {
    console.log("HttpClientWrapper getLocalPDF() start path =", path);
    try {
      const response: any = await this.axiosClient3.get(path, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/pdf',
        },
      });
      if (response && response.data) {
        const base64Pdf = this.arrayBufferToBase64(response.data);
        console.log("PDF Data:", base64Pdf);
        return base64Pdf;
      } else {
        console.error("PDF Data is empty.");
        throw new Error("Empty PDF Data");
      }
    } catch (err: any) {
      console.error("HttpClientWrapper getLocalPDF() error:", err);
      throw err;
    }
  };
  
  getLocalPDF = async (path: string) => {
    console.log("HttpClientWrapper getLocalPDF() start path =", path);
    try {
      const response: any = await this.axiosClient.get(path, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/pdf',
        },
      });
      if (response && response.data) {
        const base64Pdf = this.arrayBufferToBase64(response.data);
        console.log("PDF Data:", base64Pdf);
        return base64Pdf;
      } else {
        console.error("PDF Data is empty.");
        throw new Error("Empty PDF Data");
      }
    } catch (err: any) {
      console.error("HttpClientWrapper getLocalPDF() error:", err);
      throw err;
    }
  };
  getLocalPDFCms = async (path: string) => {
    console.log("HttpClientWrapper getLocalPDF() start path =", path);
    try {
      const response: any = await this.axiosClient2.get(path, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/pdf',
        },
      });
      if (response && response.data) {
        const base64Pdf = this.arrayBufferToBase64(response.data);
        console.log("PDF Data:", base64Pdf);
        return base64Pdf;
      } else {
        console.error("PDF Data is empty.");
        throw new Error("Empty PDF Data");
      }
    } catch (err: any) {
      console.error("HttpClientWrapper getLocalPDF() error:", err);
      throw err;
    }
  };
  arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const binary = new Uint8Array(buffer);
    const bytes = new Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = String.fromCharCode(binary[i]);
    }
    return btoa(bytes.join(''));
  };
  //aml
  public amlpost = async (path: string, payload: any) => {
    console.log("HttpClientWrapper post() start path = '" + path + "', payload = " + JSON.stringify(payload));
    try {
      let response: any = await this.axiosClient4.post(path, payload, this.getJsonHeaderConfig());
      console.log("HttpClientWrapper post() response data " + JSON.stringify(response.data.data));
      console.log("HttpClientWrapper post() end");
      return response.data;
    } catch (err: any) {
      console.error("HttpClientWrapper post() error: ", err);
      toast.error(err.response?.data?.message || "An error occurred", { containerId: 'TR' });
      throw err;
    }
  };
  public amlget = async (path: string) => {
    console.log("HttpClientWrapper get() start path = " + path);
    try {
      let response: any = await this.axiosClient4.get(path, this.getJsonHeaderConfig());
      console.log("HttpClientWrapper get() response data " + JSON.stringify(response.data.data));
      console.log("HttpClientWrapper get() end path = " + path);
      return response.data;
    } catch (err: any) {
      console.log("HttpClientWrapper get() error=== " + JSON.stringify(err));
      throw err;
    }
  };
  public amlput = async (path: string, payload?: any) => {
    console.log("HttpClientWrapper put() start path = '" + path + "', payload = " + JSON.stringify(payload));
    try {
      let response: any = await this.axiosClient4.put(path, payload, this.getJsonHeaderConfig());
      console.log("HttpClientWrapper put() response data " + JSON.stringify(response.data.data));
      console.log("HttpClientWrapper put() end");
      return response.data;
    } catch (err: any) {
      console.error("HttpClientWrapper put() error: ", err);
      toast.error(err.response?.data?.message || "An error occurred", { containerId: 'TR' });
      throw err;
    }
  };
  public amlpostFormData = async (path: string, formData: FormData) => {
    console.log("HttpClientWrapper post() start path = '" + path + "'");
    try {
      let response: any = await this.axiosClient4.post(path, formData, this.getFormDataHeaderConfig());
      console.log("HttpClientWrapper post() end path = '" + path + "'");
      return response.data;
    } catch (err: any) {
      console.log("HttpClientWrapper post() error=== " + JSON.stringify(err));
      toast.error(err.response.data.message, { containerId: 'TR' });
      throw err;
    }
  };
  //btms
  public ALget5 = async (path: string) => {
    console.log("HttpClientWrapper get() start path = " + path);
    try {
      let response: any = await this.axiosClient5.get(path, this.getJsonHeaderConfig());
      console.log("HttpClientWrapper get() response data " + JSON.stringify(response.data.data));
      console.log("HttpClientWrapper get() end path = " + path);
      return response.data;
    } catch (err: any) {
      console.log("HttpClientWrapper get() error=== " + JSON.stringify(err));
      throw err;
    }
  };
  

}

export default HttpClientWrapper;