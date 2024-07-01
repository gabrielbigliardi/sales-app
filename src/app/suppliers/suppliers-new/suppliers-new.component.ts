import { Component, inject } from '@angular/core'
import { SuppliersFormComponent } from '../suppliers-form/suppliers-form.componen\
t'
import { MaterialModule } from '../../material.module'
import { Observable, lastValueFrom, of } from 'rxjs'
import { Router } from '@angular/router'
import { SupplierService } from '../supplier.service'
import { AsyncPipe } from '@angular/common'
import { LoadingBarComponent } from '../../loading-bar.component'
import { Supplier } from '../suppliers/supplier.dto'
@Component({
  selector: 'app-suppliers-new',
  standalone: true,
  imports: [
    MaterialModule,
    SuppliersFormComponent,
    AsyncPipe,
    LoadingBarComponent
  ],
  templateUrl: './suppliers-new.component.html',
  styles: ``
})
export class SuppliersNewComponent {
  router = inject(Router)
  supplierService = inject(SupplierService)
  supplierObservable!: Observable<Supplier>
  supplier: Supplier

  async ngOnInit() {
    this.supplierObservable = await of(this.supplierService.create())
    this.supplier = await lastValueFrom(this.supplierObservable)
  }
  async onSave(supplier: Supplier) {
    console.log('SALVANDO');

    this.supplierObservable = this.supplierService.save(supplier)
    const result = await lastValueFrom(this.supplierObservable)
    this.router.navigate(['/suppliers/show', result.id])
  }
  onBack() {
    this.router.navigate(['/suppliers']);
  }
}