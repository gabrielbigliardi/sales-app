import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Supplier } from './suppliers/supplier.dto';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(environment.api + 'suppliers')
  }

  public getById(id: Number): Observable<Supplier> {
    return this.http.get<Supplier>(environment.api + 'suppliers/' + id)
  }
}
