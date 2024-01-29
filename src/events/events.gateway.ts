import { OnApplicationShutdown } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ["GET", "POST"],
    credentials: true
  },
  namespace: '/api/v1/ws',
  path: '/ws/socket.io',
})
export class EventsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnApplicationShutdown
{
  onApplicationShutdown(signal?: string) {
    throw new Error('Method not implemented....');
  }
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    console.log(data);
    return data;
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    console.log('id: ', data);

    return data;
  }

  handleConnection(client: Socket) {
    // Handle a client connectioon
    console.log('Client connected: ');
  }

  handleDisconnect(client: Socket) {
    // Handle a client disconnection
    console.log('Disconnect Client: ');
  }

  // Custom method to emit events
  emitEvent(event: string, data: any) {
    this.server.emit(event, data);
  }
}
