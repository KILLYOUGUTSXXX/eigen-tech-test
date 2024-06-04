import { TSequentiallyTesting } from "@utilities/helper-test.util"
import { IRequestMockCallback } from "@utilities/mock-request"

export const $4001_borrowbooks_fail_condition01: TSequentiallyTesting = ({
  getDeps
}) => {
  let request: IRequestMockCallback

  beforeEach(async () => {
    request = getDeps().mockRequest
  })
  
  it('Test api "Borrowing book after penalized on member Putri"', async () => {
    const response = await request({
      target: '/api/v1/members/borrow',
      body: {
        "member_id": 3,
        "books": [
            { "book_id": 2, "qty": 1 }
        ]
    },
      method: 'POST'
    })

    expect(response.statusCode).toBe(400)
    expect(response?.body?.detailMessage)
      .toBe('This member not able to borrow the books, for the several times.')
  })
}

export const $4002_borrowbooks_fail_condition02: TSequentiallyTesting = ({
  getDeps
}) => {
  let request: IRequestMockCallback

  beforeEach(async () => {
    request = getDeps().mockRequest
  })
  
  it('Test api "Borrowing book with over qty on other members"', async () => {
    const response = await request({
      target: '/api/v1/members/borrow',
      body: {
        "member_id": 1,
        "books": [
            { "book_id": 2, "qty": 3 }
        ]
    },
      method: 'POST'
    })

    expect(response.statusCode).toBe(400)
    expect(response?.body?.detailMessage)
      .toBe("Book \"A Study in Scarlet\" out of stock.")
  })
}

export const $4003_borrowbooks_true_condition: TSequentiallyTesting = ({
  getDeps
}) => {
  let request: IRequestMockCallback

  beforeEach(async () => {
    request = getDeps().mockRequest
  })
  
  it('Test api "Borrowing book with with true conditions"', async () => {
    const response = await request({
      target: '/api/v1/members/borrow',
      body: {
        "member_id": 1,
        "books": [
            { "book_id": 2, "qty": 1 }
        ]
    },
      method: 'POST'
    })

    expect(response.statusCode).toBe(200)
    expect(response?.body?.data).toBe(true)
  })
}