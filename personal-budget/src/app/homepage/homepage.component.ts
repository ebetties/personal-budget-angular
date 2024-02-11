import { AfterViewInit, Component, Renderer2, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {

  public dataSource = {
    datasets: [
        {
            data: [''],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#ff00ff',
                '#00ff00',
                '#000080',
                '#00ffff'
            ]
        }
    ],


    labels: ['']
};
constructor(private http: HttpClient, private renderer: Renderer2, private el: ElementRef) { }

  ngAfterViewInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
      }
        this.createChart();

  });

}

createChart() {
    const ctx = this.el.nativeElement.querySelector('#myChart');
    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource
    });
  }
}
