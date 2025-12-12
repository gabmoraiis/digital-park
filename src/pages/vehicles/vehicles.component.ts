import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TableListComponent } from '../../components/table-list/table-list.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

import { HttpClientModule } from '@angular/common/http';
import { AddVehiclesComponent } from './add-vehicle/add-vehicles.component';
import { VeiculosService } from '../../services/veiculos.service';
import { OpenModalConfirmService } from '../../services/open-modal-confirm.service';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [
    TableListComponent,
    CommonModule,
    SpinnerComponent,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [VeiculosService],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent implements OnInit {
  displayedColumns: string[] = [];
  private openModalConfirmService = inject(OpenModalConfirmService);
  legends: Array<{ value: string; name: string; view: boolean; checkbox: boolean; quantity1: boolean; quantity2: boolean; date: boolean }> = [
    {
      value: 'placa',
      name: 'Placa',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
    {
      value: 'modelo',
      name: 'Modelo',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
    {
      value: 'cor',
      name: 'Cor',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
    {
      value: 'nome_cliente',
      name: 'Nome do Cliente',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    }
  ];
  isLoading: boolean = false;
  formFilter!: FormGroup;
  vehiclesList: any[] = [];

  constructor(
    protected dialog: MatDialog,
    private snackBar: MatSnackBar,
    private veiculosService: VeiculosService,
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['placa', 'modelo', 'cor', 'nome_cliente'];
    this.veiculosService.listarVeiculos().subscribe({
      next: (res: any[]) => {
        this.vehiclesList = res;
      }, error: (error: any) => {
        this.isLoading = false;
        this.openModalConfirmService.openModalConfirm({
          text: 'Erro ao carregar as vagas. Tente novamente mais tarde.',
          hideCancelButton: true,
          type: 'error'
        });
      }, complete: () => {
        this.isLoading = false;
      }
    });
  }

  handleDeleteClick(event: any): void {
    this.isLoading = true;
    this.veiculosService.excluirVeiculo(Number(event.id)).subscribe((item: any) => {
      this.openModalConfirmService.openModalConfirm({
        text: 'Registro de veículo deletado com sucesso!',
        hideCancelButton: true,
        type: 'success'
      });
      this.isLoading = false;
      window.location.reload();
    }, (error) => {
      this.isLoading = false;
      this.openModalConfirmService.openModalConfirm({
        text: 'Erro ao tentar deletar veículo. Tente novamente mais tarde.',
        hideCancelButton: true,
        type: 'error'
      });
      this.isLoading = false;
    })
  }

  newVehicle(): void {
    this.dialog.open(AddVehiclesComponent, {
      data: {
        title: 'Novo Veículo'
      }
    }).afterClosed().subscribe(() => {
      window.location.reload();
    });
  }

  editVehicle(event: any): void {
    event.actionType = 'edit';
    this.dialog.open(AddVehiclesComponent, {
      data: {
        title: 'Editar Veículo',
        event: event
      } 
    }).afterClosed().subscribe(() => {
      window.location.reload();
    });
  }
}
