import { ServiceOrder } from '@/app/services/orders';
import { Component, Input } from '@angular/core';
import { twMerge } from 'tailwind-merge';
import { HlmBadgeDirective } from '../ui/ui-badge-helm/src';

@Component({
  selector: 'app-order-card',
  imports: [HlmBadgeDirective],
  templateUrl: './order-card.html',
  styles: [':host { display: contents }']
})
export class OrderCard {

  @Input() data!: ServiceOrder

  cn = twMerge

}
