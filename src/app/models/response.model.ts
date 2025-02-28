export interface IResponse<T>{
    status : number,
    msg : string,
    data? : T
}