import { Veículos } from '../../../interface/veículos';
import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { VeiculosService } from '../../../services/veiculos.service';

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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    protected dialog: MatDialog,
    private veiculosService: VeiculosService,
    private snackBar: MatSnackBar,
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
    if(this.data.actionType) {
      this.formVehicle.get('plate')?.setValue(this.data.placa);
      this.formVehicle.get('model')?.setValue(this.data.model);
      this.formVehicle.get('color')?.setValue(this.data.color);
      this.formVehicle.get('clientName')?.setValue(this.data.clientName);
    }

    if (this.data.title === 'Editar Veículo') {
      this.isLoading = true;
      this.veiculosService.listarVeiculos().subscribe((response: any) => {
      }, (error) => {
        if (error.status == 400) {
          this.snackBar.open('Veículo(a) já cadastrado.')
        } else {
          this.snackBar.open('Erro ao salvar veículo(a), tente novamente mais tarde.')
        }
        this.isLoading = false;
      });
    }
  }

  handleClickBack() {
    this.dialog.closeAll();
  }

  submitForm(): void {
    if (this.data.title === 'Novo Veículo') {
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
          this.snackBar.open('Veiculo salvo com sucesso!');
          this.dialog.closeAll();
        }, (error) => {
          if (error.status == 400) {
            this.snackBar.open('Veiculo já cadastrado.')
          } else {
            this.snackBar.open('Erro ao salvar veiculo, tente novamente mais tarde.')
          }
          this.isLoading = false;
        }, () => {
          this.isLoading = false;
          window.location.reload();
        })
      } else {
        this.formVehicle.markAllAsTouched();
      }
    } else if (this.data.title === 'Editar Aluno') {
      if (this.formVehicle.valid) {
        this.body = {
          placa: this.formVehicle.get('plate')?.value!,
          modelo: this.formVehicle.get('model')?.value!,
          cor: this.formVehicle.get('color')?.value!,
          nome_cliente: this.formVehicle.get('clientName')?.value!
        }
        this.isLoading = true;
        this.veiculosService.editarVeiculo(this.data.id, this.body!).subscribe((response: any) => {
          this.isLoading = false;
          this.snackBar.open('Veículo editado com sucesso!');
          this.dialog.closeAll();
        }, (error) => {
          this.snackBar.open('Erro ao editar veículo, tente novamente mais tarde.')
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

  openSnackBar(content: string): void {
    this.snackBar.open(content, 'Fechar', {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
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
