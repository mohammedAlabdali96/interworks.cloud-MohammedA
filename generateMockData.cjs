const fs = require("fs");

const categories = ["Electronics", "Fashion", "Home"];

const generateRandomName = () => {
  const format = Math.floor(Math.random() * 3);

  const generateLetters = (length) => {
    return Array.from({ length }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join("");
  };

  switch (format) {
    case 0:
      return generateLetters(2);
    case 1:
      return generateLetters(4);
    case 2:
      return `${generateLetters(2)} ${generateLetters(4)}`;
    default:
      return generateLetters(2);
  }
};

const generateRandomCategories = (excludeElectronics = false) => {
  const availableCategories = excludeElectronics
    ? categories.filter((cat) => cat !== "Electronics")
    : categories;

  const numCategories = Math.floor(Math.random() * 2) + 1; // 1 to 2 categories
  const shuffled = [...availableCategories].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numCategories);
};

const generateProducts = (count) => {
  const products = [];

  // First generate 4 products with Electronics
  for (let i = 1; i <= 4; i++) {
    products.push({
      id: i,
      name: generateRandomName(),
      price: (Math.random() * 100).toFixed(2),
      image: `https://via.placeholder.com/150?text=Product+${i}`,
      description: `Description for Sample Product ${i}.`,
      categories: ["Electronics"],
    });
  }

  // Generate remaining products without Electronics
  for (let i = 5; i <= count; i++) {
    products.push({
      id: i,
      name: generateRandomName(),
      price: (Math.random() * 100).toFixed(2),
      image: `https://via.placeholder.com/150?text=Product+${i}`,
      description: `Description for Sample Product ${i}.`,
      categories: generateRandomCategories(true),
    });
  }

  return products;
};

const generateMockData = () => {
  const totalItems = 150;
  // we will not use this pageSize and totalPages in the client side, becuase this number will not be updated when the user is search or sorting ,
  //  if we want to use it, we need to add search and sortlogic here
  const pageSize = 10;
  const totalPages = Math.ceil(totalItems / pageSize);

  const data = {
    data: generateProducts(totalItems),
    pagination: {
      currentPage: 1,
      totalPages,
      totalItems,
      pageSize,
    },
  };

  fs.writeFileSync("src/mock/products.json", JSON.stringify(data, null, 2));
  console.log("Mock data generated successfully!");
};

generateMockData();
