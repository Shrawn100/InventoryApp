# Online Shop

The Online Shop is a web application built using Express.js and MongoDB. It provides an interface for users to browse and purchase items from an online store. The application includes the following filtering and search features:

## Filtering

- **Category Filter**: Users can filter items based on their category. The application supports multiple categories, and users can select a specific category to view items belonging to that category.

- **Price Range Filter**: Users can filter items based on their price range. They can specify a minimum and maximum price, and the application will display items within that price range.


## Search

- **Search Bar**: The application provides a search bar where users can enter keywords to search for specific items. The search functionality matches the keywords with the item titles and displays the relevant items.

- **Search Results**: The application presents the search results to the user, showing the items that match the search query. Users can click on the items to view their details and add them to the cart.

## Installation

To run the Online Shop application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>


2. Navigate to the project directory:
   ```bash
   cd InventoryApp
3. Install the dependencies
   ```bash
   npm install
4. Set up the MongoDB connection:
- Make sure you have MongoDB installed and running on your local machine.
- Update the `MONGODB_URI` value in the `.env` file with your MongoDB connection string.

5. Start the server:
   ```bash
   npm start

## Project Structure

The project's file structure is organized as follows:

- `app.js`: The main entry point of the application. It sets up the Express server, connects to the MongoDB database, configures middleware, and defines routes.
- `routes/index.js`: Contains the routes for the homepage and other general pages.
- `routes/catalog.js`: Contains the routes for the catalog area of the site, including item listing, item details, cart handling, and item filtering.
- `controllers/item_controller.js`: Implements the controller functions for handling item-related operations, such as displaying item lists, item details, and item filtering.
- `controllers/cart_controller.js`: Implements the controller functions for handling cart-related operations, such as adding items to the cart, increasing item quantities, reducing item quantities, and removing items from the cart.
- `models/item.js`: Defines the MongoDB schema and model for items in the shop.
- `models/category.js`: Defines the MongoDB schema and model for item categories.
- `models/cart.js`: Defines the cart model and its associated functions for managing items in the cart.
- `views/`: Contains the Pug view templates used for rendering HTML pages.

## Dependencies

The main dependencies used in this project are:

- Express.js: A web application framework for Node.js.
- MongoDB: A NoSQL database for storing item and category data.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- Pug: A template engine for rendering views.

Please refer to the `package.json` file for a complete list of dependencies and their versions.

## Usage

- Open your web browser and visit `http://localhost:3000` to access the Online Shop homepage.
- Browse through the catalog to view available items.
- Use the filtering options to narrow down the item list based on category or price range.
- Enter keywords in the search bar to search for specific items.
- View the search results and click on items to see their details and add them to the cart.
- Proceed to the cart to review the selected items and complete the purchase.

## Technologies Used
The Online Shop application utilizes the following technologies:

- **Express.js**: Backend framework for building the application and handling HTTP requests.
- **MongoDB**: NoSQL database for storing item and category data.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js, providing a convenient way to interact with the database.
- **Pug**: Template engine for rendering HTML views with dynamic data.
- **Passport**: Authentication middleware for Express.js, enabling user registration and login functionality.
- **bcrypt**: Library for password encryption to enhance security.
- **express-session**: Middleware for managing user sessions.
- **express-validator**: Middleware for validating user input.
- **connect-flash**: Middleware for displaying flash messages to the user.
- **luxon**: Library for working with dates and times.
## License
This project is licensed under the MIT License. Feel free to use and modify it according to your needs.


