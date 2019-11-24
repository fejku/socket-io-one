import express, { Application } from "express";
import { createServer, Server } from "http";
import socketIo, {Socket} from "socket.io";

import { KiK } from "./kik/kik";
import { IUzytkownik, Uzytkownik } from "./uzytkownik";

export class KapkiServer {
  private static readonly PORT: number = 3001;
  private app: Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;

  private uzytkownicy: IUzytkownik[];

  constructor() {
    this.app = express();
    this.port = process.env.PORT || KapkiServer.PORT;
    this.server = createServer(this.app);
    this.io = socketIo(this.server);
    this.listen();

    this.uzytkownicy = [];
  }

  public getApp(): Application {
    return this.app;
  }

  private listen() {
    this.server.listen(this.port, () => {
      console.log("Running server on port %s", this.port);
    });

    this.io.of("/users").on("connect", (socket: Socket) => {
      console.log("/users connected: ", socket.id);
      // this.uzytkownicy.push(new Uzytkownik(socket.id, ))

      socket.on("init", (uuid: string) => {
        const uzytkownik = this.uzytkownicy.find((u) => u.id === uuid);
        if (uzytkownik) {
          uzytkownik.socketId = socket.id;
        } else {
          this.uzytkownicy.push(new Uzytkownik(uuid, socket.id));
        }
      });

      socket.on("disconnect", () => {
        console.log(`/users  ${socket.id} disconnected`);
      });      
    });

    // const kik = new KiK(this.io);
    // kik.addNamespace();
  }
}
