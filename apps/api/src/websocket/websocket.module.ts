import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { WebsocketGateway } from './websocket.gateway';

@Global() // Damit andere Module ohne expliziten Import injizieren können
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret',
      signOptions: { expiresIn: '15m' },
    }) as any, // Workaround für Type-Check-Konflikt in Session 0
  ],
  providers: [WebsocketGateway],
  exports: [WebsocketGateway],
})
export class WebsocketModule {}
