
    
    const db = require('../models')
    const Op = db.Sequelize.Op;



// getting pagination numbers and default if not provided

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };
  
  const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: products } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, products, totalPages, currentPage };
  };
  



// retrieve all products in the database
const product_get = async (req,res)=>{

    let response = {};


    // this code is to fetch all products without pagination
    // try {
    //     const allProduct = await db.Product.findAll();
    //     if(! allProduct){
    //        // there is nothing to show but success
    //         res.status(200).send(response);
    //     }else{
    //         // we show all products
    //         res.status(200).send(allProduct);
    //     }        
    // } catch (error) {
    //     // there is an error we send status 500
    //     res.status(500).send(error);        
    // }


    // this code fetch all products with limit pagination
    // example of get query : http://localhost:5000/api/products?page=0&size=1
       
        try {
            const { page, size} = req.query;
            const { limit, offset } = getPagination(page, size);
            const data = await db.Product.findAndCountAll({ offset: offset, limit: limit });
            console.log(data)
            if(! data){
               // there is nothing to show but success
                res.status(200).send(response);
            }else{
                // we show all products
                let allProduct = getPagingData(data,page,limit)
                res.status(200).send(allProduct);
            }        
        } catch (error) {
            // there is an error we send status 500
            res.status(500).send(error);        
        }
    

}


// add a new product to the database
const product_post = async (req,res)=>{

    //console.log("le body",typeof req.body)

    let response = {};

    try {      
        
        db.Product.create(req.body)
        .then((result)=>{

            res.status(201).send(result);

        })
        .catch(e=>{
            
            //console.log("erreur 1",e)

            res.status(500).send(response);
        })
                      
        
    } catch (error) {

        //console.log("erreur 2",error);

        res.status(500).send(response)
        
    }  

}


// show details of a product
const product_show = async (req,res)=>{

    let result = {};

    try {

        let id = req.params.id;

        let oneProduct = await db.Product.findAll(
            {
                where:{id:id}
            }
        );

        if(!oneProduct){

            throw new Error("no such product")
        }else{

            res.status(200).send(oneProduct);
        }

        

        
    } catch (error) {

        console.log("erreur 1",error);

        //result = {error:error.message}

        res.status(400).send(error)
        
    }

}


/// update a product details in the database
const product_put = async(req,res)=>{

    let result = {}

    try {

        let id = req.params.id;

        let updatedProduct = await db.Product.update(
            req.body, {
            where: {
              id: id
            }
          })

        if(!updatedProduct){

            throw new Error("no such product")
        }else{

            res.status(200).send("success")
        }
        
    } catch (error) {

        console.log(error)

        res.status(400).send(error)

        
    }



}

// delete a product from the database
const product_delete = async (req,res)=>{

    let result = {}

    try {

        let id = req.params.id; 

        let deletedProduct = await db.Product.destroy( {
            where:{id:id}
        });

        if(!deletedProduct){

            throw new Error("nothing to delete")
        }else{

            res.status(200).send("success")
        }
        
    } catch (error) {

        console.log(error)

        res.status(400).send(error)

        
    }    


}

// search by name 
const product_search = async(req,res)=>{

    const {title} = req.query;
    //console.log(query)

    // let response = {};

    try {

        const searchResult = await db.Product.findAndCountAll( {

            where: { title: { [Op.like]: `%${title}%` } }
            }            
            );

        if(!searchResult){

            throw new Error("no products in the database");
        }else{

            res.status(200).send(searchResult);
        }
        
    } catch (error) {

        res.status(500).send(error);
        console.log(error)

        
    }


}

module.exports = {

    product_get,
    product_post,
    product_show,
    product_put,
    product_delete,
    product_search


}