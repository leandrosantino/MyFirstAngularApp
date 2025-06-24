import { Injectable } from '@angular/core';

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

  serviceOrders: ServiceOrder[] = [
    {
      id: 1,
      description: 'Verificação de rotina do sistema elétrico',
      date: new Date('2025-06-01'),
      userId: 101,
      index: 0,
      status: 'pending',
      type: 'scheduled',
    },
    {
      id: 2,
      description: 'Correção de vazamento hidráulico no setor B',
      date: new Date('2025-06-03'),
      userId: 102,
      index: 1,
      status: 'in_progress',
      type: 'corrective',
    },
    {
      id: 3,
      description: 'Inspeção de segurança preventiva',
      date: new Date('2025-06-05'),
      userId: 103,
      index: 2,
      status: 'done',
      type: 'scheduled',
    },
    {
      id: 4,
      description: 'Reparo em sistema de climatização',
      date: new Date('2025-06-08'),
      userId: 104,
      index: 3,
      status: 'pending',
      type: 'corrective',
    },
    {
      id: 5,
      description: 'Limpeza programada dos dutos de ventilação',
      date: new Date('2025-06-10'),
      userId: 105,
      index: 4,
      status: 'in_progress',
      type: 'scheduled',
    },
    {
      id: 6,
      description: 'Substituição de equipamento danificado',
      date: new Date('2025-06-12'),
      userId: 106,
      index: 5,
      status: 'done',
      type: 'corrective',
    },
  ]

}
