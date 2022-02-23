import { Component } from '@angular/core';

@Component({
  selector: 'app-some-other-page',
  templateUrl: './some-other-page.component.html',
  styleUrls: ['./some-other-page.component.scss'],
  host: {
    class: 'h-100 w-100 d-flex justify-content-center align-items-center'
  }
})
export class SomeOtherPageComponent {}
