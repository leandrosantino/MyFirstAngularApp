import { ServiceOrder } from '@/app/services/orders';
import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BrnDialogContentDirective, BrnDialogTriggerDirective } from '@spartan-ng/brain/dialog';
import { twMerge } from 'tailwind-merge';
import { HlmBadgeDirective } from '../ui/ui-badge-helm/src';
import { HlmDialogComponent, HlmDialogContentComponent, HlmDialogDescriptionDirective, HlmDialogFooterComponent, HlmDialogHeaderComponent, HlmDialogTitleDirective } from '../ui/ui-dialog-helm/src';

@Component({
  selector: 'app-order-card',
  imports: [
    HlmBadgeDirective,
    DatePipe,
    BrnDialogTriggerDirective,
    BrnDialogContentDirective,

    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
  ],
  templateUrl: './order-card.html',
  styles: [':host { display: contents }']
})
export class OrderCard {

  @Input() data!: ServiceOrder

  cn = twMerge

}
