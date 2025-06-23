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

  constructor() { }
}
