const fs = require('fs');

const generateProducts = (count) => {
  const products = [];
  for (let i = 1; i <= count; i++) {
    products.push({
      id: i,
      name: `Sample Product ${i}`,
      price: (Math.random() * 100).toFixed(2),
      image: `https://via.placeholder.com/150?text=Product+${i}`,
      description: `Description for Sample Product ${i}.`
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
