const Restaurant = require("../models/Restaurant");
const Category = require("../models/Category");
const User = require("../models/User");
const RestaurantCategory = require('../models/RestaurantCategory');
const RestaurantFood = require("../models/RestaurantFood");

const create = async (data, userId) => {
  try {
    const { name, address, categories, type, image } = data;

    if (!name || !address || !categories) {
      throw new Error("name and address is required.");
    }

    if (!userId) {
      throw new Error("Restaurant must have one vendor");
    }

    const exist = await Restaurant.findOne({ name });

    if (exist) {
      throw new Error("This restaurant name already exist!");
    }

    const newRestaurant = new Restaurant({
      name,
      address,
      categories,
      vendorInformation: userId,
      type,
      image
    });

    await newRestaurant.save();

    console.log(name + " restaurant created.");

    return { result: "Success" };
  } catch (error) {
    throw new Error("Restaurant create error: " + error);
  }
};

const getAll = async () => {
  try {
    const allRestaurant = await Restaurant.find();

    if (allRestaurant.length === 0) {
      return [];
    }

    let restaurants = [];

    for (const rest of allRestaurant) {
      let { name, address, categories, vendorInformation, _id, type, image } = rest;

      let categoryDocs = await Category.find(
        { _id: { $in: categories } },
        "name"
      );
      let categoryNames = categoryDocs.map((cat) => cat.name);
      let vendor = await User.findById(vendorInformation).select(
        "name surname _id email"
      );
      restaurants.push({
        id: _id,
        name,
        address,
        categories: categoryNames,
        vendorInformation: vendor,
        type,
        image,
      });
    }

    return restaurants;
  } catch (error) {
    throw new Error("Restaurant get all Error: " + error);
  }
};

const getById = async (id) => {
  try {
    if (!id) {
      throw new Error("id must be in params");
    }

    const restaurant = await Restaurant.findById({ _id: id });

    if (!restaurant) {
      return {};
    }

    let { name, address, vendorInformation, categories, type, image } = restaurant;

    let categoryDocs = await Category.find(
      { _id: { $in: categories } },
      "name"
    );
    let categoryNames = [];

    if (categoryDocs) {
      categoryNames = categoryDocs.map((cat) => cat.name);
    }

    let vendor = {};
    if (vendorInformation) {
      vendor = await User.findById(vendorInformation).select(
        "name surname _id email"
      );
    }

    return {
      id,
      name,
      address,
      vendorInformation: vendor,
      categories: categoryNames,
      type,
      image
    };
  } catch (error) {
    throw new Error("Restaurant get by id error: " + error);
  }
};

const createRestaurantCategory = async (data) =>{

  try{

    const restaurantId = data.restaurantId;
    const name = data.name;

    const currentRestaurant = await Restaurant.findOne({_id: restaurantId});

    if(!currentRestaurant){
      throw new Error('Any restaurant find with this id '+restaurantId);
    }

    if(!name){
      throw new Error('Restaurant category must have name');
    }


    const newRestaurantCategory = new RestaurantCategory({name, restaurantId});
    await newRestaurantCategory.save();

    console.log(name + " restaurant category is created");


    return {result: "Success"};

  }catch(error){
    throw new Error('Restaurant Category create error '+ error.message);
  }

};

const getAllRestaurantCategory = async(restaurantId)=>{

  try{

    const currentRestaurant = await Restaurant.findOne({_id:restaurantId});

    if(!currentRestaurant){
      throw new Error('Any restaurant not found with this id '+restaurantId);
    }

    const allCategory = await RestaurantCategory.find({restaurantId: restaurantId});


    if(!allCategory || allCategory.length === 0){
      return [];
    }

    return allCategory;

  }catch(error){
    throw new Error('Get all restaurant category error  '+ error.message);
  }

};

const createRestaurantFood = async(data) =>{
  try{

    const {name, price, restaurantId, restaurantCategoryId} = data;

    if(!name || !price || !restaurantId || !restaurantCategoryId){
      throw new Error('Name, price, restaurantId and restaurantCategoryId must be in body');
    }

    const existRestaurant = await Restaurant.findOne({_id:restaurantId});
    if(!existRestaurant){
      throw new Error('Any restaurant not found with this id '+restaurantId);
    }

    const existRestaurantCategory = await RestaurantCategory.findOne({_id:restaurantCategoryId});
    if(!existRestaurantCategory){
      throw new Error('Any restaurant category not found with this id '+restaurantCategoryId);
    }

    const newRestaurantFood = new RestaurantFood({name,price,restaurantCategoryId,restaurantId});

    await newRestaurantFood.save();

    console.log("Restaurant food created "+name);

    return {result: "Success"};
    
  }catch(error){
    throw new Error('Create restaurant food error '+error.message);
  }
};

const getAllRestaurantFood = async(data) => {
  try{

    const {restaurantId} = data;

    const allFood = await RestaurantFood.find({restaurantId});

    if(!allFood || allFood.length === 0){
      return [];
    }

    let foods = [];

    for(const food of allFood){
      const {name,price,restaurantId, restaurantCategoryId} = food;
      
      const restaurant = await Restaurant.findOne({_id:restaurantId}).select("name _id");
      const restaurantCategory = await RestaurantCategory.findOne({_id:restaurantCategoryId}).select("name _id");

      let f = {name,price,restaurant,restaurantCategory,id:food._id};

      foods.push(f);
    }

    return foods;

  }catch(error){
    throw new Error('Get all restaurant food error '+error.message);
  }
};

const deleteRestaurantFood = async(id, restaurantId) =>{
  try{

    const existFood = await RestaurantFood.findOne({_id: id, restaurantId: restaurantId});

    if(!existFood){
      throw new Error('Any restaurant not found with this id '+id);
    }

    const deleted = await RestaurantFood.deleteOne({_id:id, restaurantId: restaurantId});

    if(!deleted){
      throw new Error('Delete food error');
    }

    return{message: "Success"};

  }catch(error){
    throw new Error('Delete restaurant food error '+error.message);
  }
};

const deleteRestaurantCategory = async(id,restaurantId) => {
  try{

    if(!id || !restaurantId){
      throw new Error('Id and restaurandId should be have');
    }

    const existFood = await RestaurantFood.findOne({restaurantCategoryId: id})

    if(existFood){
      throw new Error('This category have a food')
    }

    const item = await RestaurantCategory.deleteOne({_id: id, restaurantId});

    if(!item){
      throw new Error ('Restaurant category delete error');
    }
    return{message: "Success"};

  }catch(error){
    throw new Error('Delete restaurant category error -> '+error.message);
  }
}

module.exports = { create, getAll, getById, createRestaurantCategory, getAllRestaurantCategory, createRestaurantFood, getAllRestaurantFood, deleteRestaurantFood, deleteRestaurantCategory };
