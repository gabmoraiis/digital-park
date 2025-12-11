import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CompanyService } from '../../services/company.service';
import { OpenModalConfirmService } from '../../services/open-modal-confirm.service';
import { VeiculosService } from '../../services/veiculos.service';

@Component({
  selector: 'app-modal-select-car',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule,
    SpinnerComponent,
    HttpClientModule
  ],
  providers: [provideNgxMask()],
  templateUrl: './modal-select-car.component.html',
  styleUrl: './modal-select-car.component.scss'
})
export class ModalSelectCarComponent {

  private sessionStorage = sessionStorage;
  private companyService = inject(CompanyService);
  private veiculosService = inject(VeiculosService);
  private fb = inject(FormBuilder);
  readonly openModalConfirmService = inject(OpenModalConfirmService);
  protected dialog = inject(MatDialog);
  public data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef);

  id: string = '';
  maxDate: any;
  isLoading: boolean = false;
  body?: any;
  coursesList: any[] = []
  options: any[] = []
  formEnterprise = this.fb.group({
    car: ['', Validators.required],
  });

  ngOnInit(): void {
    this.id = this.sessionStorage.getItem('id')!;
    this.isLoading = true;
    this.veiculosService.listarVeiculos().subscribe({
      next: (res: any) => {
        res.map((item: any) => {
          this.options.push({name: `${item.modelo} - ${item.cor} - ${item.placa}`, value: item.placa})
        });
        this.isLoading = false;
      }, error: (error: any) => {
        this.openModalConfirmService.openModalConfirm({
          text: 'Erro ao tentar carregar os veículos.',
          subText: 'Tente novamente mais tarde.',
          type: 'error',
          hideCancelButton: true,
        });
        this.isLoading = false;
      }
    })
  }

  handleClickBack() {
    this.dialog.closeAll();
  }

  submitForm(): void {
    if (this.formEnterprise.valid) {
      const selectedCar = this.formEnterprise.get('car')?.value;
      this.dialogRef.close(selectedCar);
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
