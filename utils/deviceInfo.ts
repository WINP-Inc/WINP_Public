import axios from 'axios';

export const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const ipAddress = async () => {
    try {
        const response = await axios.get('https://api64.ipify.org?format=json');
        return response.data.ip;
    } catch (error) {
        console.log(error);
    }
};

export const getBrowser = () => {
    const userAgent = navigator.userAgent;
    let browser = 'Unknown';
    if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
        browser = 'Opera';
    } else if (userAgent.indexOf('Edge') > -1) {
        browser = 'Edge';
    } else if (userAgent.indexOf('Chrome') > -1) {
        browser = 'Chrome';
    } else if (userAgent.indexOf('Safari') > -1) {
        browser = 'Safari';
    } else if (userAgent.indexOf('Firefox') > -1) {
        browser = 'Firefox';
    } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident/') > -1) {
        browser = 'IE';
    }
    return browser;
};

export const getOS = () => {
    const userAgent = navigator.userAgent;
    let os = 'Unknown';
    if (userAgent.indexOf('Win') > -1) {
        os = 'Windows';
    } else if (userAgent.indexOf('Mac') > -1) {
        os = 'MacOS';
    } else if (userAgent.indexOf('X11') > -1) {
        os = 'UNIX';
    } else if (userAgent.indexOf('Linux') > -1) {
        os = 'Linux';
    }
    return os;
};

export const getDevice = () => {
    const userAgent = navigator.userAgent;
    let device = 'Unknown';
    if (userAgent.indexOf('Mobile') > -1) {
        device = 'Mobile';
    } else if (userAgent.indexOf('Tablet') > -1) {
        device = 'Tablet';
    } else {
        device = 'Desktop';
    }
    return device;
};

export const getDeviceType = () => {
    const userAgent = navigator.userAgent;
    let deviceType = 'Unknown';
    if (userAgent.indexOf('iPhone') > -1) {
        deviceType = 'iPhone';
    } else if (userAgent.indexOf('iPad') > -1) {
        deviceType = 'iPad';
    } else if (userAgent.indexOf('Android') > -1) {
        deviceType = 'Android';
    }
    return deviceType;
};

export const getDeviceName = () => {
    const userAgent = navigator.userAgent;
    let deviceName = 'Unknown';
    if (userAgent.indexOf('iPhone') > -1) {
        deviceName = 'iPhone';
    } else if (userAgent.indexOf('iPad') > -1) {
        deviceName = 'iPad';
    } else if (userAgent.indexOf('Android') > -1) {
        deviceName = 'Android';
    } else if (userAgent.indexOf('Mac') > -1) {
        deviceName = 'Mac';
    } else if (userAgent.indexOf('Windows') > -1) {
        deviceName = 'Windows';
    } else if (userAgent.indexOf('Linux') > -1) {
        deviceName = 'Linux';
    }
    return deviceName;
};

export const getCountry = async () => {
    try {
        const response = await axios.get('https://ipapi.co/json/');
        return response.data.country_name;
    } catch (error) {
        console.log(error);
    }
};

export const getCity = async () => {
    try {
        const response = await axios.get('https://ipapi.co/json/');
        return response.data.city;
    } catch (error) {
        console.log(error);
    }
};

export const getRegion = async () => {
    try {
        const response = await axios.get('https://ipapi.co/json/');
        return response.data.region;
    } catch (error) {
        console.log(error);
    }
};

export const getLatitude = async () => {
    try {
        const response = await axios.get('https://ipapi.co/json/');
        return response.data.latitude;
    } catch (error) {
        console.log(error);
    }
};

export const getLongitude = async () => {
    try {
        const response = await axios.get('https://ipapi.co/json/');
        return response.data.longitude;
    } catch (error) {
        console.log(error);
    }
};

export const getUserAgent = () => {
    return navigator.userAgent;
};

export const getLocationInfo = async (latitude: number, longitude: number) => {
    try {
        const response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};