import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalUserConfigComponent } from '../modal-user-config/modal-user-config.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { OpenModalConfirmService } from '../../services/open-modal-confirm.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  private dialog = inject(MatDialog);
  private authService = inject(AuthService);
  private openModalConfirmService = inject(OpenModalConfirmService);

  openConfig(): void {
    this.dialog.open(ModalUserConfigComponent, {
    });
  }

  logout(): void {
    this.openModalConfirmService.openModalConfirm({
      text: `Tem certeza que deseja sair?`,
      type: 'warning',
    }).subscribe(confirm => {
      if (confirm) {
        this.authService.logout();
      }
    })
  }
}
