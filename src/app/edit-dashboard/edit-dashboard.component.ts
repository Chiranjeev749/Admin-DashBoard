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

  // Create a copy of the original user to avoid modifying the original user object
  originalUser: any;

  ngOnInit(): void {
    // Initialize originalUser with a copy of the user object
    this.originalUser = { ...this.user };
  }

  saveEdit(): void {
    this.save.emit(this.user);
  }

  cancelEdit(): void {
    // Reset user to its original state
    this.user = { ...this.originalUser };
    this.cancel.emit();
  }
}
