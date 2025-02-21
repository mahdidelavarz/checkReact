// import NetInfo from '@react-native-community/netinfo';
// import Toast from 'react-native-simple-toast';
import { Url } from '../Configs/Urls';
import Storage from './Storage';

let storage = new Storage();
let Token = storage.get("Token", data => Token = data);

export async function GET(api, history) {
    try {
        const response = await fetch(`${Url.serverUrl}${api}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'token ' + Token
            }
        });
        // statusHandle(response.status, history);
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return null;
    }
};

// how to use the "GET" method
// async getProfile() {
//    const response = await GET("Auth/profile", this.props.history);
//    console.log('data', response);
//}


export function statusHandle(status, history) {
    // Status Handler To Fetch Network
    if (status == 401) {
        console.log("کاربری با این مشخصات وجود ندارد");
        history.push("/SignIn");
    } else if (status == 500) {
        console.log("خطای سرویس‌ دهنده‌ی داخلی دوباره تلاش کنید");
    }
};