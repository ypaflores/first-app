export class Notizia { 
    title: string; 
    description:string;
    category: string;
    state:string;
    
    constructor(title: string,  des: string,  ctg: string,state:string) { 
        this.title = title; 
        this.description= des; 
        this.category=ctg;
        this.state=state;
    } 
} 