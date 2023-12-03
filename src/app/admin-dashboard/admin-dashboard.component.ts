// admin-dashboard.component.ts
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  users: any[] = [];
  selectedRows: any[] = [];
  searchTerm = '';
  currentPage = 1;
  pageSize = 10;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  toggleSelectAll(): void {
    this.selectedRows = this.selectedRows.length === this.pageSize ? [] : [...this.getFilteredUsers()];
  }

  fetchUsers(): void {
    this.http.get<any[]>('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .subscribe(users => {
        // Initialize isSelected property for each user
        this.users = users.map(user => ({ ...user, isSelected: false }));
      });
  }

  getFilteredUsers(): any[] {
    return this.users
      .filter(user => Object.values(user).some(value => value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())));
  }

  getPagedUsers(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.getFilteredUsers().slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  toggleSelect(user: any): void {
    const index = this.selectedRows.findIndex(selectedUser => selectedUser === user);
    if (index !== -1) {
      this.selectedRows.splice(index, 1);
    } else {
      this.selectedRows.push(user);
    }
  }

  deleteUser(user: any): void {
    this.users = this.users.filter(u => !this.selectedRows.includes(u));
    this.selectedRows = [];
  }
  editUser(user:any){
    
  }
}
