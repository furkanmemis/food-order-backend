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

exports.uploadImage = async (req, res) => {
  try {
    const params = req.params;

    if (!params) {
      res.status(404).json({ message: "Id must be in" });
    }

    if (!req.file) {
      res.status(404).json({ message: "file must be in" });
    }

    const result = await uploadImages(req.file, params.id);
    res
      .status(200)
      .json({
        message: "Image upload success",
        id: result._id,
        name: result.name,
      });
  } catch (error) {
    res.status(500).json({ "Image upload error": error.message });
  }
};

exports.getImage = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ Error: "Missing id parameter" });
      }
  
      const image = await getCategoryImage(id);
  
      if (!image || !image.img?.data) {
        return res.status(404).send("Image not found");
      }
  
      res.set("Content-Type", "image/png"); // içeriğin tipi
      res.send(image.img.data); // resmi direkt gönderiyoruz
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  };

exports.deleteImage = async(req,res)=>{
    try{

        const params = req.params;

        const img = await deleteImage(params.id);

        if(img){
            res.status(200).json({message:"Success"})
        }else{
            res.status(400).json({message:"fail"})
        }

    }catch(error){
        res.status(500).json({Error:error.message});
    }
}
