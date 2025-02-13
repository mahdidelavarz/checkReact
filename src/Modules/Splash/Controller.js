import { CDN_Url, Url } from '../../Configs/Urls';

async function downloadBackup(api) {
    try {
        const url = Url.backupUrl + api.replace('.json', '');
        const response = await fetch(url, { method: 'GET' });
        const responseJson = await response.json();
        const data = JSON.stringify(responseJson);
        console.log('RESPONSE BACKUP ', api, data.substring(0, 10));
        return responseJson;
    } catch {
        console.log('DOWNLOAD FAILED', api);
        throw 'retry';
    }
}

export async function downloadJson(api) {
    try {
        const response = await fetch(`${CDN_Url.serverUrl}${api}`, { method: 'GET' });
        const responseJson = await response.json();
        const data = JSON.stringify(responseJson);
        console.log('RESPONSE JSON ', api, data.substring(0, 10));
        return responseJson;
    } catch (error) {
        if (error instanceof SyntaxError)
            return downloadBackup(api);
        console.log('UNKNOWN ERROR in download json', error);
    }
};