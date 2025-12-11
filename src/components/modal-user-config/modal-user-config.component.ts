import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CompanyService } from '../../services/company.service';
import { OpenModalConfirmService } from '../../services/open-modal-confirm.service';

@Component({
  selector: 'app-modal-user-config',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SpinnerComponent,
    HttpClientModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()],
  templateUrl: './modal-user-config.component.html',
  styleUrl: './modal-user-config.component.scss'
})
export class ModalUserConfigComponent {
  private sessionStorage = sessionStorage;
  private companyService = inject(CompanyService);
  private fb = inject(FormBuilder);
  readonly openModalConfirmService = inject(OpenModalConfirmService);
  protected dialog = inject(MatDialog);
  public data = inject(MAT_DIALOG_DATA);

  id: string = '';
  maxDate: any;
  isLoading: boolean = false;
  body?: any;
  coursesList: any[] = []
  formEnterprise = this.fb.group({
    socialReason: [{ value: '', disabled: true }, Validators.required],
    cnpj: [{ value: '', disabled: true }, Validators.required],
    address: ['', Validators.required],
    vacanciesNumber: ['', Validators.required],
    hourValue: ['', Validators.required],
    phoneNumber: ['', Validators.required]
  });

  ngOnInit(): void {
    this.id = this.sessionStorage.getItem('id')!;
    this.companyService.listarEmpresas(this.id).subscribe({
      next: (res: any) => {
        this.formEnterprise.patchValue({
          socialReason: res.nome,
          cnpj: res.cnpj,
          address: res.endereco,
          vacanciesNumber: res.numero_vagas,
          hourValue: res.valor_hora,
          phoneNumber: res.telefone
        });
      }
    })
  }

  handleClickBack() {
    this.dialog.closeAll();
  }

  submitForm(): void {
    if (this.formEnterprise.valid) {
      this.body = {
        cnpj: this.formEnterprise.get('cnpj')?.value,
        nome: this.formEnterprise.get('socialReason')?.value,
        endereco: this.formEnterprise.get('address')?.value,
        telefone: this.formEnterprise.get('phoneNumber')?.value,
        numero_vagas: this.formEnterprise.get('vacanciesNumber')?.value,
        valor_hora: this.formEnterprise.get('hourValue')?.value
      }
      this.isLoading = true;
      this.companyService.editarEmpresa(this.id, this.body).subscribe({
        next: (res: any) => {
          this.isLoading = false;
          this.openModalConfirmService.openModalConfirm({
            text: 'Dados da empresa atualizados com sucesso!',
            type: 'success',
            hideCancelButton: true,
          });
          this.dialog.closeAll();
        },
        error: (error: any) => {
          this.openModalConfirmService.openModalConfirm({
            text: 'Erro ao tentar atualizar os dados da empresa.',
            subText: 'Revise os dados e tente novamente mais tarde.',
            type: 'error',
            hideCancelButton: true,
          });
        }
      });
    } else {
      this.formEnterprise.markAllAsTouched();
    }
  }

  getActualDate(inputType: string): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    if (inputType === 'date') {
      return this.maxDate = `${year}-${month}-${day}`;
    } else {
      return this.maxDate = `${year}-${month}`;
    }
  }
}
