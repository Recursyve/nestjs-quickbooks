# Nest.js QuickBooks

An easy way to interact with the QuickBooks API in your NestJS applications.

## Features
- Authorization workflow
- Company's info
- Items
- Invoices
- Payments
- Customers
- Vendors

## Getting started

### Install

```
npm i --save @recursyve/nestjs-quickbooks
```

### Import

```ts
import { QuickBooksModule, QuickBooksScopes } from "@recursyve/nestjs-quickbooks";

@Module({
    imports: [
        QuickBooksModule.forRoot({
            config: {
                mode: "sandbox",
                clientId: "clientId",
                clientSecret: "clientSecret",
                scopes: [QuickBooksScopes.Accounting],
                serverUri: "http://localhost:3000",
                redirection: {
                    successUrl: "http://localhost:3000/success",
                    errorUrl: "http://localhost:3000/error"
                }
            }
        })
    ]
})
export class AppModule {}
```

### Configuration

You can set the config in the QuicksBooksModule forRoot function. You can also set the configuration with environment variable.

| **configuration**      | **Environment variable**    | **Definition**                              |
|------------------------|-----------------------------|---------------------------------------------|
| mode                   | QUICKBOOKS_MODE             | QuickBooks mode (sandbox or production)     |
| clientId               | QUICKBOOKS_CLIENT_ID        | Your Quickbooks application client id       |
| clientSecret           | QUICKBOOKS_CLIENT_SECRET    | Your Quickbooks application client secret   |
| scopes                 | QUICKBOOKS_CLIENT_SCOPES    | Quickbooks API scopes                       |
| serverUri              | QUICKBOOKS_SERVER_URI       | Your NestJS application URI                 |
| redirection.successUrl | QUICKBOOKS_REDIRECT_SUCCESS | Redirection URL after authorization success |
| redirection.errorUrl   | QUICKBOOKS_REDIRECT_ERROR   | Redirection URL after authorization error   |

### Authorization workflow

The Authorization workflow is embedded in the library. Two routes are provided.

- /quickbooks/auth: Redirects to quickbooks for authorization
- /quickbooks/auth/return: The redirection uri, you need to set this uri in your QuickBooks application

### Authorization tokens store

The result of an authorization is stored in the QuickBooksStore. By default the LocalStore is used, which means that the tokens and realm are saved localy.

You can override the QuickBooksStore with your own Store implementation.
```ts
import { QuickBooksModule, QuickBooksStore } from "@recursyve/nestjs-quickbooks";

@Module({
    imports: [
        QuickBooksModule.forRoot({
            imports: [MyStoreImplementationModule],
            store: {
                provide: QuickBooksStore,
                useClass: MyStoreImplementation
            }
        })
    ]
})
export class AppModule {}
```
