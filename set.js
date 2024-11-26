const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUFJa0NqV0ZTMEVNMm93ZlB2RE5qUU1pcEdPYnI4QXV1WGFCYVQ4OURHRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0ZnM3VKVmQzMDRSN0RlTXdjcDEvRHRIUzcrVGVuTUwrNit0dDhHaHVBQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBS3pwNnNuSDJJcXZUR2xoaUNjZVFFOWZTdkhpNEtaUXRzQk84cWJsRVhVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJncEYrdDc1RzRlaUpDVXBic1ljdkNrUnYrS3h3Y3plV0p0VFNEbGIyU1hjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFKclBVVWFrSlJtbjlmRHpaMGdydkF4eE5qbExrU1FEVk83NmNLVG1pWG89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkwxOHp3OFlkMEZCTFFyaDA3WURPYVpnZm01Z3hWbTFJNG9wd3Uvd2gybkE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUtLWEFUTVVuamtOREJOakN2Y043cmw3OHY1RGVQUGdjNlhob0JNazIxbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL3lvZEdoaGdjLy8ySVRudTRld0tUb084NVJsd0xjbVBSSVBzUXRKVmZScz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJ3bm4za2JrZGdrWW1LZUJmbFhyN0lKbG56NWdQVXp6Z3FNb1ROMDdtMHBRWTZNbjAxanBWNjZyRG81cU1MUEVYSmJmY2xFdnQvcXhTdTk1WXBFUURBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ4LCJhZHZTZWNyZXRLZXkiOiI0Qjl0MHc1eGNFTTIzODBjK3hsVGRtdG40SVE2dCtEUFB5bDgwQmU1V2g4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ4SUFSa0Y2a1NULTRSQWgzNUJlTndnIiwicGhvbmVJZCI6ImNiNTNmYTQyLTRmMTMtNGNiMC04Njc1LTU4YWMwYTUyZmEyZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnME5CTWZZUG1oaDRJTUtza3RyNTVmL1l6TmM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUVDYW9zZ0RIUC9kUll1NkVtUU5zTk5uSkJzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkhDRlAzSjc1IiwibWUiOnsiaWQiOiIyMzQ4MDMyMTgwNzQ0OjU5QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkBBWUQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0oyOTdKZ0JFTGpybDdvR0dEb2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjUrbS9vSE5oT2dhaC9rMDFtS0ZIQzhqNUdrTUxwZzJUa1J6RDZodExuWDg9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImdocVl5bzN3ZHIzakt4U0YxcnIzMVFNSWRieW0vOW9Xc1AxY2ljQUZ1VHRUbTV6VmRUYm5qOWpraXhjTHRYTG4vZGU5Q2dyaWFwNHdBTS9Pb0JkMkFnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI1RlVXS29JSGIyUkJIOXI4QkdiakMzZ0VSQXp2MUdUeDVvY0FGMlVybTRsTW10Z29DQVdGbEJPSTZCWnFRQ1AveUNDVEdOd1VkNnJlOVRjWWtRQVpDdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgwMzIxODA3NDQ6NTlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZWZwdjZCellUb0dvZjVOTlppaFJ3dkkrUnBEQzZZTms1RWN3K29iUzUxLyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMjYzODE1MH0=',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Keithkeizzah/ALPHA-MD1',
    OWNER_NAME : process.env.OWNER_NAME || "@AYD",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2348032180744",  
    ANTILINK : process.env.ANTILINK || "yes",
    ANTI_VV : process.env.ANTI_VV || "yes",               
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
