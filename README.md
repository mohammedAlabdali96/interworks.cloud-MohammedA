# E-Commerce Vue 3 Application

A modern e-commerce application built with Vue 3, TypeScript, and Tailwind CSS.

## 🚀 Features
- **Product Grid with Responsive Layout**: Seamless product listing with grid view.
- **Search, Sort, and Filter Functionality**: search and sorting options for enhanced user experience.
- **Shopping Cart Management**: Add, update, and remove items from your basket.
- **Dark/Light Mode Toggle**: Switch between dark and light themes.
- **Responsive Design**: Optimized for devices of all sizes.
- **Pagination**: Efficient navigation through product listings.

## ⚡ Tech Stack
- **Vue 3**
- **TypeScript**
- **Tailwind CSS**
- **Pinia** for state management
- **Jest along with Vue Test Utils** for testing

## 📁 Project Structure
```
## 📁 Project Structure

e-commerce-app/
├── src/
│   ├── api/              # API handlers
│   ├── assets/           # Static assets like images and CSS
│   ├── components/       # Vue components
│   ├── mock/             # Mock data for testing
│   ├── stores/           # Pinia stores for state management
│   ├── types/            # TypeScript types
│   ├── utils/            # Utility functions and helpers
│   ├── App.vue           # Root Vue component
│   └── main.ts           # Application entry point
├── tests/                # Unit and integration tests
├── public/               # Public assets
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation

```



---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
cd e-commerce-app
yarn install
```

### 2. generate Mock data 

```bash 
node generateMockData.cjs
```
### 3. Run Development Server

```bash 
yarn run dev
```
### 4. Run Tests

```bash 
yarn run test
```


## Development Approach

### A Step-by-Step Process

While building the e-commerce app, I followed a **step-by-step approach**:

1. I started with basic features like displaying products.
2. Gradually, I added advanced functionalities such as **search**, **sorting**, and **filters**.
3. To keep the app clean and maintainable, I divided it into **smaller components** like `Pagination`, `ProductSearch`, and `ProductFilter`. This made the code easier to work with and reuse across the app.

For styling, I used **Tailwind CSS** because it is fast, simple, and allows me to focus on functionality without spending too much time on custom styles. For state management, I chose **Pinia**, which made sharing data between components easy.

### Key Decisions

Since **search** was a required feature, I focused on implementing it first. The `ProductSearch` component:

- Listens for user input.
- Debounces the search term using `lodash`.
- Updates the query parameters in the URL.

Once the search functionality was complete, I planned to move on to the next required feature, the **basket**. However, I realized that **sorting** and **category filters** shared a similar structure with search and could be implemented quickly:

- **Shared Approach**: Search, sorting, and filtering all rely on:
  - Updating query parameters using Vue Router.
  - Watching query changes with `watch` in Vue.
  - Using the same `useRouter` and `useRoute` hooks.

These decisions streamlined the implementation process and helped maintain consistent logic across the app.

---

## Challenges Faced and How They Were Overcome

### Unit Testing

One significant challenge was **writing unit tests** for components and API functions. As someone new to testing frameworks, I initially struggled with:

- **Mocking Vue Router**: Simulating URL parameters required mocking `useRouter` and `useRoute` to test components like `ProductSearch` and `ProductFilter`. I ensured that query changes reflected correctly in state.
- **Debounce Testing**: Simulating `lodash/debounce` functionality was tricky. I used `jest.useFakeTimers` to control timing and verify the behavior of delayed API calls.

To address these challenges, I started with simpler tests and gradually worked on more complex cases, building confidence and improving my skills.

### Backend Simulation

Another major challenge was the **lack of a real backend**, which made deciding how features like search, sorting, and filtering should work difficult. Initially, I considered implementing these as **frontend logic** within the store. However, in real-world scenarios, these features are handled by the backend. 

To simulate a backend and prepare the app for future integration:

- I moved search, sorting, and filtering logic to the **API layer** (`fetchProducts`).
- This allowed `fetchProducts` to act as a simulated backend endpoint, accepting optional query parameters for:
  - **Search**: Filters products by name.
  - **Sorting**: Sorts by price or name.
  - **Filtering**: Filters by category.
  - **Pagination**: Slices data based on the current page and page size.

This modular approach made the code easier to adapt for a real backend in the future.

---

## Things That Could Be Improved

1. **Toggle Feature Implementation**  
   The toggle feature (e.g., dark mode) could be simplified by configuring **Tailwind CSS** for built-in theme toggling and reducing extra classes. Avoiding external libraries like `@vueuse/core` for basic functionality could also simplify dependencies.

2. **Unit Testing for Stores**  
   Writing unit tests for the store is essential to ensure state management works correctly, especially for features like the basket or theme toggle. Improving my unit testing skills is a priority for future updates.

3. **Improved Use of Lodash and Debouncing**  
   While `lodash/debounce` works well, exploring simpler alternatives for debouncing directly in Vue or JavaScript could reduce dependencies and make the app more lightweight.

4. **Infinite Scroll Instead of Pagination**  
   Replacing traditional pagination with **infinite scrolling** using the Intersection Observer API would provide a smoother user experience, allowing users to scroll continuously through the product list.

5. **Better Tailwind Configuration**  
   Refining Tailwind's configuration could reduce repetitive classes and streamline the design process, making the templates cleaner and more maintainable.


