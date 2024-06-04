import { IBooks } from "@common-ifaces/main/book.iface";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { TAttributes } from "@utilities/helper-type.util";
import { queryGeneratorSql } from "@utilities/query-generator.util";
import { ServiceHelpers } from "@utilities/service-helper.util";
import { BookSchema } from "@common-schemas/public/book.table";

const attributes: TAttributes<IBooks> = {
  mf: [
    'id', 'code', 'title', 'author', 'created_at', 'updated_at'
  ],
  bf: [
    'code', 'title', 'author', 'created_at', 'updated_at'
  ],
  mnf: [
    'code', 'title', 'author'
  ]
}


@Injectable()
export class BookService {
  constructor (
    @InjectModel(BookSchema) private bookSchema: typeof BookSchema
  ) {}

  async findSomeBooks (query: any) {
    const tmpAttributes = ServiceHelpers.getAttributes(attributes, query._mode)
    const querying = queryGeneratorSql(attributes.bf, query, true)

    return this.bookSchema.findAndCountAll({
      attributes: tmpAttributes,
      ...querying,
      raw: true
    }).then(a => ({
      data: a.rows,
      total: a.count,
      page: querying.page,
      pageSize: querying.limit
    }))
  }
}