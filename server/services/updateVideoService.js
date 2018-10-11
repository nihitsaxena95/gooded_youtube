import Youtube from "youtube-api";
import fs from "fs";
import readJson from "r-json";
import Lien from "lien";
import Logger from "bug-killer";
import opn from "opn";
import prettyBytes from "pretty-bytes";
import readline from 'readline';
 
export default (id, title, description, privacy) => {
    return new Promise((resolve, reject) => {
const CREDENTIALS = readJson(`./credentials/client_secret.json`);

// Authenticate
let oauth = Youtube.authenticate({
    type: "oauth"
  , client_id: CREDENTIALS.installed.client_id
  , client_secret: CREDENTIALS.installed.client_secret
  , redirect_url: CREDENTIALS.installed.redirect_uris[0]
});
 
opn(oauth.generateAuthUrl({
    access_type: "offline"
  , scope: ["https://www.googleapis.com/auth/youtubepartner"]
}));
 
 var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

// Handle oauth2 callback
rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    Logger.log("Trying to get the token using the following code: " + code);
    oauth.getToken(code, (err, tokens) => {
        Logger.log("Got the tokens.");
        if(err) {
          console.log(err);
          reject(err);
        } else {
        oauth.setCredentials(tokens);
        Logger.log("The video is being uploaded. Check out the logs in the terminal.");
        var req = Youtube.videos.update({
            resource: {
                id : id,
                snippet: {
                    categoryId : "22",
                    title: title,
                   description: description
                }
              , status: {
                    privacyStatus: privacy
                }
            }
          , part: "snippet,status"

        }, (err, data) => {
            console.log("Done.");
            if(err) {
                reject(err)
            } else {
            console.log(data)
            let a = {
                title : data.snippet.title,
                description : data.snippet.description,
                id : data.id,
                privacy : data.status.privacyStatus,
            }
            resolve(a);
            }
        });
    }
    });
});
});
}