/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  SimpleChanges,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-table-list',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.scss',
})
export class TableListComponent implements AfterViewInit, OnInit, OnChanges {
  dataSource: MatTableDataSource<any>;

  @Input() dataList: Array<any> = [];
  @Input() actions: boolean = false;
  @Input() refreshButton: boolean = false;
  @Input() editButton: boolean = false;
  @Input() deleteButton: boolean = false;
  @Input() viewButton: boolean = false;
  @Input() displayedColumns: string[] = [];
  @Input() legends: Array<{
    value: string;
    name: string;
    view: boolean;
    view2?: boolean;
    checkbox: boolean;
    quantity1: boolean;
    quantity2: boolean;
    date: boolean;
  }> = [];
  @Input() length: number = 0;
  @Input() pageSize: number = 0;
  @Input() pageIndex: number = 0;
  @Input() isExceeding: boolean = false;
  @Input() isConfirmed: boolean = false;
  @Input() permissionStatus: string = '';

  @Output() handleRefreshClick = new EventEmitter();
  @Output() handleEditClick = new EventEmitter();
  @Output() handleViewClick = new EventEmitter();
  @Output() handleDeleteClick = new EventEmitter();
  @Output() paginate = new EventEmitter();
  @Output() dataChanged = new EventEmitter<{ data: any[] }>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  defColumns: string[] = [];

  constructor() {
    this.dataSource = new MatTableDataSource(this.dataList);
  }

  ngOnInit(): void {
    if (this.actions) {
      this.defColumns = this.defColumns.concat(
        this.displayedColumns,
        'actions'
      );
    } else {
      this.defColumns = this.displayedColumns;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.dataList);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getHeaderTitle(key: string): string {
    const legend = this.legends.find((item) => item.value === key);
    return legend?.name ?? '';
  }

  checkColor(column: string, row: any) {
    if (column == 'status' && row.status) {
      if (row.status == 'Disponível') {
        return { color: 'green', 'font-weight': 'bold' };
      } else if (row.status == 'Ocupado') {
        return { color: 'red', 'font-weight': 'bold' };
      } else {
        return { color: 'black' };
      }
    } else {
      return { color: 'black' };
    }
  }

  checkIdMatricesCell(cellContent: string) {
    if (cellContent === 'Não') {
      return false;
    } else {
      return true;
    }
  }

  handlePaginatorClick(event: PageEvent) {
    this.paginate.emit(event);
  }

  handleRefreshButtonClick(element: any): void {
    this.handleRefreshClick.emit(element);
  }

  handleEditButtonClick(element: any): void {
    this.handleEditClick.emit(element);
  }

  handleDeleteButtonClick(element: any): void {
    this.handleDeleteClick.emit(element);
  }

  onCheckboxChange(row: any, event: any) {
    row.quantityEnabled = event.checked;
  }

  onQuantityChange() {
    this.dataChanged.emit({ data: this.dataList });
  }
}
