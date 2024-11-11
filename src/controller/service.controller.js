const { Service, Category, Service_Price } = require("../models");

module.exports = {
  createCategoryService: async (req, res) => {
    try {
      const service = await Service.create({
        category_id: req.params.category_id,
        service_name: req.body.service_name,
        type: req.body.type
      });
      if (!service) {
        return res.status(401).json({ error: "Invalid Service" });
      }
      if(service){
        const servicePrice = await Service_Price.create({
          service_id: service.id,
          duration: req.body.duration,
          price: req.body.price,
          type: req.body.type
        });
      }
      res.status(201).json(service);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getCategoryService: async (req, res) => {
    try {
      const categoryServices = await Service.findAll({
        where: { category_id: req.params.category_id },
        include: [
          {
            model: Category,
            attributes: ["id", "category_name"],
          },
          {
            model: Service_Price,
            attributes: ["id", "price"],
          },
        ],
      });
      res.json(categoryServices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  editCategoryService: async (req, res) => {
    try {
      const categoryService = await Service.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: Category,
            attributes: ["id", "category_name"],
          },
          {
            model: Service_Price,
            attributes: ["id", "price"],
          },
        ],
      });
      res.json(categoryService);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateCategoryService: async (req, res) => {
    try {
      const categoryService = await Service.findOne({
        where: { id: req.params.id, category_id: req.params.category_id },
        include: [
          {
            model: Category,
            attributes: ["id", "category_name"],
          },
          {
            model: Service_Price,
            attributes: ["id", "price"],
          },
        ],
      });
      const servicePrice = await Service_Price.findOne({where: {service_id:categoryService.id}});
      if(servicePrice){
        servicePrice.duration = req.body.service_name;
        servicePrice.type = req.body.type;
        servicePrice.price = req.body.price;
      }
      if (categoryService) {
        categoryService.service_name = req.body.service_name;
        categoryService.type = req.body.type;
        await categoryService.save();
        res.json(categoryService);
      } else {
        res.status(404).json({ error: "category Service Not Found" });
      }
    
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  deleteCategoryService: async (req, res) => {
    try {
      const result = await Service.destroy({ where: { id: req.params.id } });
      if (result) {
        res.json({ message: "Service deleted succesfully" });
      } else {
        res.status(404).json({ error: "Service not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
