import { BackendErrorsinterface } from 'src/app/shared/types/backendErrors.interface';
import { CurrentUserInterface } from '../../types/currentUser.interface';

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUser: CurrentUserInterface | null;
  isLoggedIn: boolean | null;
  validationErrors: BackendErrorsinterface | null;
}
