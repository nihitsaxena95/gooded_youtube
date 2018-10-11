import Youtube from "youtube-api";
import fs from "fs";
import readJson from "r-json";
import Lien from "lien";
import Logger from "bug-killer";
import opn from "opn";
import prettyBytes from "pretty-bytes";
import readline from 'readline';
 
export default (title, description, privacy, path) => {

return new Promise((resolve, reject) => { 
const CREDENTIALS = readJson(`./credentials/client_secret.json`);

let oauth = Youtube.authenticate({
    type: "oauth"
  , client_id: CREDENTIALS.installed.client_id
  , client_secret: CREDENTIALS.installed.client_secret
  , redirect_url: CREDENTIALS.installed.redirect_uris[0]
});
 
opn(oauth.generateAuthUrl({
    access_type: "offline"
  , scope: ["https://www.googleapis.com/auth/youtube.upload"]
}));
 
 var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    Logger.log("Trying to get the token using the following code: " + code);
    oauth.getToken(code, (err, tokens) => {
        if(err) {
          console.log(err);
          reject(err);
        } else {
        Logger.log("Got the tokens.");
 
        oauth.setCredentials(tokens);
 
        Logger.log("The video is being uploaded. Check out the logs in the terminal.");
        
        var req = Youtube.videos.insert({
            resource: {
                snippet: {
                    title: title
                  , description: description
                }
              , status: {
                    privacyStatus: privacy
                }
            }
          , part: "snippet,status"
 
          , media: {
                body: fs.createReadStream(path)
            }
        }, (err, data) => {
          if(err) {
            console.log(err)
            reject(err);
          } else {
            console.log("Done.", data);
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