const express = require("express");
const router = express.Router();
const MenuItem = require("../models/menuItem");

// GET route to retrieve all menu items
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).send({ msg: "Server Error" });
  }
});

// POST route to create a new menu item
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).send("Name and price are required");
  }

  try {
    const newMenuItem = new MenuItem({ name, description, price });
    await newMenuItem.save();
    res.status(201).json(newMenuItem);
  } catch (err) {
    res.status(500).send({ msg: "Server Error" });
  }
});

//the id is going to be the id of the menu item that we want to update
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const menuItem = await MenuItem.findByIdAndUpdate(
      id,
      //extractign data from the request body
      { name, description, price },
      { new: true, runValidators: true } //this is to make sure that the data is validated
    );
    //if the menu item is not found it returns 404
    if (!menuItem) {
      return res.status(404).send("Menu item not found");
    }
    //if the menu item is found it updates the menu item as json
    res.json(menuItem);
  } catch (err) {
    // if there is a server error it returns 500
    res.status(500).send({ msg: "Server Error" });
  }
});

//To delete a menu item

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    //find the menu item by id and delete it
    const menuItem = await MenuItem.findByIdAndDelete(id);
    if (!menuItem) {
      return res.status(404).send("Menu item not found");
    }
    res.json({ msg: "Menu item deleted" });
  } catch (err) {
    res.status(500).send({ msg: "Server Error" });
  }
});

module.exports = router;
