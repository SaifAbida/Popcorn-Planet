export class BadRequestError extends Error {
  cause?: any;
  status: number;
  constructor(message?: string, cause?: any) {
    super(message);
    this.cause = cause;
    this.name = this.constructor.name;
    this.status = 400;
  }
}

export class NotFoundError extends Error {
  cause?: any;
  status: number;
  constructor(message?: string, cause?: any) {
    super(message);
    this.cause = cause;
    this.name = this.constructor.name;
    this.status = 404;
  }
}

export class UnauthorizedError extends Error {
  cause?: any;
  status: number;
  constructor(message?: string, cause?: any) {
    super(message);
    this.cause = cause;
    this.name = this.constructor.name;
    this.status = 401;
  }
}

export class ForbiddenError extends Error {
  cause?: any;
  status: number;
  constructor(message?: string, cause?: any) {
    super(message);
    this.cause = cause;
    this.name = this.constructor.name;
    this.status = 403;
  }
}
