import { BookPath } from "./paths/book.path";
import { MemberPath } from "./paths/member.path";



export const routes: FX_ROUTERS.TRouterConfigs[] = [
  {
    path: 'api/v1',
    children: [
      BookPath,
      MemberPath
    ]
  }
]
