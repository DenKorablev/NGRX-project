import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { CurrentUserInterface } from '../../../types/currentUser.interface';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { getCurrentUserAction, getCurrentUserFailureAction, getCurrentUserSuccessAction } from '../actions/getCurrentUser.action';
import { PersistanceService } from 'src/app/shared/service/persistance.service';


@Injectable()
export class GetCurrentUserEffect {
  getCurrentUser$ = createEffect(() => this.actions$.pipe(
    ofType(getCurrentUserAction),
    switchMap(() => {
      const token = this.persistanceService.get('accessToken');
      if (!token) return of(getCurrentUserFailureAction());
      return this.authService.getCurrentUser().pipe(
        map((currentUser: CurrentUserInterface) => {
          return getCurrentUserSuccessAction({ currentUser });
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(getCurrentUserFailureAction());
        })
      );
    })
  ));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService
  ) { }
}
