
import { services } from "../screens/constants";

export default class Hotel{
    constructor(object){
        this.Hotel_Name = object.Hotel_Name;
        this.Description = object.Description;
        this.Country = object.Country;
        this.City = object.City;
        this.Address = object.Address;
        this.ZipCode = object.ZipCode;
        this.Main_Phone_Number = object.Main_Phone_Number;
        this.Fax_Number = object.Fax_Number;
        this.Company_Mail_Address = object.Company_Mail_Address;
        this.Services = object.Services;
        this.Stars = object.Stars;
        this.Rate = object.Rate;
        this.images = object.images;
        this.rooms = object.rooms;
    }

    getServices(){
        let i = 0;
        var setSer = []
        for(let char of this.Services){
            if(char === "1") setSer.push(services[i]);
            i++;
        }
        return setSer;
    }

    getStars(){
        var starArray = [false, false, false, false, false];
        for(let i = 0; i < this.Stars; i++){
            starArray[i] = true;
        }
        return starArray;
    }

    getMinPrice(){
        var min = +Infinity;
        for(let room of this.rooms){
            if( room.Price < min ) min = room.Price; 
        }
        return min;
    }

    getRoomsType(table){
        var roomsType = [];
        for(let room of table){
            roomsType.push(room.Room_Type)
        }
        return roomsType;
    }

    getRoomsThatFit(numOfPerson){
        var rightRooms = this.rooms.filter( room => {
            return room.Num_Persons >= numOfPerson
        } )
        return rightRooms;
    }

}