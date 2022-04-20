export interface IPlaces {
    id: string;
    attachment: {
        signedUrl: string;
    };
    direction: string;
    name: string;
    schedules?: {
        id: string;
        day: string;
        dtEnd: string;
        dtStart: string;
        placeId: string;
    }[]
}

export interface ISelectedPlace {
    place: IPlaces;
    hourStart: string;
    day: number;
}

export interface ISaveBooking {
    placeId: string;
    day: string;
    dtStart: string;
    dtEnd: string;
}

export interface INewUser {
    fullName: string;
    email: string;
    password: string;
}