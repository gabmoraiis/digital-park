
import { Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { TableListComponent } from '../../components/table-list/table-list.component';
import { HttpClientModule } from '@angular/common/http';
import { OpenModalConfirmService } from '../../services/open-modal-confirm.service';

export interface vacancy {
  id: number;
  plate?: string;
  clientName?: string;
  model?: string;
  type?: string;
  color?: string;
  startTime?: string;
  status: string;
  phoneNumber?: string;
  expanded: boolean;
}

@Component({
  selector: 'app-vacancies',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent,
    ReactiveFormsModule,
    HttpClientModule,
    TableListComponent
  ],
  providers: [],
  templateUrl: './vacancies.component.html',
  styleUrl: './vacancies.component.scss'
})
export class VacanciesComponent implements OnInit {
  private openModalConfirmService = inject(OpenModalConfirmService);
  private sessionStorage = sessionStorage;
  protected dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  day: number | string = '';
  month: string = '';
  year: number | string = '';
  time: string = '';
  timeInterval: any;
  enterpriseName: string = '';
  id: string = '';
  tableMode: boolean = false;
  isLoading: boolean = false;

  vacancies: vacancy[] = [
    { id: 1, status: 'Disponível', expanded: false, clientName: '-', model: '-', type: '-', color: '-', plate: '-' },
    { id: 2, plate: 'TYZ-0J10', clientName: 'Gabriel Morais', model: 'HVR Preto', status: 'Ocupado', expanded: false, startTime: '20:44' },
    { id: 3, status: 'Disponível', expanded: false, clientName: '-', model: '-', type: '-', color: '-', plate: '-' },
    { id: 4, plate: 'ZRZ-1L99', clientName: 'Gustavo Santos', model: 'HVR Azul', status: 'Ocupado', expanded: false, startTime: '18:16' },
    { id: 5, status: 'Disponível', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 6, status: 'Disponível', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 7, status: 'Disponível', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 8, status: 'Disponível', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 9, status: 'Disponível', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 10, status: 'Disponível', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 11, status: 'Disponível', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 12, status: 'Disponível', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 13, status: 'Disponível', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 14, status: 'Disponível', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 15, status: 'Disponível', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 16, status: 'Disponível', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 17, status: 'Disponível', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 18, status: 'Disponível', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 19, status: 'Disponível', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 20, status: 'Disponível', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' }
  ];
  historyVacancies: any[] = [
    {}
  ]

  displayedColumns: string[] = [];
  legends: Array<{ value: string; name: string; view: boolean; checkbox: boolean; quantity1: boolean; quantity2: boolean; date: boolean }> = [
    {
      value: 'id',
      name: 'Vaga',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
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
      value: 'startTime',
      name: 'Hora de Início',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
    {
      value: 'status',
      name: 'Status da Vaga',
      view: false,
      checkbox: false,
      quantity1: false,
      quantity2: false,
      date: false
    },
  ];

  @ViewChild('moreData', { static: false }) moreData!: ElementRef;
  @ViewChild('vacancyIntro', { static: false }) vacancyIntro!: ElementRef;

  ngOnInit(): void {
    this.enterpriseName = this.sessionStorage.getItem('enterpriseName') || 'Nome não definido';
    this.updateDateTime();
    this.timeInterval = setInterval(() => this.updateDateTime(), 1000);
    this.displayedColumns = ['id', 'plate', 'type', 'model', 'color', 'clientName', 'startTime', 'status'];
    // this.cursoService.listarCursos().subscribe((res: any) => {

    // }, (error) => {
    //   this.openSnackBar('Erro ao listar dados, tente novamente mais tarde.')
    // });
  }

  private updateDateTime(): void {
    const now = new Date();
    const monthNames = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    this.day = now.getDate();
    this.month = monthNames[now.getMonth()];
    this.year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    this.time = `${hours}:${minutes}`;
  }

  ngOnDestroy(): void {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  handleDeleteClick(event: any): void {
    this.isLoading = true;
    // this.cursoService.excluirCurso(event.id).subscribe((item: any) => {
    //   this.openSnackBar('Curso deletado com sucesso!')
    //   this.isLoading = false;
    //   window.location.reload();
    // }, (error) => {
    //   this.openSnackBar('Erro ao deletar curso, tente novamente mais tarde.')
    //   this.isLoading = false;
    // })
  }

  vacancyClick(arg: number | vacancy): void {
    if (typeof arg === 'number') {
      const i = arg;
      if (!this.vacancies[i]) return;
      this.vacancies[i].expanded = !this.vacancies[i].expanded;
      return;
    }

    const v = arg as vacancy;
    const idx = this.vacancies.indexOf(v);
    if (idx === -1) return;
    this.vacancies[idx].expanded = !this.vacancies[idx].expanded;
  }

  cancelButton(index: number, data: any): void {

  }

  confirmButton(index: number, data: any): void {
    this.openConfirmation(data);
  }

  openConfirmation(event: any): void {
    console.log(event)
    this.openModalConfirmService.openModalConfirm({
      text: `Tem certeza que deseja alterar o status dessa vaga de ${event.status} para ${event.status == 'Ocupado' ? 'Disponível' : 'Ocupado'}?`,
      subText: 'O registro da vaga ficará salvo e não poderá ser alterado.',
      type: 'danger',
    }).subscribe(confirm => {

    })
  }

  changeViewMode(mode: 'frame' | 'table'): void {
    if (mode == 'frame') {
      this.tableMode = false;
    } else {
      this.tableMode = true;
    }
  }

  openSnackBar(content: string): void {
    this.snackBar.open(content, 'Fechar', {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
