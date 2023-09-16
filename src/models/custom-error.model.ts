export type ErrorType = 'Validation Error' |'Token Error' | 'Server Error' | 'Database Error' | 'Credential Error';
export class CustomError {
    status : number;
    message : string;
    type : ErrorType;
    additionalInfo : object;
  
    constructor(message: string, status: number = 500, type : ErrorType , additionalInfo: any = {}) {
      this.message = message;
      this.status = status;
      this.type = type || 'Server Error';
      this.additionalInfo = additionalInfo
    }
  }