import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';

@Component({
  selector: 'app-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessibilityComponent implements OnInit, OnDestroy {
  @ViewChild('element') element: ElementRef<HTMLElement>;
  @ViewChild('subtree') subtree: ElementRef<HTMLElement>;
  @ViewChild('monitored') monitoredEl: ElementRef<HTMLElement>;

  origin = this.formatOrigin(null);
  elementOrigin = this.formatOrigin(null);
  subtreeOrigin = this.formatOrigin(null);
  selectedValue = 'mouse';

  constructor(public focusMonitor: FocusMonitor,
              private cdr: ChangeDetectorRef,
              private ngZone: NgZone) {
  }

  ngOnInit() {
    this.focusMonitor.monitor(this.element).subscribe(origin => {
      console.log(origin);
      this.ngZone.run(() => {
        this.elementOrigin = this.formatOrigin(origin);
        this.cdr.markForCheck();
      });
    });
    this.focusMonitor.monitor(this.subtree, true)
      .subscribe(origin => this.ngZone.run(() => {
        this.subtreeOrigin = this.formatOrigin(origin);
        this.cdr.markForCheck();
      }));
    this.focusMonitor.monitor(this.monitoredEl)
      .subscribe(origin => this.ngZone.run(() => {
        this.origin = this.formatOrigin(origin);
        this.cdr.markForCheck();
      }));
  }

  formatOrigin(origin: FocusOrigin): string {
    return origin ? origin + ' focused' : ' blurred';
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.element);
    this.focusMonitor.stopMonitoring(this.subtree);
    this.focusMonitor.stopMonitoring(this.monitoredEl);
  }

}
