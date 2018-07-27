export class News { 
    title: string; 
    date: Date; 
    imagePreviewUrl: string 
    imageUrl: string; 
    text: string; 
 
    constructor(title: string, date: Date, imagePreviewUrl: string, imageUrl: string, text: string) { 
        this.title = title; 
        this.date = date; 
        this.imagePreviewUrl = imagePreviewUrl;      
        this.imageUrl = imageUrl; 
        this.text = text; 
    } 
} 