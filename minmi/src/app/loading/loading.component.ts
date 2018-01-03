import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  fullMode: boolean;
  @Input()
  set full(value: boolean | string) {
    this.fullMode = value === '' || (value && value !== 'false');
  }

  @Input() message: string;

  constructor() { }

  ngOnInit() {

  }

}
