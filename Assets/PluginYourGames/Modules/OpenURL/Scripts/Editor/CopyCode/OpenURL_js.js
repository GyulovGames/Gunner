﻿let allGamesData = NO_DATA;

function GetAllGames() {
    return new Promise((resolve) => {
        if (ysdk == null) {
            Final(NO_DATA);
            return;
        }
        try {
            ysdk.features.GamesAPI.getAllGames().then(({ games, developerURL }) => {
                let appID = new Array(games);
                let title = new Array(games);
                let url = new Array(games);
                let coverURL = new Array(games);
                let iconURL = new Array(games);

                for (var i = 0; i < games.length; i++) {
                    appID[i] = games[i].appID;
                    title[i] = games[i].title;
                    url[i] = games[i].url;
                    coverURL[i] = games[i].coverURL;
                    iconURL[i] = games[i].iconURL;
                }

                let jsonGames = {
                    "appID": appID,
                    "title": title,
                    "url": url,
                    "coverURL": coverURL,
                    "iconURL": iconURL,
                    "developerURL": developerURL
                };

                Final(JSON.stringify(jsonGames));

            }).catch(err => {
                console.error('Error getAllGames', err);
            })
        } catch (e) {
            console.error('CRASH Get All Games: ', e.message);
            Final(NO_DATA);
        }

        function Final(res) {
            allGamesData = res;
            resolve(res);
        }
    });
}