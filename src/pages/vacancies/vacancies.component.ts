
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { TableListComponent } from '../../components/table-list/table-list.component';
import { CursoService } from '../../services/curso.service';
import { HttpClientModule } from '@angular/common/http';

export interface vacancy {
  id: number;
  plate?: string;
  clientName?: string;
  model?: string;
  type?: string;
  color?: string;
  startTime?: string;
  status: 'available' | 'occupied';
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
  providers: [CursoService],
  templateUrl: './vacancies.component.html',
  styleUrl: './vacancies.component.scss'
})
export class VacanciesComponent implements OnInit {
  enterpriseName: string = 'Shopping Boa Vista'
  day: number | string = '';
  month: string = '';
  year: number | string = '';
  time: string = '';
  vacancies: vacancy[] = [
    { id: 1, status: 'available', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 2, plate: 'TYZ-0J10', clientName: 'Gabriel Morais', model: 'HVR Preto', status: 'occupied', expanded: false },
    { id: 3, status: 'available', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 4, plate: 'ZRZ-1L99', clientName: 'Gustavo Santos', model: 'HVR Azul', status: 'occupied', expanded: false },
    { id: 5, status: 'available', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 6, status: 'available', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 7, status: 'available', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 8, status: 'available', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 9, status: 'available', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 10, status: 'available', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 11, status: 'available', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 12, status: 'available', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 13, status: 'available', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 14, status: 'available', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 15, status: 'available', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 16, status: 'available', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 17, status: 'available', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 18, status: 'available', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 19, status: 'available', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' },
    { id: 20, status: 'available', expanded: false, clientName: '-', model: '-', type: '-', color: '-', startTime: '-', plate: '-' }
  ];
  tableMode: boolean = false;
  timeInterval: any;

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
  isLoading: boolean = false;

  @ViewChild('moreData', { static: false }) moreData!: ElementRef;
  @ViewChild('vacancyIntro', { static: false }) vacancyIntro!: ElementRef;

  constructor(
    protected dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cursoService: CursoService
  ) { }

  ngOnInit(): void {
    this.updateDateTime();
    this.timeInterval = setInterval(() => this.updateDateTime(), 1000);
    this.displayedColumns = ['id', 'plate', 'type', 'model', 'color', 'clientName', 'startTime', 'status'];
    this.cursoService.listarCursos().subscribe((res: any) => {

    }, (error) => {
      this.openSnackBar('Erro ao listar dados, tente novamente mais tarde.')
    });

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
    this.cursoService.excluirCurso(event.id).subscribe((item: any) => {
      this.openSnackBar('Curso deletado com sucesso!')
      this.isLoading = false;
      window.location.reload();
    }, (error) => {
      this.openSnackBar('Erro ao deletar curso, tente novamente mais tarde.')
      this.isLoading = false;
    })
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

  cancelButton(index: number): void {

  }

  confirmButton(index: number): void {

  }

  changeViewMode(mode: 'frame' | 'table'): void {
    if(mode == 'frame') {
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
