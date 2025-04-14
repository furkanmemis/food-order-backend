const {
  createCategory,
  getAllCategory,
  getCategoryById,
  deleteCategory,
  updateCategory,
  uploadImages,
  getCategoryImage,
  deleteImage
} = require("../services/category");

exports.create = async (req, res) => {
  try {
    const name = req.body.name;

    if (!name) {
      res.status(404).json({ "Category Error ": "Category name is not found" });
    }

    const result = await createCategory(name);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ "Category Error": error });
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await getAllCategory();

    if (!result) {
      res.status(404).json({ "Category Error: ": "Category Get All" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ "Category Error": error });
  }
};

exports.getByID = async (req, res) => {
  try {
    const id = req.params;

    if (!id) {
      res.status(404).json({ "Category Error": "Id must be" });
    }

    const category = await getCategoryById(id);

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ "Category Error": error });
  }
};

exports.categoryDelete = async (req, res) => {
  try {
    const id = req.params;

    if (!id) {
      res.status(404).json({ "Category Delete Error": "Id must be in" });
    }

    const result = await deleteCategory(id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ "Category Delete Error": error });
  }
};

exports.categoryUpdate = async (req, res) => {
  try {
    const id = req.params;
    const data = req.body;

    if (!id) {
      res.status(404).json({ "Category Update Error": "Id not found" });
    }
    if (!data.name) {
      res.status(404).json({ "Category Update Error": "name not found" });
    }

    const result = await updateCategory(data, id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ "Category Update Error": error });
  }
};

