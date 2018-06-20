import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'rz-modal',
  templateUrl: './modal.component.html',
  styleUrls: [ './modal.component.scss' ]
})
export class ModalComponent implements OnInit {

  /**
   * @property
   * beforeClose é um método que será executado, se definido, antes do método cancel. O retorno deve ser um
   * booleano, onde *true* permite cancelar e *false* interrompe o fechamento da modal.
   */
  @Input() beforeClose: (this) => boolean;
  @Input() bodyStyle: string;
  @Input() headerStyle: string;
  @Input() large = false;
  @Input() modalTitle: string;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router
  ) { }

  ngOnInit() {
  }

  close() {
    const allowed = this.beforeClose ? this.beforeClose() : true;
    if ( !allowed ) {
      return;
    }
    this.router.navigate(
      [ { outlets: { overall: null } } ],
      { relativeTo: this.route.parent }
    );
  }

}
