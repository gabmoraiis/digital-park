
export interface iModalConfirm {
  text?: string;
  subText?: string;
  footerText?: string;
  type?:  'danger' | 'warning' | 'success' | 'error';
  confirmText?: string;
  cancelText?: string;
  hideCancelButton?: boolean;
  hideConfirmButton?: boolean;
};
