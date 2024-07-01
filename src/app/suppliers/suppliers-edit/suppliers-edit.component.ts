import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SupplierService } from '../supplier.service';
import { Supplier } from '../suppliers/supplier.dto';
import { Observable, lastValueFrom } from 'rxjs';
import { LoadingBarComponent } from '../../loading-bar.component';
import { MaterialModule } from '../../material.module';
import { AsyncPipe } from '@angular/common';
import { SuppliersFormComponent } from '../suppliers-form/suppliers-form.component';

@Component({
  selector: 'app-suppliers-edit',
  standalone: true,
  imports: [LoadingBarComponent, MaterialModule, AsyncPipe, RouterLink, SuppliersFormComponent],
  templateUrl: './suppliers-edit.component.html',
  styles: ``
})
export class SuppliersEditComponent implements OnInit {
  route = inject(ActivatedRoute)
  supplierService = inject(SupplierService)
  supplier: Supplier
  supplierObservable: Observable<Supplier>

  constructor(private router: Router) { }


  async ngOnInit() {
    const id: Number = +(this.route.snapshot.paramMap.get('id') || 0)
    this.supplierObservable = this.supplierService.getById(id)
    this.supplier = await lastValueFrom(this.supplierObservable)
    console.log(this.supplier)
  }



  async onSave(supplier: Supplier) {
    this.supplierObservable = this.supplierService.save(supplier);
    this.supplier = await lastValueFrom(this.supplierObservable);
    this.router.navigate(['/suppliers/show/', supplier?.id]);
  }
  onBack() {
    this.router.navigate(['/suppliers']);
  }




  // async ngOnInit() {
  //   const id: Number = +(this.route.snapshot.paramMap.get('id') || 0)
  //   this.supplierObservable = this.supplierService.getById(id)
  //   this.supplier = await lastValueFrom(this.supplierObservable)
  //   console.log(this.supplier)
  // }

  // async onSave(supplier: Supplier) {
  //   this.supplierObservable = this.supplierService.save(supplier);
  //   this.supplier = await lastValueFrom(this.supplierObservable);
  //   this.router.navigate(['/suppliers/show', supplier?.id])
  //   // this.router.navigate(['/suppliers/show/',supplier?.id]);
  // }
  // onBack() {
  //   this.router.navigate(['/suppliers']);
  // }

}
