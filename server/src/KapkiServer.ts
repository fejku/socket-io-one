import express, { Application } from "express";
import { createServer, Server } from "http";
import socketIo, {Socket} from "socket.io";

import { KiKSocket } from "./kik/KiKSocket";
import { IUzytkownik, Uzytkownik } from "./uzytkownicy/model/Uzytkownik";
import { UzytkownikSocket } from "./uzytkownicy/UzytkownikSocket";

export class KapkiServer {
  private static readonly PORT: number = 3001;
  private app: Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || KapkiServer.PORT;
    this.server = createServer(this.app);
    this.io = socketIo(this.server);
    this.listen();
  }

  public getApp(): Application {
    return this.app;
  }

  private listen() {
    this.server.listen(this.port, () => {
      console.log("Running server on port %s", this.port);
    });

    const uzytkownikSocket = new UzytkownikSocket(this.io);
    uzytkownikSocket.dodajNamespace();

    // const kikSocket = new KiKSocket(this.io);
    // kikSocket.addNamespace();
  }
}
