import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { OpenModalConfirmService } from '../../services/open-modal-confirm.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  readonly router = inject(Router);
  readonly fb = inject(FormBuilder);
  readonly openModalConfirmService = inject(OpenModalConfirmService);
  private authService = inject(AuthService);
  private sessionStorage = sessionStorage;

  incorrectPassword: boolean = false;
  usernameFocused: boolean = false;
  passwordFocused: boolean = false;
  showPassword: boolean = false;
  isLogin: boolean = true;
  signIn: boolean = false;

  isChangePassword: boolean = false;

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  signInForm: FormGroup = this.fb.group({
    socialReason: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit() {

  }

  submitLoginForm(): void {
    this.incorrectPassword = false;
    if (this.loginForm.valid) {
      const body = {
        login: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value
      }
      this.authService.loginPost(body).subscribe({
        next: (res: any) => {
          this.sessionStorage.setItem('nome', res.user.nome);
          this.sessionStorage.setItem('login', res.user.login);
          this.sessionStorage.setItem('token', res.token);
          this.sessionStorage.setItem('id', res.user.id_empresa);
          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => {
          this.incorrectPassword = true;
          this.loginForm.markAllAsTouched();
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  submitSignInForm(): void {
    this.incorrectPassword = false;
    if (this.signInForm.valid) {
      const body = {
        nome: this.signInForm.get('socialReason')?.value,
        login: this.loginForm.get('username')?.value,
        senha: this.loginForm.get('password')?.value
      }
      this.authService.newRegisterPost(body).subscribe({
        next: (res: any) => {
          this.signInForm.reset();
          this.signIn = false;
          this.isLogin = true;
          this.openModalConfirmService.openModalConfirm({
            text: 'Cadastro realizado com sucesso!',
            subText: 'Agora você já pode fazer login na plataforma.',
            type: 'success',
            hideCancelButton: true,
          });
        },
        error: (error: any) => {
          this.loginForm.markAllAsTouched();
           this.openModalConfirmService.openModalConfirm({
            text: 'Erro ao realizar cadastro!',
            subText: 'Revise os dados e tente novamente mais tarde.',
            type: 'error',
            hideCancelButton: true,
          });
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmNewPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onFocus(input: string) {
    if (input === 'username') {
      this.usernameFocused = true;
      this.onBlur('password');
    } else if (input === 'password') {
      this.passwordFocused = true;
    }
  }

  onBlur(input: string) {
    if (input === 'username') {
      this.usernameFocused = false;
    } else if (input === 'password') {
      this.passwordFocused = false;
    }
  }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value || '';
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const isValid =
      value.length >= 8 &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar;

    return isValid ? null : { passwordStrength: true };
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleShowSignIn(): void {
    this.signIn = !this.signIn;
    this.isChangePassword = false;
    this.isLogin = false;
  }

  handleInitialLoginPage(): void {
    this.isChangePassword = false;
    this.signIn = false;
    this.isLogin = true;
  }
}
