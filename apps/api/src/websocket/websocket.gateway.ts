import { Injectable, Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: {
    origin: process.env.NEXTAUTH_URL,
    credentials: true,
  },
  namespace: '/',
})
@Injectable()
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(WebsocketGateway.name);

  @WebSocketServer()
  server: Server;

  constructor(private readonly jwt: JwtService) {}

  async handleConnection(client: Socket): Promise<void> {
    const token = client.handshake.auth?.token;
    if (!token) {
      this.logger.warn(`Rejected unauthed socket ${client.id}`);
      client.disconnect();
      return;
    }

    try {
      const payload = await this.jwt.verifyAsync(token);
      client.data.userId = payload.sub;
      client.join(`user:${payload.sub}`);
      this.logger.log(`Socket connected: ${client.id} (user ${payload.sub})`);
    } catch (err) {
      this.logger.warn(`JWT verify failed for socket ${client.id}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Socket disconnected: ${client.id}`);
  }

  emit(event: string, data: unknown): void {
    this.server.emit(event, data);
  }

  emitToUser(userId: string, event: string, data: unknown): void {
    this.server.to(`user:${userId}`).emit(event, data);
  }
}