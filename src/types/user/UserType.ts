export interface DeviceInfo {
  isMobile: boolean;
  deviceName: string;
  os: string;
  browser: string;
  ip: string;
  country: string;
  city: string;
  region: string;
  latitude: number;
  longitude: number;
  userAgent: string;
}

export interface UserType {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  image: string;
  uid: string;
  username: string;
  authType?: string;
  likedAccounts?: string[];
  dateOfBirth?: string;
  deviceInfo?: DeviceInfo;
  createdAt?: string;
  updatedAt?: string;
  followers?: string[];
  following?: string[];
}

export const defaultUser: UserType = {
  _id: "",
  fullName: "",
  email: "",
  password: "",
  authType: "",
  likedAccounts: [],
  username: "",
  dateOfBirth: "",
  image: "",
  deviceInfo: {
    isMobile: false,
    deviceName: "",
    os: "",
    browser: "",
    ip: "",
    country: "",
    city: "",
    region: "",
    latitude: 0,
    longitude: 0,
    userAgent: "",
  },
  uid: "",
  createdAt: "",
  updatedAt: "",
  followers: [],
  following: [],
}
