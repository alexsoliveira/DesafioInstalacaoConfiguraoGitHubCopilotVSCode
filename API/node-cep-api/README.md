# Node CEP API

This project is a simple Node.js API that allows users to fetch address information based on a provided Brazilian postal code (CEP). It utilizes Express for handling HTTP requests and an external API to retrieve address data in JSON format.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoint](#api-endpoint)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/node-cep-api.git
   ```

2. Navigate to the project directory:
   ```
   cd node-cep-api
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the server, run the following command:
```
npm start
```

The server will start on `http://localhost:3000`.

## API Endpoint

### Get Address by CEP

- **URL**: `/cep/:cep`
- **Method**: `GET`
- **URL Params**: 
  - `cep=[string]` - The postal code you want to look up.

- **Success Response**:
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "logradouro": "Rua Exemplo",
      "bairro": "Bairro Exemplo",
      "localidade": "Cidade Exemplo",
      "uf": "Estado Exemplo"
    }
    ```

- **Error Response**:
  - **Code**: 404
  - **Content**: 
    ```json
    {
      "error": "CEP not found"
    }
    ```

## License

This project is licensed under the MIT License.