import { TSequentiallyTesting } from "@utilities/helper-test.util"
import { IRequestMockCallback } from "@utilities/mock-request"

export const $2001_returnbooks: TSequentiallyTesting = ({
  getDeps
}) => {
  let request: IRequestMockCallback

  beforeEach(async () => {
    request = getDeps().mockRequest
  })
  
  it('Test api "Returning book from member Putri"', async () => {
    const response = await request({
      target: '/api/v1/books/returns',
      body: {
        "member_id": 3,
        "borrows": [
            { "borrow_id": 1, "qty": 1 }
        ]
      },
      method: 'POST'
    })

    expect(response.statusCode).toBe(200)
  })
}
