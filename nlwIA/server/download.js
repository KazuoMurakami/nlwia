import ytdl from "ytdl-core";
import fs from "fs"; //manipulador de arquivo

export const download = (videoID) =>
    new Promise((resolve, reject) => {
        // retorna uma promise que devolve uma reposta se terminou ou rejeitou caso der erro
        const videoURL = "https://www.youtube.com/shorts/" + videoID;
        ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
            .on("info", (info) => {
                const seconds = info.formats[0].approxDurationMs / 1000;
                if (seconds > 60) {
                    console.log(
                        "A duração desse video é maior que 60 segundos"
                    );
                }
            })
            .on("end", () => {
                console.log("Download realizado");
                resolve();
            })
            .on("error", (error) => {
                console.log(
                    "download não foi possivel por causa desse erro: " + error
                );
                reject(error);
            })
            .pipe(fs.createWriteStream("./tmp/audio.mp4"));
    });
