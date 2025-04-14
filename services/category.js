const Category = require("../models/Category");


const createCategory = async (name) => {
  try {
    if (!name) {
      throw new Error("Name is neccessary for category");
    }

    const existCategory = await Category.findOne({ name: name });

    if (existCategory) {
      throw new Error("Category name already exist");
    }

    const newCategory = new Category({ name: name });

    newCategory.save();

    return { result: "Success" };
  } catch (error) {
    throw new Error("Category create error: " + error.message);
  }
};

const getAllCategory = async () => {
  try {
    const allCategory = await Category.find();

    return allCategory;
  } catch (error) {
    throw new Error("Category get all error: " + error.messsage);
  }
};

const getCategoryById = async (id) => {
  try {
    if (!id) {
      throw new Error("ID is must be");
    }

    const category = await Category.findById({ _id: id.id });

    if (!category) {
      throw new Error("Category get by id error");
    }

    return category;
  } catch (error) {
    throw new Error("Category get by id error: " + error.message);
  }
};

const deleteCategory = async (id) => {
  try {
    if (!id) {
      throw new Error("Id must be in");
    }

    const currentCategory = await Category.findById({ _id: id.id });

    if (!currentCategory) {
      throw new Error("Any category not found with this id");
    }

    const deletedCategory = await Category.findByIdAndDelete({ _id: id.id });

    if (!deletedCategory) {
      throw new Error("Category delete error");
    }

    return { result: "Success" };
  } catch (error) {
    throw new Error("Category Delete Error: " + error.message);
  }
};

const updateCategory = async (data, id) => {
  try {
    if (!id) {
      throw new Error("Id must be in");
    }

    if (!data) {
      throw new Error("data must be in");
    }

    const currentCategory = await Category.findById({ _id: id.id });

    if (!currentCategory) {
      throw new Error("Any category is not found with this id");
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: id.id },
      data
    );

    if (!updatedCategory) {
      throw new Error("Category update error");
    }

    return { result: "Success" };
  } catch (error) {
    throw new Error("Category Update error: " + error.message);
  }
};



module.exports = {
  createCategory,
  getAllCategory,
  getCategoryById,
  deleteCategory,
  updateCategory,
};
