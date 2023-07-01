import axios, { AxiosRequestConfig } from "axios";
import { Friend, SendFriendRequestDto, UpdateUserDto, User } from "./types";

const API_URL = import.meta.env.VITE_REACT_APP_API_SERVER_URL;

const axiosClient = axios.create({ baseURL: API_URL });
const config: AxiosRequestConfig = { withCredentials: true };

export const getAuthUser = () => axiosClient.get<User>(`/user`, config);

export const updateAuthUser = (params: UpdateUserDto) =>
  axiosClient.patch<User>(`/user`, params, config);

export const sendFriendRequest = (params: SendFriendRequestDto) =>
  axiosClient.post<Friend>("/friend", params, config);

export const getFriends = () => axiosClient.get<Friend[]>("/friend", config);

export const deleteFriend = (id: string) =>
  axiosClient.delete<Friend>(`/friend/${id}`, config);

export const acceptFriend = (id: string) =>
  axiosClient.patch<Friend>(`/friend/${id}`, config);
