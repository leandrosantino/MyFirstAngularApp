import { OrderCard } from '@/app/components/order-card/order-card';
import { OrdersService, ServiceOrder } from '@/app/services/orders';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

type Frame = {
  title: string
  orders: ServiceOrder[]
}

@Component({
  selector: 'app-service-orders',
  imports: [OrderCard, CdkDropList, CdkDropListGroup, CdkDrag],
  templateUrl: './service-orders.html',
  styles: [':host { display: contents }']
})
export class ServiceOrders implements OnInit {

  readonly framesMap = new Map<string, Frame>([
    ['pending', { title: 'Pendente', orders: [] }],
    ['in_progress', { title: 'Em Andamento', orders: [] }],
    ['done', { title: 'Concluído', orders: [] }]
  ])

  constructor(
    private readonly ordersService: OrdersService
  ) { }

  async ngOnInit() {
    this.loadServiceOrders()
    this.ordersService.startRealtime().subscribe(() => {
      this.ordersService.onCreated(data => this.onCreated(data))
      this.ordersService.onUpdated(() => { this.loadServiceOrders() })
    })
  }

  onCreated(serviceOrder: ServiceOrder) {
    this.framesMap.get(serviceOrder.status)?.orders.push(serviceOrder)
  }

  loadServiceOrders() {
    this.framesMap.forEach((frame) => { frame.orders = [] })
    this.ordersService.getAll().subscribe(serviceOrders => {
      serviceOrders.forEach(item => {
        this.framesMap.get(item.status)?.orders.push(item)
      })
    })
  }

  private playSuccessSound() {
    const audio = new Audio('/success.mp3');
    audio.play();
  }

  async drop(event: CdkDragDrop<ServiceOrder[]>) {
    if (event.previousContainer === event.container) {
      await this.handleSameColumnMove(event)
      return
    }
    if (event.container.id == 'done') this.playSuccessSound()
    await this.handleCrossColumnMove(event)
  }

  private async handleSameColumnMove(event: CdkDragDrop<ServiceOrder[]>) {
    const fromList = this.framesMap.get(event.previousContainer.id)
    const movingOrder = fromList?.orders[event.previousIndex]
    if (!movingOrder || !fromList) return

    let previousIndex = 0
    let postIndex = 0
    if (event.previousIndex < event.currentIndex) {
      previousIndex = fromList.orders[event.currentIndex]?.index
      postIndex = fromList.orders[event.currentIndex + 1]?.index
    }
    if (event.previousIndex > event.currentIndex) {
      previousIndex = fromList.orders[event.currentIndex - 1]?.index
      postIndex = fromList.orders[event.currentIndex]?.index
    }
    const updated = await this.ordersService.updateKanbanPosition({
      id: movingOrder.id,
      previousIndex,
      postIndex,
      status: event.container.id as ServiceOrder['status']
    })
    movingOrder.index = updated.index
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

  }

  private async handleCrossColumnMove(event: CdkDragDrop<ServiceOrder[]>) {
    const movingOrder = this.framesMap.get(event.previousContainer.id)?.orders[event.previousIndex]
    if (!movingOrder) return

    const postIndex = this.framesMap.get(event.container.id)?.orders[event.currentIndex]?.index
    const previousIndex = this.framesMap.get(event.container.id)?.orders[event.currentIndex - 1]?.index
    const updated = await this.ordersService.updateKanbanPosition({
      id: movingOrder.id,
      previousIndex,
      postIndex,
      status: event.container.id as ServiceOrder['status']
    })
    movingOrder.index = updated.index
    movingOrder.status = event.container.id as ServiceOrder['status']
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }

}
