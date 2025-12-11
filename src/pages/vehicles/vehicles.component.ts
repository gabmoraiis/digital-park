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
  vehiclesList: any[] = [
    { id: 1, plate: 'KDJ-4A72', type: '-', color: 'Vermelho', clientName: 'Rafael Azevedo', model: 'Honda Civic Preto', status: 'occupied', expanded: false, phoneNumber: '(11) 98241-6735' },
    { id: 2, plate: 'MTR-9F81', type: '-', color: 'Branco', clientName: 'Larissa Couto', model: 'Toyota Corolla Branco', status: 'occupied', expanded: false, phoneNumber: '(21) 99734-1208' },
    { id: 3, plate: 'PLQ-7C20', type: '-', color: 'Vermelho', clientName: 'Fernando Ribeiro', model: 'Volkswagen Polo Cinza', status: 'occupied', expanded: false, phoneNumber: '(31) 98922-4477' },
    { id: 4, plate: 'BXE-2H55', type: '-', color: 'Verde', clientName: 'Carolina Mendes', model: 'Fiat Argo Vermelho', status: 'occupied', expanded: false, phoneNumber: '(27) 99610-8823' },
    { id: 5, plate: 'ZQP-8K31', type: '-', color: 'Azul', clientName: 'João Carvalho', model: 'Chevrolet Onix Azul', status: 'occupied', expanded: false, phoneNumber: '(41) 98577-3341' },
    { id: 6, plate: 'GHS-3L92', type: '-', color: 'Prata', clientName: 'Marcos Pereira', model: 'Hyundai HB20 Preto', status: 'occupied', expanded: false, phoneNumber: '(62) 98144-2099' },
    { id: 7, plate: 'RTS-6M14', type: '-', color: 'Preto', clientName: 'Bianca Farias', model: 'Jeep Renegade Branco', status: 'occupied', expanded: false, phoneNumber: '(85) 98833-7610' },
    { id: 8, plate: 'WLV-0P87', type: '-', color: 'Preto', clientName: 'André Oliveira', model: 'Renault Kwid Laranja', status: 'occupied', expanded: false, phoneNumber: '(19) 98420-5566' },
    { id: 9, plate: 'FJB-5T43', type: '-', color: 'Rosa', clientName: 'Patrícia Gomes', model: 'Ford Ka Prata', status: 'occupied', expanded: false, phoneNumber: '(48) 99127-9920' },
    { id: 10, plate: 'HQP-1S98', type: '-', color: 'Branco', clientName: 'Lucas Martins', model: 'Chevrolet Tracker Cinza', status: 'occupied', expanded: false, phoneNumber: '(51) 98741-1183' },
    { id: 11, plate: 'VZN-9D60', type: '-', color: 'Vermelho', clientName: 'Bruna Silveira', model: 'Toyota Yaris Preto', status: 'occupied', expanded: false, phoneNumber: '(34) 98603-7742' },
    { id: 12, plate: 'LKR-3E22', type: '-', color: 'Azul', clientName: 'Eduardo Tavares', model: 'Honda HR-V Azul', status: 'occupied', expanded: false, phoneNumber: '(67) 99918-4025' }
  ]

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
    this.veiculosService.excluirVeiculo(event.id).subscribe((item: any) => {
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
      data: {}
    }).afterClosed().subscribe(() => {
      window.location.reload();
    });
  }

  editVehicle(event: any): void {
    event.actionType = 'edit';
    this.dialog.open(AddVehiclesComponent, {
      data: event
    }).afterClosed().subscribe(() => {
      window.location.reload();
    });
  }
}
