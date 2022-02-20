import { Pipe, PipeTransform } from '@angular/core';
import { catchError, map, startWith } from 'rxjs/operators';
import { isObservable, Observable, of } from 'rxjs';

@Pipe({
  name: 'withLoading'
})
export class WithLoadingPipe implements PipeTransform {
  transform(val: Observable<any>) {
    return isObservable(val)
      ? val.pipe(
          map((value: any) => ({ ...value, loading: false })),
          startWith({ loading: true }),
          catchError((error) => of({ loading: false, error }))
        )
      : val;
  }
}
