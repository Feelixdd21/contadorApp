import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Navigation, Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
  formulario: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.formulario = this.fb.group({
      usuario: '',
      pass: ''
    });

  }

  onSubmit() {
    if (this.formulario.valid) {
      if (this.formulario.get('usuario')?.value == 'admin' && this.formulario.get('pass')?.value == 'admin') {
        this.router.navigate(['/dashboard']);
      }
    }
  }

  ngOnInit(): void {
  }

}


