const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUZUemM3RE5YV0ZCeWZPVDRjY2V2djRMZS94UUZNc0VBS3NhQ0xWTGpraz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSkZXcmFlZFFIb2FlSC9QM2dqSmIrY1BYdHkxbmgrNnhtUFNNNytVZitVbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJRU9BRVliMXhDcHNwVGlFUFY3ajJwc00yQWtTWEc1Q1J1Qk10Q1VjR1ZRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhemJhWTJEdkhuQm9XUG9yK2dzZ2hLM2FsVXJ3ajU0MU1lTjZ5b2JENjFJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVPK0MwN0RsR1ZxcXJMRHgvbDlpbDk1RG9rb0ZIWmVhYVlYckZEMTlWWFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iks0UHZXOFNWTE5wN1pJb0ZYbUc2Rzg0T0VyQzRLSy8xS2I3Tk5pTkxXUTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK05UQ29GM0JjUi9GMVUvU1lxOExKa1VIRCtGdzFlTVdUT0ZBK3FHUEVIST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ1U5bWRiOFdJOGFkbUdFS0tYNWZ6QUx5TDBjM2JRb3QwdkdCSHFPZDVrbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5aNTNqTWpleTI3cHFuaUpMTlE3ZnloRmttQ1V1bzZNQmlMVFBNRGYwT3lYaS9DUWgrYWNOTFVhREJHNlY1R3lnNmIvMWl3alY4alYxdjBVU3VzbkNBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ3LCJhZHZTZWNyZXRLZXkiOiJwY2U5aUpDTXZtRWoxdGowYnF0M3RYOGJGWTdXdEpUMTNHc015SjJHVld3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJJTjdnendUUFMyQ3lYdnUwSDZLMDlRIiwicGhvbmVJZCI6ImQ5YzJiNzM3LTZhOGUtNGUyNi04ZjUzLTNlZmVkYmJkZTYzNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyV3JsL0EyaEpJcmRBM1NmV3ExUlNtMjg4aEU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRWZLNE14VjhPbXhISkZNQzFualgzelNBT09VPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjNNMjk1S1RYIiwibWUiOnsiaWQiOiIyMzQ4MDMyMTgwNzQ0OjE0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkBBWUQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xMRjhkOEJFTVhSeGJvR0dESWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik5hOUpOT3FOY3B6Z05DWFVXQjZOb1hIRzJVK1R4OWtCeUU3M1VKRWROV0U9IiwiYWNjb3VudFNpZ25hdHVyZSI6InpqcjJ4ZnA3aXNqWEk1Sy9vb0VtL2JURW84bFJyYWR6ZVd5Wjhnb2wyY2F5VlNNRWFYVE8yUDJJamhYcTdQUTZhajFHVTlPdWtYdWJCa2JuTWtHOEFBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJvNUdNQzdONU1GNUgrUnc2eWVKL1FqdEw5RWRGMkk3UXVDVnhTeEVrRVJ6Y1NySWlBK3JCVzJKWnN2Uzg2bWpjTkZwNWR3QUd5TGg1WnhRcDZFTUxBUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgwMzIxODA3NDQ6MTRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVFd2U1RUcWpYS2M0RFFsMUZnZWphRnh4dGxQazhmWkFjaE85MUNSSFRWaCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMzM4ODQ5OSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFFSlMifQ==',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Keithkeizzah/ALPHA-MD1',
    OWNER_NAME : process.env.OWNER_NAME || "@AYD",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2348032180744",  
    ANTILINK : process.env.ANTILINK || "yes",
    ANTI_VV : process.env.ANTI_VV || "non",               
    AUTO_REPLY : process.env.AUTO_REPLY || "yes",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || 'non',              
    CHATBOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.BLOCK_ALL || 'yes',              
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
    CAPTION : process.env.CAPTION || "ALPHA-MD",
    BOT : process.env.BOT_NAME || 'ALPHA_MD',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    GEMINI_API_KEY : process.env.GEMINI_API_KEY || 'AIzaSyCcZqDMBa8FcAdBxqE1o6YYvzlygmpBx14',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL: process.env.ANTICALL || 'yes',              
    CHAT_BOT : process.env.CHAT_BOT || 'no',  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
