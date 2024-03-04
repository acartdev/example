export class ValidateLogin {
  errors: boolean;
  status: number | undefined;
  message: string | undefined;
  password?: boolean;
  constructor(
    errors: boolean,
    status?: number,
    message?: string,
    password?: boolean
  ) {
    this.errors = errors;
    this.password = password;
    this.message = message;
    this.status = status;
  }
}
