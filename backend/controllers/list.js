const db = require('../database').db;



exports.getDatabaseList = (req, res, next) => {
    db.each('select * from list' , (err,data) => {
        if(err){
            return console.error(err.message);
        }
            console.log(data);
    })
}

exports.create = (req, res, next) => {  
    db.run('insert into list (user_id, description) values (?,?)',[req.body.userId , req.body.description], (err) => { 
    
        if (err) {
            res.status(400).json({ err });
        }
         else
            res.status(201).json({ message: 'Liste créée !' });
    })
}

exports.delete = (req, res, next) => {  
    db.run('delete from list where id = ?',[req.body.id], (err) => { 
    
        if (err) {
            res.status(400).json({ err });
        }
         else
            res.status(201).json({ message: 'Liste effacée !' });
    })
}