import { UUID } from 'angular2-uuid';
import { NotifyService } from '../notify.service';

export enum NotificationPosition {
  bottomCenter = 'bottom-center',
  bottomLeft = 'bottom-left',
  bottomRight = 'bottom-right',
  topCenter = 'top-center',
  topLeft = 'top-left',
  topRight = 'top-right'
}

export enum NotificationType {
  default,
  info,
  error,
  success,
  processing,
  warning
}

export class NotificationID {
  protected stackSize: number;
  protected uid: string;

  constructor() {
    this.stackSize = 0;
    this.uid = UUID.UUID();
  }
}

export interface NotificationParams {
  message?: string;
  position: NotificationPosition;
  showClose?: boolean;
  stackName?: string;
  timeout?: number;
  title: string;
  type: NotificationType;
}

export class Notification extends NotificationID {
  message?: string;
  position: NotificationPosition;
  showClose?: boolean;
  stackName?: string;
  timeout?: number;
  title: string;
  type: NotificationType;

  constructor(
    public service: NotifyService,
    params: NotificationParams
  ) {
    super();
    this.position = params.position;
    this.showClose = params.showClose || params.timeout > 0 || false;
    this.title = params.title;
    this.timeout = params.timeout;
    this.type = params.type;
    this.message = params.message || null;
    this.stackName = params.stackName || null;

    if ( this.stackName ) {
      this.timeout = 0;
      this.showClose = false;
    }

    if ( this.timeout ) {
      setTimeout(() => {
        this.remove();
      }, this.timeout * 1000);
    }
  }

  get id(): string {
    return this.uid;
  }

  get stack(): number {
    return this.stackSize;
  }

  remove() {
    this.service.remove(this);
  }

  stackDecrease(): number {
    if ( this.stack ) {
      this.stackSize--;
    }
    return this.stack;
  }

  stackIncrease(): number {
    this.stackSize++;
    return this.stack;
  }
}


export class NotificationError extends Notification {
  constructor(
    service: NotifyService,
    title: string,
    timeout?: number
  ) {
    super(service, {
      position: NotificationPosition.topCenter,
      title: title,
      type: NotificationType.error,
      timeout: timeout,
      showClose: true
    });
  }
}

export class NotificationInfo extends Notification {
  constructor(
    service: NotifyService,
    title: string,
    timeout?: number
  ) {
    super(service, {
      position: NotificationPosition.topCenter,
      title: title,
      type: NotificationType.info,
      timeout: timeout
    });
  }
}

export class NotificationSuccess extends Notification {
  constructor(
    service: NotifyService,
    title: string,
    timeout?: number
  ) {
    super(service, {
      position: NotificationPosition.topCenter,
      title: title,
      type: NotificationType.success,
      timeout: timeout
    });
  }
}

export class NotificationWarning extends Notification {
  constructor(
    service: NotifyService,
    title: string,
    timeout?: number
  ) {
    super(service, {
      position: NotificationPosition.topCenter,
      title: title,
      type: NotificationType.warning,
      timeout: timeout
    });
  }
}

export class NotificationWaiting extends Notification {
  constructor(
    service: NotifyService,
    title: string
  ) {
    super(service, {
      position: NotificationPosition.topCenter,
      title: title,
      type: NotificationType.processing,
      timeout: 0,
      showClose: false
    });
  }
}
