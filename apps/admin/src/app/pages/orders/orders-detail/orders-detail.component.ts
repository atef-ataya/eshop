import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrderItem, OrdersService } from '@bluebits/orders';
import { Product } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';

@Component({
    selector: 'admin-orders-detail',
    templateUrl: './orders-detail.component.html',
    styles: []
})
export class OrdersDetailComponent implements OnInit {
    order: Order = {};
    orderStatuses: { id: string; name: string }[] | any;
    selectedStatus: any;
    items: OrderItem[] | undefined;
    
    constructor(
        private orderService: OrdersService,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this._mapOrderStatus();
        this._getOrder();
    }

    private _mapOrderStatus() {
        this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
            return {
                id: key,
                name: (ORDER_STATUS as { [key: string]: any })[key].label
            };
        });
    }

    private _getOrder() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.orderService.getOrder(params.id).subscribe((order) => {
                    this.order = order;
                    this.items = order.orderItems as [{ product?: Product; quantity?: number }];
                    this.selectedStatus = order.status;
                });
            }
        });
    }

    onStatusChange(event: any) {
        this.orderService.updateOrder({ status: event.value }, this.order.id as string).subscribe(
            () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Order is Updated!'
                });
            },
            () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Order is not Updated!'
                });
            }
        );
    }
}
