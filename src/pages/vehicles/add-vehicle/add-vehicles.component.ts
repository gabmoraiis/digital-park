import { Veículos } from '../../../interface/veículos';
import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { VeiculosService } from '../../../services/veiculos.service';
import { OpenModalConfirmService } from '../../../services/open-modal-confirm.service';

@Component({
  selector: 'app-add-vehicles',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SpinnerComponent,
    HttpClientModule,
    NgxMaskDirective
  ],
  providers: [VeiculosService, provideNgxMask()],
  templateUrl: './add-vehicles.component.html',
  styleUrl: './add-vehicles.component.scss'
})
export class AddVehiclesComponent {
  private openModalConfirmService = inject(OpenModalConfirmService);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    protected dialog: MatDialog,
    private veiculosService: VeiculosService,
  ) { }

  maxDate: any;
  isLoading: boolean = false;
  body?: Veículos;
  formVehicle = this.fb.group({
    plate: ['', Validators.required],
    model: ['', Validators.required],
    color: ['', Validators.required],
    clientName: ['', Validators.required],
  });

  ngOnInit(): void {
    if (this.data.title == 'Editar Veículo') {
      this.formVehicle.get('plate')?.setValue(this.data.event.placa);
      this.formVehicle.get('model')?.setValue(this.data.event.modelo);
      this.formVehicle.get('color')?.setValue(this.data.event.cor);
      this.formVehicle.get('clientName')?.setValue(this.data.event.nome_cliente);
    }
  }

  handleClickBack() {
    this.dialog.closeAll();
  }

  submitForm(): void {
    if (this.data.title === 'Cadastrar Veículo') {
      if (this.formVehicle.valid) {
        this.body = {
          placa: this.formVehicle.get('plate')?.value!,
          modelo: this.formVehicle.get('model')?.value!,
          cor: this.formVehicle.get('color')?.value!,
          nome_cliente: this.formVehicle.get('clientName')?.value!
        }
        this.isLoading = true;
        this.veiculosService.cadastrarVeiculo(this.body!).subscribe((response: any) => {
          this.isLoading = false;
          this.openModalConfirmService.openModalConfirm({
            text: 'Veiculo salvo com sucesso!',
            hideCancelButton: true,
            type: 'success'
          });
          this.dialog.closeAll();
        }, (error) => {
          if (error.status == 400) {
            this.openModalConfirmService.openModalConfirm({
              text: 'Veiculo já cadastrado.',
              hideCancelButton: true,
              type: 'warning'
            });
          } else {
            this.openModalConfirmService.openModalConfirm({
              text: 'Erro ao salvar veiculo, tente novamente mais tarde.',
              hideCancelButton: true,
              type: 'error'
            });
          }
          this.isLoading = false;
        }, () => {
          this.isLoading = false;
          window.location.reload();
        });
      }

    } else if (this.data.title === 'Editar Veículo') {
      if (this.formVehicle.valid) {
        this.body = {
          placa: this.formVehicle.get('plate')?.value!,
          modelo: this.formVehicle.get('model')?.value!,
          cor: this.formVehicle.get('color')?.value!,
          nome_cliente: this.formVehicle.get('clientName')?.value!
        }
        this.isLoading = true;
        this.veiculosService.editarVeiculo(this.data.event.id, this.body!).subscribe((response: any) => {
          this.isLoading = false;
          this.openModalConfirmService.openModalConfirm({
            text: 'Veículo editado com sucesso!',
            hideCancelButton: true,
            type: 'success'
          });
          this.dialog.closeAll();
        }, (error) => {
          this.openModalConfirmService.openModalConfirm({
            text: 'Erro ao editar veículo, tente novamente mais tarde.',
            hideCancelButton: true,
            type: 'error'
          });
          this.isLoading = false;
        }, () => {
          this.isLoading = false;
          window.location.reload();
        })
      } else {
        this.formVehicle.markAllAsTouched();
      }
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
