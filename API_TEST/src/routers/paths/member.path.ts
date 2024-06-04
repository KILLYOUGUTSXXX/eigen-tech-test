import { BookModules } from "@main/books/book.module";
import { MemberModules } from "@main/members/member.module";

export const MemberPath: FX_ROUTERS.TRouterConfigs = {
  path: 'members',
  module: MemberModules,
  checks: {}
}
