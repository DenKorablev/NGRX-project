import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule, Routes} from '@angular/router'
import {ReactiveFormsModule} from '@angular/forms'

import {RegisterComponent} from './components/register/register.component'
import {LoginComponent} from './components/login/login.component'
import {AuthService} from '../services/auth.service'
import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'
import {reducers} from './store/reducers'
import {RegisterEffect} from './store/effects/register.effect'
import {LoginEffect} from './store/effects/login.effect'
import {HttpClientModule} from '@angular/common/http'
import {BackendErrorMessagesModule} from '../../shared/modules/backendErrorMessages.module'
import {PersistanceService} from '../../shared/service/persistance.service'

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
]

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([RegisterEffect, LoginEffect]),
    BackendErrorMessagesModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  providers: [AuthService, PersistanceService]
})
export class AuthModule {}
