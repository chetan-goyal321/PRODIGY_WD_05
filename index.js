


import fs from "fs";
import http from "http";
import https from "https"; // Import the https module for making HTTPS requests

console.log("chetan");

const mainfile = fs.readFileSync("index.html", "utf8");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    const reqToApi = https.request("https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=c9e64781aedffdbc536a9afbf580417f", (response) => {
      let responseData = '';

      response.on("data", (chunk) => {
        responseData += chunk;
      });

      response.on("end", () => {
        const object = JSON.parse(responseData);
        const arrdata = [object];
        console.log((arrdata[0].main.temp - 273.15).toFixed(1)+"°C");
        //res.write(JSON.stringify(arrdata));
let realtime=mainfile.replace(`%temprature%`,((arrdata[0].main.temp - 273.15).toFixed(1)+`°C`))
    .replace(`%city%`,arrdata[0].name)

//console.log(realtime);
 //res.write(realtime,"utf8")
// res.end()
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(realtime);

        res.end();
      });
    });
    

    reqToApi.on("error", (error) => {
      console.error(error);
      res.end("An error occurred");
    });

    reqToApi.end();
  }
});

server.listen(3078, "127.0.0.1", () => {
  console.log("Server is listening on por3000");
});

