import {inject, Injectable} from "@angular/core";
import {HttpService} from "@app/services/http/http.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HttpProductService {
  private readonly httpService = inject(HttpService);

  constructor() { }

  verifyIdExitsProduct(id: string): Observable<boolean> {
    return this.httpService.get<boolean>(`products/verification/${id}`)
        .pipe(
            map(() => true)
        );
  }
}
