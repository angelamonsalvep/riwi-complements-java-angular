import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShipmentsService {
  private readonly API_URL = 'http://localhost:3000/shipments';

  constructor(private http: HttpClient) {}

  getShipments(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }
}
