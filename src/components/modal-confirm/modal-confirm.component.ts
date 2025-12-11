import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { iModalConfirm } from '../../interface/modal-confirm.interface';

@Component({
  selector: 'app-modal-confirm',
  standalone: true,
  imports: [],
  templateUrl: './modal-confirm.component.html',
  styleUrl: './modal-confirm.component.scss'
})
export class ModalConfirmComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: iModalConfirm,
    public dialogRef: MatDialogRef<ModalConfirmComponent>,
  ) { }

  handleClickButton(confirm: boolean) {
    this.dialogRef.close(confirm);
  }
}