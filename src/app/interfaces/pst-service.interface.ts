export interface pstServices {    
    title?: string,
    hostName?: string,
    isPublished?: boolean,
    price?: number,        
}

export interface pstServicesFirebase {
    id?: string;
    title?: string,
    hostName?: string,
    isPublished?: boolean,
    price?: number,
    imgSrc: string        
}