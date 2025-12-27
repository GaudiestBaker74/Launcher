const { contextBridge } = require("electron");
const fs = require("fs");
const path = require("path");

contextBridge.exposeInMainWorld("steamAPI", {
  getGames: () => {
    const steamPath = "C:/Program Files (x86)/Steam/steamapps";
    const files = fs.readdirSync(steamPath);

    const games = [];

    files.forEach(file => {
      if (file.startsWith("appmanifest")) {
        const content = fs.readFileSync(
          path.join(steamPath, file),
          "utf-8"
        );

        const appid = content.match(/"appid"\s+"(\d+)"/)?.[1];
        const name = content.match(/"name"\s+"(.+)"/)?.[1];

        if (appid && name) {
          games.push({ appid, name });
        }
      }
    });

    return games;
  }
});
