const fs = require('fs');

const generateRandomName = () => {
  // Randomly choose the name format
  const format = Math.floor(Math.random() * 3); // 0, 1, or 2
  
  const generateLetters = (length) => {
    return Array.from(
      { length }, 
      () => String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join('');
  };

  switch(format) {
    case 0: // First 2 letters
      return generateLetters(2);
    case 1: // First 4 letters
      return generateLetters(4);
    case 2: // First 2 + space + 4
      return `${generateLetters(2)} ${generateLetters(4)}`;
    default:
      return generateLetters(2);
  }
};


const generateProducts = (count) => {
  const products = [];
  for (let i = 1; i <= count; i++) {
    products.push({
      id: i,
      name: generateRandomName(),
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
