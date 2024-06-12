import axiosInterceptor from "../hooks/axiosInterceptor";

export const getAudienceToken = async (uid: number, channelName: string) => {
    try {
        console.log('channelName', channelName, 'uid', uid);
        const response = await axiosInterceptor.get(
            `${process.env.NEXT_PUBLIC_API_URL}liverooms/token?channelName=${channelName}&uid=${uid}&role=audience`
        );
        return response.data.result;
    } catch (error) {
        return error;
    }
};

export const getSpeakerToken = async (uid: number, channelName: string) => {
    try {
        console.log('channelName', channelName, 'uid', uid, 'role', 'speaker');
        const response = await axiosInterceptor.get(
            `${process.env.NEXT_PUBLIC_API_URL}liverooms/token?channelName=${channelName}&uid=${uid}&role=speaker`
        );
        return response.data.result;
    } catch (error) {
        return error;
    }
};