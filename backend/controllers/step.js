const db = require('../database').db;

exports.StepList = (req, res, next) => {
    db.all('select * from step where task_id = ?', [req.body.task_id], (err,data) => {
        if(err){
            return console.error(err.message);
        }
        else{
            res.status(201).json(data)
        }
    })
}

exports.create = (req, res, next) => {  
    db.run('insert into step (task_id, description, completed) values (?,?,0)',[req.body.task_id , req.body.description !== "" ? req.body.description : "Nouvelle étape"], (err) => { 
    
        if (err) {
            res.status(400).json({ err });
        }
         else
            res.status(201).json({ message: ' Etape créée !' });
    })
}

exports.delete = (req, res, next) => {  
    db.run('delete from step where id = ?',[req.body.id], (err) => { 
    
        if (err) {
            res.status(400).json({ err });
        }
         else
            res.status(201).json({ message: 'Etape effacée !' });
    })
}

exports.update = (req, res, next) => {
    db.run('update step set description = ? where id = ?',[req.body.description, req.body.id], (err) => {
      if (err) {
        res.status(400).json({ err });
      }
      else
        res.status(201).json({ message: 'Etape modifiée' });  
    })
}

exports.complete = (req, res, next) => {
    db.run('update step set completed = ? where id = ?',[req.body.completed ? 1 : 0, req.body.id], (err) => {
      if (err) {
        res.status(400).json({ err });
      }
      else
        res.status(201).json({ message: 'Etape complétée' });
    })
}