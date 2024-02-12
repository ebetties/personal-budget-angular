import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {

  constructor(private http: HttpClient, private el: ElementRef) { }

  ngAfterViewInit(): void {
    this.http.get<any>('http://localhost:3000/budget')
      .subscribe((res: any) => {
        const data = res.myBudget;
        this.createChart(data);
        this.createD3Chart(data);
      });
  }

  createChart(data: any[]) {
    const ctx = this.el.nativeElement.querySelector('#myChart');
    const backgroundColor = [
      '#ffcd56',
      '#ff6384',
      '#36a2eb',
      '#ff00ff',
      '#00ff00',
      '#000080',
      '#00ffff'
    ];
    const labels = data.map(item => item.title);
    const chartData = {
      datasets: [{
        data: data.map(item => item.budget),
        backgroundColor
      }],
      labels
    };
    new Chart(ctx, {
      type: 'pie',
      data: chartData
    });
  }

  createD3Chart(data: any[]) {
    const svg = d3.select(this.el.nativeElement).append('svg')
      .attr('width', 480)
      .attr('height', 225)
      .append('g')
      .attr('transform', 'translate(' + 480 + ',' + 225 + ')');

    const radius = Math.min(720, 336) / 2;

    const pie = d3.pie<any>()
      .sort(null)
      .value(d => d.budget);

    const arc = d3.arc<any>()
      .outerRadius(radius * 0.8)
      .innerRadius(radius * 0.4);

    const outerArc = d3.arc<any>()
      .innerRadius(radius * 1.1)
      .outerRadius(radius * 0.9);

    const color = d3.scaleOrdinal<string>()
      .range([
        '#98abc5',
        '#8a89a6',
        '#7b6888',
        '#6b486b',
        '#a05d56',
        '#d0743c',
        '#ff8c00'
      ]);

    const arcs = svg.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .style('fill', d => color(d.data.title));

    arcs.append('text')
      .attr('transform', d => 'translate(' + outerArc.centroid(d) + ')')
      .attr('dy', '0.05em')
      .text(d => d.data.title);

     /* .text(d => d.data.title + ' budget is $' + d.data.budget);*/

  }
}


