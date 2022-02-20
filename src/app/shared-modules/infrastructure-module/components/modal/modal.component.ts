import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Output() callback = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public onClickAction(): void {
    // emit callback
    this.callback.emit();
  }

}
