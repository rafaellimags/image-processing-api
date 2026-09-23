# Image Processing API

A scalable image processing API built with Node.js, Express, TypeScript, and Sharp. This service accepts HTTP requests to dynamically resize images, saves the processed thumbnails to disk for efficient caching, and serves them directly on subsequent requests.

This project was built as the final project for the Udacity Full Stack JavaScript Developer Nanodegree.

---

## Features

- **Dynamic Image Resizing:** On-demand image processing using `sharp`.
- **Disk Caching:** Saves newly created thumbnails to the `assets/thumbs` folder to avoid redundant processing.
- **Strict Typing:** Built fully in TypeScript using ESM (`NodeNext`) with zero usage of the `any` type.
- **Automated Testing:** Unit and integration test suites powered by Jasmine and SuperTest.
- **Code Quality:** Enforced with ESLint (Flat Config) and Prettier.

---

## Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

---

## Getting Started

### 1. Installation

Clone the repository and install the project dependencies:

```bash
git clone https://github.com/rafaellimags/image-processing-api.git
cd image-processing-api
npm install
```

### 2. Assets Folder Setup

Ensure the project contains the required asset directories and full-sized test images:

```text
assets/
├── full/        # Contains source images (e.g., fjord.jpg)
└── thumbs/      # Holds generated image thumbnails
```

---

## Available Scripts

In the project directory, you can run:

- `npm run build`: Compiles TypeScript source files from `src/` into JavaScript in the `dist/` folder.
- `npm start`: Starts the production Express server from the compiled `dist/` code.
- `npm test`: Compiles the project and runs both unit and integration tests using Jasmine and SuperTest.
- `npm run lint`: Runs ESLint to check for code quality and strict typing violations across TypeScript files.
- `npm run format`: Automatically formats the codebase according to Prettier formatting rules.

---

## API Usage

### Resize Image Endpoint

**URL:** `/api/images`  
**Method:** `GET`

#### Query Parameters:

| Parameter  | Type     | Required | Description                                                                |
| :--------- | :------- | :------- | :------------------------------------------------------------------------- |
| `filename` | `string` | **Yes**  | Name of the target file in `assets/full` (without the `.jpg` extension).   |
| `width`    | `number` | **Yes**  | Desired width in pixels (must be a positive integer).                      |
| `height`   | `number` | **Yes**  | Desired height in pixels (must be a positive integer).                     |

#### Example Request:

```http
http://localhost:3000/api/images?filename=fjord&width=200&height=200
```

#### How It Works:

1. **Validation:** Validates that `filename`, `width`, and `height` parameters are present and correctly formatted, and checks if the source image exists in `assets/full/`.
2. **Cache Check:** If the requested image already exists in `assets/thumbs/` with the specified dimensions (e.g., `fjord-200x200.jpg`), the API serves it immediately from disk.
3. **Processing:** If the thumbnail does not exist, the API processes the original image using `sharp`, saves the resulting thumbnail to `assets/thumbs/`, and sends the processed image file back in the response.

---

## Testing

To compile the application and execute the Jasmine test suite, run:

```bash
npm test
```

The test runner will execute:
- **Unit Tests:** Direct testing of the `resizeImage` utility function located in `src/utils/imageProcess.ts`.
- **Integration Tests:** End-to-end endpoint tests using SuperTest to verify response codes (`200`, `400`, `404`).