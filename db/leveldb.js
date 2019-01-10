var levelup = require('levelup');
var db = levelup('./yijiebuyi');

// put a key & value
db.put('name', 'LevelUP', function (err) {
    if (err) return console.log('Ooops!', err) // some kind of I/O error

    // fetch by key
    db.get('name', function (err, value) {
        if (err) return console.log('Ooops!', err) // likely the key was not found

        // ta da!
        console.log('name=' + value)
    })
})