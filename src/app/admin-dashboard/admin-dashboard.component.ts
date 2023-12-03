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
  searchList = [];
  selected;
  isSelected: boolean = false;
  titleList: string[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  onSelect(event) {
    this.searchTerm = event; 
  }

  searchTitle(value) {
    if (value.length > 2) {
      this.searchList = this.titleList.filter((element) => {
        return element.toLocaleLowerCase().includes(value.toLocaleLowerCase());
      });
    }
  }

  getFilteredUsers(): any[] {
    return this.users
      .filter((user) =>
        Object.values(user)
          .some((value) => value.toString().toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
  }

  toggleSelect(user: any): void {
    const index = this.selectedRows.findIndex((selectedUser) => selectedUser === user);
    if (index !== -1) {
      this.selectedRows.splice(index, 1);
    } else {
      this.selectedRows.push(user);
    }
  }

  fetchUsers(): void {
    this.http.get<any[]>('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .subscribe(users => {
        this.users = users.map(user => ({ ...user, isSelected: false }));

        this.titleList = [];
        this.users.forEach(user => {
          this.titleList.push(user.name.toString());
        });
      });
  }

  getPagedUsers(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.getFilteredUsers().slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  deleteUser(user: any): void {
    this.users = this.users.filter(u => !this.selectedRows.includes(u));
    this.selectedRows = [];
  }

  editUser(user: any) {
  }

  toggleSelectAllOnPage(): void {
    const areAllSelected = this.areAllSelectedOnPage();
    this.getPagedUsers().forEach(user => (user.isSelected = !areAllSelected));
  }

  areAllSelectedOnPage(): boolean {
    return this.getPagedUsers().every(user => user.isSelected);
  }
}
