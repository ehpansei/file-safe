import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private _term = new Subject<string>();

  public emit(term: string): void {
    this._term.next(term);
  }

  public getTerm(): Observable<string> {
    return this._term.asObservable();
  }
}
