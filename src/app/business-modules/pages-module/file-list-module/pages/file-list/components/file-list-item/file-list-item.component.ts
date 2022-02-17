import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'file-list-item',
  templateUrl: './file-list-item.component.html',
  styleUrls: ['./file-list-item.component.scss'],
  host: { class: 'c-fileListItem' }
})
export class FileListItemComponent implements OnInit, OnDestroy {
  @Input() name!: string;
  @Output() delete = new EventEmitter();

  @ViewChild('delete') deleteButton: ElementRef;

  private subscriptions = new Subscription();

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.subscribeMouseEvents();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onClickDelete(): void {
    this.delete.emit();
  }

  private subscribeMouseEvents(): void {
    const mouseOver = fromEvent<MouseEvent>(
      this.elementRef.nativeElement,
      'mouseenter'
    );

    const mouseOut = fromEvent<MouseEvent>(
      this.elementRef.nativeElement,
      'mouseleave'
    );

    this.subscriptions.add(
      mouseOver.subscribe(() => {
        this.deleteButton.nativeElement.classList.add(
          'c-fileListItem__deleteButton--hover'
        );
      })
    );

    this.subscriptions.add(
      mouseOut.subscribe(() => {
        this.deleteButton.nativeElement.classList.remove(
          'c-fileListItem__deleteButton--hover'
        );
      })
    );
  }
}
