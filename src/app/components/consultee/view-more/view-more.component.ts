import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.component.html',
  styleUrls: ['./view-more.component.scss']
})
export class ViewMoreComponent implements OnInit {
  private unsubscribe = new Subject();
  constructor(
    public dialogRef: MatDialogRef<ViewMoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _http: HttpClient,
    private _router: Router
  ) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onEscalate(): void {
    this._http.post(environment.escalate_url, this.data)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.onDelete();
        this.dialogRef.close();
        this._router.navigate(['/nav/escalated']);
      });
  }

  onDelete(): void {
    this._http.delete(environment.consultee_url + this.data.id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => { });
  }
}
