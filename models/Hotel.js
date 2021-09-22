
import { services } from "../screens/constants";

export default class Hotel{
    constructor(object){
        this.Hotel_Name = object.hotel.Hotel_Name;
        this.Description = object.hotel.Description;
        this.Country = object.hotel.Country;
        this.City = object.hotel.City;
        this.Address = object.hotel.Address;
        this.ZipCode = object.hotel.ZipCode;
        this.Main_Phone_Number = object.hotel.Main_Phone_Number;
        this.Fax_Number = object.hotel.Fax_Number;
        this.Company_Mail_Address = object.hotel.Company_Mail_Address;
        this.Services = object.hotel.Services;
        this.Stars = object.hotel.Stars;
        this.Rate = object.hotel.Rate;
        this.Num_opinions = object.hotel.Num_opinions;
        this.images = object.hotel.images.imgs;
        this.rooms = [];
    }

    setRooms(object){
        this.rooms = object;
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
            roomsType.push({ id: room.id, type: room.Room_Type, price: room.Price })
        }
        return roomsType;
    }

    getRoomsThatFit(numOfPerson){
        var rightRooms = this.rooms.filter( room => {
            return room.Num_Persons >= numOfPerson
        } )
        return rightRooms;
    }

    getImages(){
        var imgs = [];
        for(let i = 1; i < this.images.length + 1; i++){
            imgs.push({ uri : this.images[i-1]['img'+i] });
        }
        return imgs;
    }

}