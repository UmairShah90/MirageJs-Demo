import { createServer } from "miragejs";
import books from "./Json/books.json";

export function makeServer() {
  // Create a Server
  let server = createServer({
    routes() {
      this.namespace = "api";

      // Get Api
      this.get("/books", (schema) => {
        return books;
      });
      // Post Api
      this.post("/add", (schema, request) => {
        console.log(request);
        const newBook = JSON.parse(request.requestBody);

        books.push(newBook);
      });
    },
  });

  return server;
}
