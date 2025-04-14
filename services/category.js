const Category = require("../models/Category");
const Image = require("../models/Image");
const fs = require("fs");
const path = require("path");

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

const uploadImages = async (file,categoryId) => {
  try {

    const existCategoryImage = await Image.findOne({categoryId});

    if(existCategoryImage){
      throw new Error('This category have a image')
    }

    const img = new Image({
      name: file.originalname,
      img: {
        data: fs.readFileSync(file.path),
        contentType: file.mimetype,
      },
      categoryId,
    });

    const imagePath = path.resolve(file.path); // Kesin dosya yolu

    fs.unlink(imagePath, (err) => {
      if (err) console.error("Temp File Not Delete:", err);
      else console.log(`Deleted: ${file.filename}`);
    });

  

    const saved = await img.save();

    let data = {
      imageId: img._id
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: categoryId },
      data
    );

    if(!updatedCategory){
      throw new Error('Image upload error - category')
    }
    return saved;
  } catch (error) {
    throw new Error("Category image upload error " + error.message);
  }
};


const getCategoryImage = async(id) =>{
  try{

    if(!id){
      throw new Error("id must be in");
    }
    const image = await Image.findOne({_id:id});
    return image;
    
  }catch(error){
    throw new Error(error.message);
  }
};

const deleteImage = async(id) =>{
  try{

    if(!id){
      throw new Error('id must be in');
    }

    const img = await Image.deleteOne({_id:id})

    return img;

  }catch(error){
    throw new Error('Delete Image Error: '+error.message)
  }

}


module.exports = {
  createCategory,
  getAllCategory,
  getCategoryById,
  deleteCategory,
  updateCategory,
  uploadImages,
  getCategoryImage,
  deleteImage
};
