const db = require('../database').db;

// lire les tasks d'une liste specifier par son id 
exports.getTasksList = (req, res, next) => {
    db.all('select * from task where list_id = ?', [req.body.list_id], (err,data) => {
        if(err){
            return console.error(err.message);
        }
        else{
            res.status(201).json(data)
        }
    })
}
 // but recup toute les taches qui possede une deadline et qui appartienne a une liste creer par un utilisateur donc faire jointure
exports.getTasksDeadline = (req, res, next) => {
    db.all('select * from task inner join list on list_id = list.id where user_id = ? and deadline != "" order by 5 desc', [req.body.user_id], (err,data) => {
        if(err){
            return console.error(err.message);
        }
        else{
            res.status(201).json(data)
        }
    })
}

exports.create = (req, res, next) => {  
    db.run('insert into task (list_id, title, description, deadline, completed) values (?,?,?,?,0)',[req.body.list_id , req.body.title !== "" ? req.body.title : "Nouvelle tâche", "", ""], (err) => { 
    
        if (err) {
            res.status(400).json({ err });
        }
         else
            res.status(201).json({ message: ' Tâche créée !' });
    })
}

exports.delete = (req, res, next) => {  
    db.run('delete from task where id = ?',[req.body.id], (err) => { 
    
        if (err) {
            res.status(400).json({ err });
        }
         else
            res.status(201).json({ message: 'Tâche effacée !' });
    })
}

exports.update = (req, res, next) => {
    db.run('update task set title = ? , description = ?, deadline = ? where id = ?',[req.body.title, req.body.description, req.body.deadline, req.body.id], (err) => {
      if (err) {
        res.status(400).json({ err });
      }
      else
        res.status(201).json({ message: 'Tâche modifiée' });  
    })
}

exports.complete = (req, res, next) => {
    db.run('update task set completed = ? where id = ?',[req.body.completed ? 1 : 0, req.body.id], (err) => {
      if (err) {
        res.status(400).json({ err });
      }
      else
        res.status(201).json({ message: 'Tâche complétée' });
    })
}