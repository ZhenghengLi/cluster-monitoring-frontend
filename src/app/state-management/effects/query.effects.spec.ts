import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { QueryEffects } from './query.effects';

describe('QueryEffects', () => {
  let actions$: Observable<any>;
  let effects: QueryEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QueryEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(QueryEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
