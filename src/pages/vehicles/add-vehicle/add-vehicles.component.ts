import { AlunosService } from './../../../services/alunos.service';
import { Alunos } from './../../../interface/alunos';
import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { Cursos } from '../../../interface/cursos';
import { CursoService } from '../../../services/curso.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-add-vehicles',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SpinnerComponent,
    HttpClientModule,
    NgxMaskDirective
  ],
  providers: [AlunosService, CursoService, provideNgxMask()],
  templateUrl: './add-vehicles.component.html',
  styleUrl: './add-vehicles.component.scss'
})
export class AddVehiclesComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    protected dialog: MatDialog,
    private alunosService: AlunosService,
    private snackBar: MatSnackBar,
    private cursoService: CursoService
  ) { }

  maxDate: any;
  isLoading: boolean = false;
  body?: Alunos;
  coursesList: Cursos[] = []
  formAlunos = this.fb.group({
    nome: ['', Validators.required],
    tipoPagamento: ['', Validators.required],
    endereco: ['', Validators.required],
    cpf: ['', Validators.required],
    telefone: ['', Validators.required],
    nascimento: [null, Validators.required],
    cursos: ['', Validators.required],
    faltas: [null, Validators.required],
    email: ['', Validators.required, , Validators.email],
  });

  ngOnInit(): void {
    this.cursoService.listarCursos().subscribe((res: any) => {
      this.coursesList = res;
    }, (error) => {
      this.openSnackBar('Erro ao listar cursos, tente novamente mais tarde.')
    })
    if (this.data.title === 'Editar Aluno') {
      this.isLoading = true;
      this.alunosService.listarAlunos(this.data.id).subscribe((response: any) => {
        this.formAlunos.get('nome')?.setValue(response[0].nome);
        this.formAlunos.get('tipoPagamento')?.setValue(response[0].tipoPagamento);
        this.formAlunos.get('endereco')?.setValue(response[0].endereco);
        this.formAlunos.get('cpf')?.setValue(response[0].cpf);
        this.formAlunos.get('telefone')?.setValue(response[0].telefone);
        this.formAlunos.get('nascimento')?.setValue(response[0].nascimento);
        this.formAlunos.get('cursos')?.setValue(response[0].curso);
        this.formAlunos.get('faltas')?.setValue(response[0].faltas);
        this.formAlunos.get('email')?.setValue(response[0].email);
        this.isLoading = false;
      }, (error) => {
        if(error.status == 400){
          this.snackBar.open('Aluno(a) já cadastrado.')  
          } else {
            this.snackBar.open('Erro ao salvar aluno(a), tente novamente mais tarde.')
          }
        this.isLoading = false;
      });
    }
  }

  handleClickBack() {
    this.dialog.closeAll();
  }

  submitForm(): void {
    if (this.data.title === 'Novo Aluno') {
        if (this.formAlunos.valid) {
          this.body = {
            nome: this.formAlunos.get('nome')?.value!,
            tipoPagamento: this.formAlunos.get('tipoPagamento')?.value!,
            endereco: this.formAlunos.get('endereco')?.value!,
            cpf: this.formAlunos.get('cpf')?.value!,
            telefone: this.formAlunos.get('telefone')?.value!,
            nascimento: this.formAlunos.get('nascimento')?.value!,
            curso: this.formAlunos.get('cursos')?.value!,
            faltas: this.formAlunos.get('faltas')?.value!,
            email: this.formAlunos.get('email')?.value!,
          }
          this.isLoading = true;
          this.alunosService.cadastrarAluno(this.body!).subscribe((response: any) => {
            this.isLoading = false;
            this.snackBar.open('Aluno(a) salvo com sucesso!');
            this.dialog.closeAll();
          }, (error) => {
            if(error.status == 400){
              this.snackBar.open('Aluno(a) já cadastrado.')  
              } else {
                this.snackBar.open('Erro ao salvar aluno(a), tente novamente mais tarde.')
              }
            this.isLoading = false;
          }, () => {
            this.isLoading = false;
            window.location.reload();
          })
        } else {
          this.formAlunos.markAllAsTouched();
        }
    } else if (this.data.title === 'Editar Aluno') {
      if (this.formAlunos.valid) {
        this.body = {
          nome: this.formAlunos.get('nome')?.value!,
          tipoPagamento: this.formAlunos.get('tipoPagamento')?.value!,
          endereco: this.formAlunos.get('endereco')?.value!,
          cpf: this.formAlunos.get('cpf')?.value!,
          telefone: this.formAlunos.get('telefone')?.value!,
          nascimento: this.formAlunos.get('nascimento')?.value!,
          curso: this.formAlunos.get('cursos')?.value!,
          faltas: this.formAlunos.get('faltas')?.value!,
          email: this.formAlunos.get('email')?.value!,
        }
        this.isLoading = true;
        this.alunosService.editarAluno(this.data.id, this.body!).subscribe((response: any) => {
          this.isLoading = false;
          this.snackBar.open('Aluno(a) editado com sucesso!');
          this.dialog.closeAll();
        }, (error) => {
          this.snackBar.open('Erro ao editar aluno(a), tente novamente mais tarde.')
          this.isLoading = false;
        }, () => {
          this.isLoading = false;
          window.location.reload();
        })
      } else {
        this.formAlunos.markAllAsTouched();
      }
    }
  }

  openSnackBar(content: string): void {
    this.snackBar.open(content, 'Fechar', {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  getActualDate(inputType: string): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    if (inputType === 'date') {
      return this.maxDate = `${year}-${month}-${day}`;
    } else {
      return this.maxDate = `${year}-${month}`;
    }
  }
}
