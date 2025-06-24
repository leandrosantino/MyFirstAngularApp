import { OrderCard } from '@/app/components/order-card/order-card';
import { ServiceOrder } from '@/app/services/orders';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { twMerge } from 'tailwind-merge';

type Column = {
  id: string
  title: string
  orders: ServiceOrder[]
}

@Component({
  selector: 'app-service-orders',
  imports: [OrderCard, CdkDropList, CdkDropListGroup, CdkDrag],
  templateUrl: './service-orders.html',
  styles: [':host { display: contents }']
})
export class ServiceOrders {

  readonly frames: Column[] = [{
    id: "pending", title: "Pendente", orders: new Array(3).fill({
      date: new Date(),
      description: 'Teste',
      id: 1,
      index: 0,
      status: 'pending',
      type: 'scheduled',
      userId: 1
    })
  },
  {
    id: "in_progress", title: "Em Andamento", orders: [
      {
        date: new Date(),
        description: 'sdsdf8s4dgfsdfg',
        id: 2,
        index: 4,
        status: 'in_progress',
        type: 'corrective',
        userId: 1
      },
      {
        date: new Date(),
        description: 'Teste',
        id: 1,
        index: 0,
        status: 'in_progress',
        type: 'corrective',
        userId: 1
      }
    ]
  },
  {
    id: "done", title: "Concluído", orders: new Array(4).fill({
      date: new Date(),
      description: 'Teste',
      id: 1,
      index: 0,
      status: 'done',
      type: 'scheduled',
      userId: 1
    }),
  },
  ]

  cn = twMerge


  drop(event: CdkDragDrop<ServiceOrder[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
