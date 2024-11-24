const express = require("express");
const router = express.Router();
const Menu = require("../modules/Menu");

//creating POST and GET for menu

router.post("/", async (req, res) => {
    try {
      const newMenu = new Menu(req.body);
  
      const response = await newMenu.save();
  
      console.log("Menu Data Saved");
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
  
      res.status(500).json({ error: " Internal Server Error" });
    }
  });
  

  //POST method 
  router.get("/", async (req, res) => {
    try {
      const data = await Menu.find();
      console.log("Menu Data Extracted");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
  
      res.status(500).json({ error: " Internal Server Error" });
    }
  });


// query parameter
  
  router.get("/:taste", async(req,res)=>{ // : define the variable
    try {
       const taste = req.params.taste;
       
       if(taste == "spicy" || taste == "sweet" || taste == "sour"){
        const response = await Menu.find({taste:taste});
       console.log("Menu Data Extracted");
       res.status(200).json(response);
       }else{
        res.status(404).json({error:"Taste not found"});
       }
       
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: " Internal Server Error" });
    }
  })


  // update menu

  router.put("/:id", async (req,res) =>{
    try {
      const menuId = req.params.id;
      const updatedMenuData = req.body;

      const response = await Menu.findByIdAndUpdate(menuId,updatedMenuData,{
        new:true,
        runValidators:true
      })
      if(!response){
        return res.status(404).json({error:"Menu not found"});
      }
      console.log("Menu Data Updated");
      res.status(200).json(response);
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: " Internal Server Error" });
      
    }
  })

// delete menu data
router.delete("/:id", async (req,res)=>{
  try {
    const menuId = req.params.id;
    const response = await Menu.findByIdAndDelete(menuId);

    if(!response){
      return res.status(404).json({error:"Menu not found"});
    }

    console.log("Menu Data Deleted");
    res.status(200).json({message:"Menu data deleted"});

    

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: " Internal Server Error" });
    
  }
})


  module.exports = router;