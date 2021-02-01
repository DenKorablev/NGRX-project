import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule, Routes} from '@angular/router'
import {ReactiveFormsModule} from '@angular/forms'

import {RegisterComponent} from './components/register/register.component'
import {AuthService} from '../services/auth.service'
import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'
import {reducers} from './store/reducers'
import {RegisterEffect} from './store/effects/register.effect'
import {HttpClientModule} from '@angular/common/http'
import {BackendErrorMessagesModule} from '../../shared/modules/backendErrorsModule/backendErrorMessages.module'

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
]

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([RegisterEffect]),
    BackendErrorMessagesModule
  ],
  declarations: [RegisterComponent],
  providers: [AuthService]
})
export class AuthModule {}
