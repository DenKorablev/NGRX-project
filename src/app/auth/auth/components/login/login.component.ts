import {Component, OnInit} from '@angular/core'
import {FormGroup, FormBuilder} from '@angular/forms'
import {Store, select} from '@ngrx/store'
import { loginAction } from '../../store/actions/login.action'
import {isSubmittingSelector, validationErrorsSelector} from '../../store/selectors'
import {Observable} from 'rxjs'
import { AuthService } from 'src/app/auth/services/auth.service'
import { LoginRequestInterface } from '../../types/loginRequest.interface'
import { BackendErrorsinterface } from 'src/app/shared/types/backendErrors.interface'

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsinterface>

  constructor(private fb: FormBuilder, private store: Store, private authService: AuthService) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: '',
      password: '',
    })
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  onSubmit(): void {
    const request: LoginRequestInterface = {
      user: this.form.value
    }
    this.store.dispatch(loginAction({request}));
  }
}
