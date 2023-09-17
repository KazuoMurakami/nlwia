import fs from "fs"; // manipular arquivo
import wav from "node-wav"; // converter para o formato correto
import ffmpeg from "fluent-ffmpeg"; // manipular o audio
import ffmpegStatic from "ffmpeg-static"; // aponta para qual biblioteca será utilizada.

const filePath = "./tmp/audio.mp4";
const outputPath = filePath.replace(".mp4", ".wav"); // altera o modelo do audio para o modelo que é compativel

export const convert = () =>
    new Promise((resolve, reject) => {
        console.log("convertendo o video");

        ffmpeg.setFfmpegPath(ffmpegStatic);
        ffmpeg()
            .input(filePath)
            .audioFrequency(16000)
            .audioChannels(1)
            .format("wav")
            .on("end", () => {
                const file = fs.readFileSync(outputPath); // armazena o local do audio
                const fileDecoded = wav.decode(file); // decodica para o formato wav

                const audioData = fileDecoded.channelData[0]; // pega o canal que o audio está armazenado
                const floatArray = new Float32Array(audioData); // converter para o formato que a IA utiliza
                console.log("video convertido com sucesso");

                resolve(floatArray); // retorna o array

                fs.unlinkSync(outputPath); //deleta o arquivo da pasta
            })
            .on("error", (error) => {
                console.log("erro ao converter o video ");
                reject(error);
            })
            .save(outputPath);
    });
