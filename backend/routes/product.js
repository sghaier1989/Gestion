var express = require('express');
var router = express.Router();
// coonecte to database
var dbConn  = require('../lib/db');

// display  all product
router.get('/', function(req, res, next) {

    dbConn.query('SELECT * FROM `gestion`.`product` ORDER BY id desc',function(err,rows)     {

        if(err) {
            req.flash('error', err);
            res.render('product',{data:''});
        } else {
            res.send(rows)
            console.log('rows',rows)
        }
    });
});

// display one product with id
router.get('/:id', function(req, res) {
    
    const id = parseInt(req.params.id, 10);
    dbConn.query('SELECT * FROM `gestion`.`product` \
    where id=' + id,function(err,rows)     {

        if(err) {
            req.flash('error', err);
            res.render('product',{data:''});
        } else {
            // 
            res.send(rows)
            res.status(200).json();
            //console.log('rows',rows)
        }
    });
});

//  add new product 
router.post('/add', function(req, res, next) {

    var { wording ,description,picture,mark_product } =  req.body
    let errors = false;

    if(!wording || !description|| !picture|| !mark_product) {
        errors = true;
       // res.send("Error add product : parameters are missing")
        res.status(403).json({'error':'parameters are missing'})
    }
    // if no error
    if(!errors) {

        var product = {
            wording,
            description,
            picture,
            mark_product
        }
        // insert query
        dbConn.query('INSERT INTO `gestion`.`product` SET ?', product, function(err, result) {
            //if(err) throw err
            if (err) {
                //req.flash('error', err)
                res.send('Error product : error query add product')

            } else {
                //req.flash('success', 'product successfully added');
                res.send('product successfully added')
                
            }
        })
    }
})


// delete product
router.get('/delete/:id', function(req, res, next) {

    const id = parseInt(req.params.id.trim(), 10);

    dbConn.query('DELETE FROM `gestion`.`product` WHERE id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            res.send('Error product : error query add product')            
        } else {
            // set flash message
            res.send('product successfully deleted! ID = ' + id)
            
        }
    })
})

// editer put patch 

module.exports = router;
