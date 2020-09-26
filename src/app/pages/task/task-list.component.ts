import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../../components/dialogs/confirm-dialog/confirm-dialog.component';
import { OverlayService } from '../../components/overlay/overlay.service';
import { PaginationConfig } from '../../components/pagination/pagination';
import { Task } from '../../models/models';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  isSubmitting: boolean;

  pageConfig: PaginationConfig = {
    currentPage: 0,
    totalPages: 1,
    totalElements: 0
  }

  tasks: Task[];
  isLoading: boolean;


  constructor(private _overlayService: OverlayService, private modalService: NgbModal, private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }


  /**
     * Change page event ,get next elements
    */
  pageChanged(event) {

    // this.isLoading = true;

    this.pageConfig.currentPage = event - 1;
    this.loadTasks(this.pageConfig.currentPage);

  }

  loadTasks(pageNo?: number, pageSize?: number, sortBy?: string) {
    this._overlayService.show();
    this.taskService.getAllUserTasks(pageNo, pageSize, sortBy).pipe(finalize(() => {
      this.isLoading = false;
      this._overlayService.hide();
    })).subscribe(data => {
      this.tasks = data.content;
      this.pageConfig.totalElements = data.totalElements;
      this.pageConfig.totalPages = data.totalPages;
      this._overlayService.hide();
    },
      err => {
        console.log(err);
      });
  }


  askDeleteConfirmation(task: Task) {
    const modalRef: NgbModalRef = this.modalService.open(ConfirmDialogComponent, { centered: true });

    modalRef.result.then((userResponse) => {
      console.log(`User's choice: ${userResponse}`);

      if (userResponse)
        this.deleteTask(task.id);

    }).catch((error) => {

    });
  }

  deleteTask(id: number) {
    this._overlayService.show();
    this.taskService.deleteTask(id).pipe(finalize(() => {
      this._overlayService.hide();
    })).subscribe((data => {
      console.log("Done delete");
      this.pageChanged(this.pageConfig.currentPage);
    }), err => {

    });
  }

}
