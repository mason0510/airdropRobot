require("../db/db")
let User=require("./gamestatus");

//添加更多
let user = new User({
    rows: [{
        id:3604,
        end_time:1547109005,
        red_cards: [
            25,
            43,
            17
        ],
        black_cards:[
            5,
            31,
            14
        ],
        symbol:"4,EOS",
        status:2,
        largest_winner:"self",
        largest_win_amount:"0.0000 EOS"
    }

    ],
    more: false,
});
let addUser=async ()=>{
    await User.create(user).catch(errmsg => {
        console.log("error" + errmsg)
    });
}

addUser()