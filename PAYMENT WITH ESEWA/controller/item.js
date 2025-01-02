const Item = require("../model/item");

const addItems = async (req, res) => {
  try {
    const { name, price, category } = req.body;

    const items = new Item({
      name: name,
      price: price,
      category: category,
    });

    const item = await items.save();

    res.status(200).json({ msg: "Item Added", item });
  } catch (error) {
    console.log(err);
    res.status(400).json({ msg: "Error Adding Items" });
  }
};

module.exports = addItems;
