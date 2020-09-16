import { Component, OnInit } from '@angular/core';
import { OverlayService } from './../../components/overlay/overlay.service';
import { SystemStatus } from './../../models/models';
import { StatusService } from './../../services/api';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  loaded = false;

  status: SystemStatus;
  constructor(private statusService: StatusService,
    private _overlayService: OverlayService) {
      this._overlayService.show();
    this.statusService.getStatus().subscribe((data: SystemStatus) =>{
      this.status = data;
      this.loaded= true;
      this._overlayService.hide();
    },
    error=>{
      this.loaded= true;
      this.status={};
      this.status.channelCount = 0;
      this.status.commentCount = 0;
      this.status.postCount = 0;
      this.status.userCount = 0;
      this._overlayService.hide();
    });
   }

  ngOnInit() {

    // this.datasets = [
    //   [0, 20, 10, 30, 15, 40, 20, 60, 60],
    //   [0, 20, 5, 25, 10, 30, 15, 40, 40]
    // ];
    // this.data = this.datasets[0];


    // var chartOrders = document.getElementById('chart-orders');

    // parseOptions(Chart, chartOptions());


    // var ordersChart = new Chart(chartOrders, {
    //   type: 'bar',
    //   options: chartExample2.options,
    //   data: chartExample2.data
    // });

    // var chartSales = document.getElementById('chart-sales');

    // this.salesChart = new Chart(chartSales, {
		// 	type: 'line',
		// 	options: chartExample1.options,
		// 	data: chartExample1.data
		// });
  }





  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
