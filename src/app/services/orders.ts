import { WsClient } from '@/lib/web-socket-client';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from './auth';

export interface ServiceOrder {
  id: number;
  description: string;
  date: Date
  userId: number
  index: number
  status: 'pending' | 'in_progress' | 'done'
  type: "scheduled" | "corrective"
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService
  ) { }


  private socketClient!: WsClient

  onCreated(cb: (order: ServiceOrder) => void) {
    this.socketClient.on('created', cb)
  }
  onUpdated(cb: (order: ServiceOrder) => void) {
    this.socketClient.on('updated', cb)
  }

  getAll() {
    return this.httpClient.get<ServiceOrder[]>('/service-order')
  }

  startRealtime() {
    return this.authService.generateWebSocketTicket().pipe(
      switchMap(({ ticket }) => {
        this.socketClient = new WsClient('ws://localhost:3000/service-order/realtime/' + ticket)
        return new Observable<ServiceOrder[]>(observer => {
          this.socketClient.on('connected', (orders: ServiceOrder[]) => {
            observer.next(orders)
            observer.complete()
          })
        })
      })
    )
  }

  async updateKanbanPosition(data: {
    id: number
    previousIndex?: number
    postIndex?: number
    status: ServiceOrder['status']
  }): Promise<ServiceOrder> {
    return await new Promise<ServiceOrder>((resolve, reject) => {
      try {
        this.socketClient.emit('updateKanbanPosition', data)
        this.socketClient.on('updateKanbanPositionReturn', (updatedOrder: ServiceOrder) => {
          resolve(updatedOrder)
          console.log('resolve')
        })
      } catch (err) {
        reject(err)
      }
    })
  }


}
