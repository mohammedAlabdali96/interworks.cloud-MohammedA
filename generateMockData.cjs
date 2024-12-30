const fs = require('fs');

// Define available categories
const categories = ['Electronics', 'Fashion', 'Home'];

const generateRandomName = () => {
  const format = Math.floor(Math.random() * 3);
  
  const generateLetters = (length) => {
    return Array.from(
      { length }, 
      () => String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join('');
  };

  switch(format) {
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

// Generate random categories (1-3 categories per product)
const generateRandomCategories = () => {
  const numCategories = Math.floor(Math.random() * 3) + 1; // 1 to 3 categories
  const shuffled = [...categories].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numCategories);
};

const generateProducts = (count) => {
  const products = [];
  for (let i = 1; i <= count; i++) {
    products.push({
      id: i,
      name: generateRandomName(),
      price: (Math.random() * 100).toFixed(2),
      image: `https://via.placeholder.com/150?text=Product+${i}`,
      description: `Description for Sample Product ${i}.`,
      categories: generateRandomCategories()
    });
  }
  return products;
};

const generateMockData = () => {
  const totalItems = 150;
  const pageSize = 10;
  const totalPages = Math.ceil(totalItems / pageSize);

  const data = {
    data: generateProducts(totalItems),
    pagination: {
      currentPage: 1,
      totalPages,
      totalItems,
      pageSize
    }
  };

  fs.writeFileSync('src/mock/products.json', JSON.stringify(data, null, 2));
  console.log('Mock data generated successfully!');
};

generateMockData();
