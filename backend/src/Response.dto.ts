export class ResponseDto {
    private status: string
    private message: string
    private data: any

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

    // toJson(){
    //   return `{ \n` +
    //           ` "status": ${this.status} \n` +
    //           ` "message": ${this.message} \n` +
    //           ` "data": ${(this.data)} \n` +
    //           `}`;
    // }

}