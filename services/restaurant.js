const Restaurant = require("../models/Restaurant");
const Category = require("../models/Category");
const User = require("../models/User");

const create = async (data, userId) => {
  try {
    const { name, address, categories, type } = data;

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
      let { name, address, categories, vendorInformation, _id, type } = rest;

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

    let { name, address, vendorInformation, categories, type } = restaurant;

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
      type
    };
  } catch (error) {
    throw new Error("Restaurant get by id error: " + error);
  }
};

module.exports = { create, getAll, getById };
