export class NewResponse { 
    userId: number; 
    id: number; 
    title: string ;
    body: string;  

    public toString():String{
        return "User ID : " + this.userId +"  "+
        "Id : " + this.id + "  "+
        "Title : " + this.title + "  "+
        "Body : " + this.body;
    }
} 