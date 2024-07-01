import { Component, OnInit, inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AsyncPipe } from '@angular/common';
import { LoadingBarComponent } from '../../loading-bar.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Supplier } from '../suppliers/supplier.dto';
import { Observable, lastValueFrom } from 'rxjs';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-suppliers-show',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, LoadingBarComponent, RouterLink],
  templateUrl: './suppliers-show.component.html',
  styles: ``
})
export class SuppliersShowComponent implements OnInit {
  route = inject(ActivatedRoute)
  supplierService = inject(SupplierService)
  supplier: Supplier
  supplierObservable: Observable<Supplier>

  async ngOnInit() {
    const id: Number = +(this.route.snapshot.paramMap.get('id') || 0)
    this.supplierObservable = this.supplierService.getById(id)
    this.supplier = await lastValueFrom(this.supplierObservable)
    console.log(this.supplier);

  }
}
