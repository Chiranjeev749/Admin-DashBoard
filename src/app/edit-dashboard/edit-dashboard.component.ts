// edit-dashboard.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-dashboard',
  templateUrl: './edit-dashboard.component.html',
  styleUrls: ['./edit-dashboard.component.css']
})
export class EditDashboardComponent {
  @Input() user: any;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  originalUser: any;

  ngOnInit(): void {
    this.originalUser = { ...this.user };
  }

  saveEdit(): void {
    this.save.emit(this.user);
  }

  cancelEdit(): void {
    this.user = { ...this.originalUser };
    this.cancel.emit();
  }
}
