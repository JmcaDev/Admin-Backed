import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        tags: [
            {
                name: "Products",
                description: "API operations related to products"
            }
        ],
        info: {
            title: "REST API Node.js / Express / TypeScript",
            version: "1.0.0",
            description: "API docs for Products"
        }
    },
    apis: ["./src/routes.ts"]
}

const swaggerSpec = swaggerJSDoc(options)

//Customize the swagger
const swaggerUiOptions: SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link{
            content: url("https://avatars.githubusercontent.com/u/104389912?v=4");
            height: 200px;
            width: auto;
        }
        .swagger-ui .topbar{
            background-color: #000
        }
    `,
    customSiteTitle: "Documentation REST API Express / TypeScript"
}

export {
    swaggerSpec,
    swaggerUiOptions
}