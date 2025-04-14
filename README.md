# Bookkeeping Service

This is a Node.js-based **Bookkeeping Service** application designed to manage books, users, and libraries. It allows authors to create books, libraries to store and manage books in their inventory, and borrowers to borrow and return books. The service features multilingual support (English and Hindi), role-based access control, and integration with Cloudinary for book cover image storage.

## Features

- **Book Management**: 
  - Create, retrieve, update, and delete books.
  - Track the **Author**, **Library**, and **Borrower** for each book.
  - Each book includes a **book cover image** stored on Cloudinary.

- **User Management**: 
  - Users can register as **Authors** or **Borrowers**.
  - **Authentication** via JWT tokens.
  - Role-based access control (Authors can add books, Borrowers can borrow them).

- **Library Management**: 
  - Libraries can manage their inventory of books.
  - **Add/Remove books** to/from the library's inventory.
  - **Retrieve details** of the books owned by the library, including borrower information.

- **Book Borrowing/Returning**:
  - Borrow books from libraries with charges.
  - Return borrowed books.

- **Multilingual Support**: 
  - Error and success messages are available in **English** and **Hindi**.

- **Cloudinary Integration**: 
  - Book cover images are stored on **Cloudinary**.

## Installation

### Prerequisites
- Node.js (version >=14.x)
- MongoDB (locally or MongoDB Atlas)
- Cloudinary account for book cover image storage

### Steps to Install

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sagargandhe/bookkeeping-service.git
