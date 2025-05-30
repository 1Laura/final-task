import { PROD } from "@/consts/environment";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const baseURL = PROD
    ? "https://final-crud-app-54b7f6418183.herokuapp.com/"
    : "http://localhost:2002/";