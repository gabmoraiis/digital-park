import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { iModalConfirm } from '../interface/modal-confirm.interface';
import { ModalConfirmComponent } from '../components/modal-confirm/modal-confirm.component';

@Injectable({
  providedIn: 'root'
})
export class OpenModalConfirmService {
  private dialog = inject(MatDialog);

  openModalConfirm(data: iModalConfirm) {
    return this.dialog.open(ModalConfirmComponent, {
      data,
    }).afterClosed()
  }
}
