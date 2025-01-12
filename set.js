const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVVBuNjc1ZDlONkVPdGFOOWlGTTE0TEk1QWprbEtJTVI1KzlqY2h5VVVucz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRHRWZTNKQm9PQUVEaUdpc3JPbmVUM2lzdGY2bGwvSk5sVmhHeDEyOXJDZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHUHZITXBJa3V1MFpHd3haeXZ2NFB3eXdIMDA0UEtkeHdRNzdpYis3dVVBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrMDBMMmpjSWljZGlqa2t1TC9haGw4dGFhcXlSWFNsVGQrK2hITEdrdUZrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklDQ29iTDF6eG5KcmdtT3p1djB6cWp2djZVUU1ObStRR3JTeXdOak1KM0U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik44NFRvTGQ5WlB5ZkNxMDhEa0JOeFRNcTlZU2ErTnpqOUJxRUFmTi9uMkU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0RrVlZBcm1Kc3RVZ09ETnNvejZXOWRyZkFYZi9tSkwxMlQxams4aEtYQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWjBiRWhZb3V5bVNNRjUvWnpYajBaQm1qUkxyVmhwWjJxRm54MkF4MkUwcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllYbnpac25IZjdNRTBCZ1FIekY4ODc1bmhVMVk3ZVZkN3phQkhzZUIvSFplUmN0eTdRekc5MTFrQTIwN21TdW5MWWZYMy94WXpONUlRaXJTZzJyN2hRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQzLCJhZHZTZWNyZXRLZXkiOiJFMlhBcnNHRTNrRlV3UDVDNllUZzlMb2VYT3ozQWlnSGlXdlUrYkZQTGtVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ6d1gyU2FETFNwLWFQOWx4SkEzcVpnIiwicGhvbmVJZCI6IjE4YjIzNTViLWM5ZjMtNDA4Mi04YTU2LTE3M2MzYTdmYjM3YiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUK1RjbEU5eWp2ckpGK1p6bklTazRmN2J5SVk9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVqMTBpY095RnMwTzVzbExULzlnQjVQcXJTcz0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1AvYTF0WUNFS2o4ajd3R0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkxPdXIwQk5GYnBmV29EYWVpM2xPSzNkSVh4eWppYmlYVWQxbzlZb1h3VWc9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlJyZ2hna2JmVi9SdzVKUjJHeWhKSkNvR0JPSStrTVYyWmMyTWtMZU91bVJ2Nm9pTnZ5OG5KRWRjQ1ZnOWRQR3Y1aGVZRjZ4WmxpcG1icE4vYlZOTkNRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ2cGNFR1drYnc0WlFoR2k1cU8zUVhTZURvVWUyWlE5NUdlV0JKWjRFdnRLQ1pQWTY1elFxT3FCdFFNTUlIY2xpdWo5KzNvc0RaNTUwZWx3L20rV1hpQT09In0sIm1lIjp7ImlkIjoiNDUyMzU0MTk2OTozQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkVSRU4iLCJsaWQiOiIxMzM5Nzc2NDYwNTk1Mzg6M0BsaWQifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNDUyMzU0MTk2OTozQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlN6cnE5QVRSVzZYMXFBMm5vdDVUaXQzU0Y4Y280bTRsMUhkYVBXS0Y4RkkifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBMElCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczNjcwMzU0MSwibGFzdFByb3BIYXNoIjoiMXNDSDNaIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "eren",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "4523541969",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'eren',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUDIO_REPLY : process.env.AUDIO_REPLY|| 'no', 
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'no',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'no',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'no',
                  AUTO_BIO : process.env.AUTO_BIO || 'no',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'no',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});


                  
