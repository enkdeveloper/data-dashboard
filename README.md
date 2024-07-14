Crypto Dashboard

https://data-dashboard-sepia.vercel.app/

Crypto Dashboard is a comprehensive application designed to provide real-time data and statistics on various cryptocurrencies. The application is built with React, TypeScript, and utilizes the CoinGecko API to fetch data. The UI is designed to be responsive and user-friendly, ensuring a seamless experience across different devices.

________________________________________


Features


1.	Real-time Cryptocurrency Data:

o	Fetches and displays real-time data on various cryptocurrencies.

o	Includes information such as price, market cap, volume, 24h high/low, and price change percentage.


2.	Global Cryptocurrency Statistics:

o	Provides global statistics including total market cap, total volume, number of active cryptocurrencies, and number of markets.


3.	Fear and Greed Index:

o	Displays the Fear and Greed Index, providing insights into the market sentiment.


4.	Top Volume Coins:

o	Showcases the top cryptocurrencies based on 24h trading volume in a carousel format.


5.	Coin Details:

o	Detailed view for each cryptocurrency with additional information such as description, genesis date, hashing algorithm, and links to official sites.


6.	Favorites:

o	Allows users to mark cryptocurrencies as favorites for quick access.


7.	Responsive Design:

o	Ensures a seamless experience across various devices including desktops, tablets, and mobile phones.
________________________________________


Getting Started


Prerequisites

•	Node.js

•	npm (Node Package Manager)


Installation


1.	Clone the repository:

Bash:

git clone https://github.com/enkdeveloper/data-dashboard.git

cd data-dashboard


2.	Install dependencies:


Bash:

npm install

Running the Application


1.	Start the development server:

Bash:

npm run dev
________________________________________


Project Structure

•	src/components:

o	Contains all the React components such as Dashboard, Explorer, Favorites, and CoinDetails.

•	src/services:

o	Contains the apiService file which handles API requests.

•	src/styles:

o	Contains CSS files for styling the components.
________________________________________


API Integration


The application uses the CoinGecko API to fetch cryptocurrency data. The following endpoints are used:

•	Coin List:

o	Endpoint: /coins/markets

o	URL: https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false

•	Top Volume Coins:

o	Endpoint: /coins/markets

o	URL: https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=10&page=1&sparkline=false

•	Coin Details:

o	Endpoint: /coins/{id}

o	URL: https://api.coingecko.com/api/v3/coins/{id}

•	Global Data:

o	Endpoint: /global

o	URL: https://api.coingecko.com/api/v3/global

________________________________________


Screenshots

![Ekran görüntüsü 2024-07-14 034249](https://github.com/user-attachments/assets/121f4b9f-3dd8-498e-b986-7489df05cd05)

![Ekran görüntüsü 2024-07-14 034259](https://github.com/user-attachments/assets/6bdfb59f-508c-4d53-9291-89aeb4915e35)

![Ekran görüntüsü 2024-07-14 034308](https://github.com/user-attachments/assets/ecff9818-c77f-4ae0-b526-c45575f21e0f)

![Ekran görüntüsü 2024-07-14 034318](https://github.com/user-attachments/assets/4f5f24c0-8aca-4d4e-bfb9-a6cb13072ef8)


________________________________________


Video 

https://www.loom.com/share/f33aedd84c4341fea5052a6a6e38138e?sid=7310628d-bff4-4763-ad6f-d6ee0cc0d997


____________________________________


Documentation

Building and Launching the Application:

1.	Clone the repository:

Bash:

git clone https://github.com/enkdeveloper/data-dashboard.git

cd data-dashboard


2.	Install dependencies:

Bash:

npm install


3.	Start the development server:

Bash:

npm run dev

________________________________________


Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

________________________________________


License

This project is licensed under the MIT License.

________________________________________


Contact


For any questions or inquiries, please contact me at your-email@example.com



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
