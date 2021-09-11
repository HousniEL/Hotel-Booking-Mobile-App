
import { roomCharacteristics } from "../screens/constants";

export default class Hotel_Room_Type{
    constructor(object){
        this.id = object.id;
        this.Room_Type = object.Room_Type;
        this.Num_Persons = object.Num_Persons;
        this.Price = object.Price ;
        this.Characteristics = object.characteristics;
        this.Size = object.Size;
    }

    getAllCharacteristics(){
        let i = 0;
        var setChar = []
        for(let char of this.Characteristics){
            if(char === "1") setChar.push(roomCharacteristics[i]);
            i++;
        }
        return setChar;
    }
    
    getThreeCharacteristics(){
        let i = 0;
        var setChar = []
        for(let char of this.Characteristics){
            if(char === "1") setChar.push(roomCharacteristics[i]);
            if(setChar.length === 3) break;
            i++;
        }
        return setChar;
    }
    
}