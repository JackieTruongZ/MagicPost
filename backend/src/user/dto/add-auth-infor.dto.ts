export class AddAuthInforDto {
  private _type: number;
  private _transId: string;
  private _hubId: string;

  get type(): number {
    return this._type;
  }

  get transId(): string {
    return this._transId;
  }

  get hubId(): string {
    return this._hubId;
  }

  setInforAuth(_type: number, _transId?: string, _hubId?: string){
   this._type = _type;
   if (!_transId) {
     this._transId = '404';
     this._hubId = _hubId;
   }

   if (!_hubId){
     this._hubId = '404';
     this._transId = _transId;
   }
   if (_transId && _hubId) {
     this._transId = _transId;
     this._hubId = _hubId;
   }
 }

}