import { BookModules } from "@main/books/book.module";
import { BorrowBookModules } from "@main/processes/borrow-books/borrow-book.module";
import { ReturnBookModules } from "@main/processes/return-books/return-book.module";

export const BookPath: FX_ROUTERS.TRouterConfigs = {
  path: 'books',
  module: BookModules,
  checks: {},
  children: [
    {
      path: 'returns',
      module: ReturnBookModules,
      checks: {}
    },
    {
      path: 'borrows',
      module: BorrowBookModules,
      checks: {}
    }
  ]
}
