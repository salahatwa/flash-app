import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationConfig } from './page.config';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  config: PaginationConfig;

  @Input() set pageConfig(value: PaginationConfig) {
    this.config = value;
  }

  @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  counter(i: number) {
    return new Array(i);
  }

  setPage(pageNum: number) {
    this.onPageChange.next(pageNum);
  }

}
