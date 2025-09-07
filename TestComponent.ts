
import { RouterLink, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent { matrixForm: FormGroup;

  columnTypes = ['Text', 'Number', 'Date'];
  filledByOptions = ['User', 'System'];
  dataTypes = ['String', 'Integer', 'Boolean'];

  constructor(private fb: FormBuilder) {
    this.matrixForm = this.fb.group({
      columns: this.fb.array([])
    });

    // start with 2 columns
    this.addColumn();
    this.addColumn();
  }

  // getter
  get columns(): FormArray {
    return this.matrixForm.get('columns') as FormArray;
  }

  // new column structure
  createColumn(): FormGroup {
    return this.fb.group({
      selected: new FormControl(false),
      header: new FormControl(''),
      columnType: new FormControl(this.columnTypes[0]),
      filledBy: new FormControl(this.filledByOptions[0]),
      dataType: new FormControl(this.dataTypes[0]),
      display: new FormControl('')
    });
  }

  // add new column
  addColumn() {
    this.columns.push(this.createColumn());
  }

  // delete selected columns
  deleteSelectedColumns() {
    for (let i = this.columns.length - 1; i >= 0; i--) {
      if (this.columns.at(i).get('selected')?.value) {
        this.columns.removeAt(i);
      }
    }
  }

  // submit form
  onSubmit() {
    console.log('Matrix Data:', this.matrixForm.value);
  }
}
