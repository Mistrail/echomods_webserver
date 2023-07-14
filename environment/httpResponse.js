export default class HttpResponse {
  constructor(
    status,
    response = null,
    details = {},
  ) {
    this.status = status;
    this.result = response;
    this.details = details;
  }
}
