const { Category } = require("../models");

module.exports = {
  createCatgeory: async (req, res) => {
    try {
      const category = await Category.create({
        category_name: req.body.category_name,
      });
      if (!category) {
        return res.status(401).json({ error: "Invalid Category" });
      }
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getCatgeory: async (req, res) => {
    try {
      const categories = await Category.findAll();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  editCategory: async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ error: "Category Not Found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateCatgeory: async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);
      if (category) {
        category.category_name = req.body.category_name;
        await category.save();
        res.json(category);
      } else {
        res.status(404).json({ error: "Category Not Found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  deleteCatgeory: async (req, res) => {
    try {
      const result = await Category.destroy({ where: { id: req.params.id } });
      if (result) {
        res.json({ message: "Category deleted succesfully" });
      } else {
        res.status(404).json({ error: "Category not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
