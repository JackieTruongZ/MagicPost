export class ResponseDto {
    private status: string
    private message: string
    private data: any

  get Status(): string {
    return this.status;
  }

  get Message(): string {
    return this.message;
  }

  get Data(): any {
    return this.data;
  }

  setStatus(_status: string) {
      this.status = _status
  }
  setMessage(_message: string) {
      this.message = _message
  }
  setData(_data: any) {
      this.data = _data
  }
    setStatusOK () {
      this.status = "OK"
      this.message = "OK"
    }
    setStatusFail () {
      this.status = "FAIL"
      this.message = "FAIL"
    }
    setStatusWarning () {
      this.status = "WARNING"
      this.message = "WARNING"
    }

  setAll(_status: string, _message: string, _data: string) {
    this.setStatus(_status);
    this.setMessage(_message);
    this.setData(_data);
  }

    // toJson(){
    //   return `{ \n` +
    //           ` "status": ${this.status} \n` +
    //           ` "message": ${this.message} \n` +
    //           ` "data": ${(this.data)} \n` +
    //           `}`;
    // }

}