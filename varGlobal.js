import Hotel from "./models/Hotel";
import Hotel_Room_Type from "./models/Hotel_Room_Type";

var single = new Hotel_Room_Type({
    Room_Type : "Single",
    Num_Persons : 1,
    Price: 125,
    Characteristics: "011110110011100",
    Size: 39
})
var double = new Hotel_Room_Type({
    Room_Type : "Double",
    Num_Persons : 2,
    Price: 175,
    Characteristics: "111100110011010",
    Size: 42
})
var triple = new Hotel_Room_Type({
    Room_Type : "Triple",
    Num_Persons : 3,
    Price: 200,
    Characteristics: "111011110111010",
    Size: 55
})
var quad = new Hotel_Room_Type({
    Room_Type : "Quad",
    Num_Persons : 4,
    Price: 250,
    Characteristics: "111100111111011",
    Size: 75
})
var doubleDouble = new Hotel_Room_Type({
    Room_Type : "Double-double",
    Num_Persons : 4,
    Price: 225,
    Characteristics: "111100110011111",
    Size: 60
})

export const hotel1 = new Hotel({
    hotel: {
        Hotel_Name : "Royal Atlas & Spa",
        Description : "Lorem ipsum dolor sit amet consectetur Totam dolore ut sequi non reprehenderit, ducimus hic quaerat aliquam, beatae earum quasi exercitationem corrupti aperiam deleniti voluptatum vero, nam iste autem",
        Country : "Morocco",
        City : "Agadir",
        Address : "Baie d'agadir",
        ZipCode : 40000,
        Main_Phone_Number : "+212 XXX-XXXXXX",
        Fax_Number : "",
        Company_Mail_Address : "ras.hotel@mail.com",
        Services : '11110101011010',
        Stars : 4,
        Rate : 3.5,
        images : [
            { url : "https://source.unsplash.com/1024x768/?summer" },
            { url : "https://source.unsplash.com/1024x768/?fall"},
            { url : "https://source.unsplash.com/1024x768/?winter"},
            { url : "https://source.unsplash.com/1024x768/?spring"}
        ],
        rooms: [single, double, triple, quad, doubleDouble]
    }
})
export const hotel2 = new Hotel({
    hotel : {
        Hotel_Name : "Le Meridien N'Fis",
        Description : "Lorem ipsum dolor sit amet consectetur Totam dolore ut sequi non reprehenderit, ducimus hic quaerat aliquam, beatae earum quasi exercitationem corrupti aperiam deleniti voluptatum vero, nam iste autem",
        Country : "Morocco",
        City : "Marrakech",
        Address : "Le Meridien N'Fis",
        ZipCode : 40000,
        Main_Phone_Number : "+212 XXX-XXXXXX",
        Fax_Number : "",
        Company_Mail_Address : "mnf.hotel@mail.com",
        Services : '11110101011010',
        Stars : 5,
        Rate : 4,
        images : [
            { url : "https://source.unsplash.com/1024x768/?city" },
            { url : "https://source.unsplash.com/1024x768/?hotel"},
        ],
        rooms: [single, double, triple, quad, doubleDouble]
    }
})

export const hotels = [hotel1, hotel2];