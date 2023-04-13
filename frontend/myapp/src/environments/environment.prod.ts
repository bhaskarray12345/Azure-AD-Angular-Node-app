import { Configuration } from '@azure/msal-browser';


export const msalConfig: Configuration = {
    auth: {
        clientId: '<your-MyApp-application-ID>',
        redirectUri: '/', 
    },
    cache: {
        storeAuthStateInCookie: true, 
    }
}