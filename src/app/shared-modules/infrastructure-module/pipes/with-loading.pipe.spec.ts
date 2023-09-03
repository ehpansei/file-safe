import { of } from 'rxjs';
import { WithLoadingPipe } from './with-loading.pipe';

describe('WithLoadingPipe', () => {
  it('should do something', () => {
    const pipe = new WithLoadingPipe();
    return pipe
      .transform(of(true))
      .toPromise()
      .then((resp) => expect(resp).toEqual({ loading: false }))
      .catch((resp) => {
        expect(resp).toEqual({ loading: false });
      });
  });
});
