//Create a new module ts where I import all the modules from angular material
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

const modules = [
	MatToolbarModule,
	MatIconModule,
	MatCardModule,
	MatButtonModule,
	MatInputModule
];

@NgModule({
	imports: modules,
	exports: modules
})

export class MaterialModule{}