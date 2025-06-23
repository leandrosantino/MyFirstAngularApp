import { ServiceOrder } from '@/app/services/orders';
import { Component, Input } from '@angular/core';
import { twMerge } from 'tailwind-merge';
import { HlmBadgeDirective } from '../ui/ui-badge-helm/src';

@Component({
  selector: 'app-order-card',
  imports: [HlmBadgeDirective],
  templateUrl: './order-card.html',
})
export class OrderCard {

  @Input() data!: ServiceOrder

  cn = twMerge

}
