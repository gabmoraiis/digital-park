import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TableListComponent } from '../../components/table-list/table-list.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

import { HttpClientModule } from '@angular/common/http';
import { AddVehiclesComponent } from './add-vehicle/add-vehicles.component';
import { AlunosService } from '../../services/alunos.service';
import { CursoService } from '../../services/curso.service';
import { vacancy } from '../vacancies/vacancies.component';

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
  providers: [AlunosService, CursoService],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent implements OnInit {
  displayedColumns: string[] = [];
  legends: Array<{ value: string; name: string; view: boolean; checkbox: boolean; quantity1: boolean; quantity2: boolean; date: boolean }> = [
    {
      value: 'plate',
      name: 'Placa',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
    {
      value: 'type',
      name: 'Tipo',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
    {
      value: 'model',
      name: 'Modelo',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
    {
      value: 'color',
      name: 'Cor',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
    {
      value: 'clientName',
      name: 'Nome do Cliente',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
    {
      value: 'phoneNumber',
      name: 'Contato',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    }
  ];
  isLoading: boolean = false;
  formFilter!: FormGroup;
  vehiclesList: vacancy[] = [
    { id: 1, plate: 'KDJ-4A72', clientName: 'Rafael Azevedo', model: 'Honda Civic Preto', status: 'occupied', expanded: false, phoneNumber: '(11) 98241-6735' },
    { id: 2, plate: 'MTR-9F81', clientName: 'Larissa Couto', model: 'Toyota Corolla Branco', status: 'occupied', expanded: false, phoneNumber: '(21) 99734-1208' },
    { id: 3, plate: 'PLQ-7C20', clientName: 'Fernando Ribeiro', model: 'Volkswagen Polo Cinza', status: 'occupied', expanded: false, phoneNumber: '(31) 98922-4477' },
    { id: 4, plate: 'BXE-2H55', clientName: 'Carolina Mendes', model: 'Fiat Argo Vermelho', status: 'occupied', expanded: false, phoneNumber: '(27) 99610-8823' },
    { id: 5, plate: 'ZQP-8K31', clientName: 'João Carvalho', model: 'Chevrolet Onix Azul', status: 'occupied', expanded: false, phoneNumber: '(41) 98577-3341' },
    { id: 6, plate: 'GHS-3L92', clientName: 'Marcos Pereira', model: 'Hyundai HB20 Preto', status: 'occupied', expanded: false, phoneNumber: '(62) 98144-2099' },
    { id: 7, plate: 'RTS-6M14', clientName: 'Bianca Farias', model: 'Jeep Renegade Branco', status: 'occupied', expanded: false, phoneNumber: '(85) 98833-7610' },
    { id: 8, plate: 'WLV-0P87', clientName: 'André Oliveira', model: 'Renault Kwid Laranja', status: 'occupied', expanded: false, phoneNumber: '(19) 98420-5566' },
    { id: 9, plate: 'FJB-5T43', clientName: 'Patrícia Gomes', model: 'Ford Ka Prata', status: 'occupied', expanded: false, phoneNumber: '(48) 99127-9920' },
    { id: 10, plate: 'HQP-1S98', clientName: 'Lucas Martins', model: 'Chevrolet Tracker Cinza', status: 'occupied', expanded: false, phoneNumber: '(51) 98741-1183' },
    { id: 11, plate: 'VZN-9D60', clientName: 'Bruna Silveira', model: 'Toyota Yaris Preto', status: 'occupied', expanded: false, phoneNumber: '(34) 98603-7742' },
    { id: 12, plate: 'LKR-3E22', clientName: 'Eduardo Tavares', model: 'Honda HR-V Azul', status: 'occupied', expanded: false, phoneNumber: '(67) 99918-4025' }
  ]

  constructor(
    protected dialog: MatDialog,
    private snackBar: MatSnackBar,
    private studentsService: AlunosService,
    private cursoService: CursoService
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['plate', 'type', 'model', 'color', 'clientName', 'phoneNumber'];
    this.cursoService.listarCursos().subscribe((res: any) => {

    }, (error) => {
      this.openSnackBar('Erro ao listar dados, tente novamente mais tarde.')
    });
  }

  handleDeleteClick(event: any): void {
    this.isLoading = true;
    this.studentsService.excluirAluno(event.id).subscribe((item: any) => {
      this.openSnackBar('Registro de aluno deletado com sucesso!')
      this.isLoading = false;
      window.location.reload();
    }, (error) => {
      this.openSnackBar('Erro ao deletar registro de aluno, tente novamente mais tarde.')
      this.isLoading = false;
    })
  }

  newVehicle(): void {

  }

  editVehicle(event: any): void {

  }

  openSnackBar(content: string): void {
    this.snackBar.open(content, 'Fechar', {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
