import express, { Application } from 'express';
import socketIo from 'socket.io';
import { createServer, Server } from 'http';

import { KiK } from './kik/kik'

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

  private listen() {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });

    const kik = new KiK(this.io);
    kik.addNamespace();
  }

  public getApp(): Application {
    return this.app;
  }
}