export class ResponseGenerator{

    static responseGenerator(status: boolean, data: any, errorCode: string){
        return {
            'status': status,
            'data': data,
            'errorCode': errorCode,
        }
    }
}