import { TSequentiallyTesting } from "@utilities/helper-test.util"
import { IRequestMockCallback } from "@utilities/mock-request"

export const $0001_getbook: TSequentiallyTesting = ({
  getDeps
}) => {
  let request: IRequestMockCallback

  beforeEach(async () => {
    request = getDeps().mockRequest
  })
  
  it('Test api "Get Some Books"', async () => {
    const response = await request({
      target: '/api/v1/books',
      query: {
        _mode: 'mf',
        _pageSize: 10,
        _page: 1
      },
      method: 'GET'
    })

    expect(response.statusCode).toBe(200)
  })
}

export const $0002_getbook_onhand: TSequentiallyTesting = ({
  getDeps
}) => {
  let request: IRequestMockCallback

  beforeEach(async () => {
    request = getDeps().mockRequest
  })
  
  it('Test api "Get Some Book Onhands"', async () => {
    const response = await request({
      target: '/api/v1/books/onhand',
      query: {
        _mode: 'mf',
        _pageSize: 10,
        _page: 1
      },
      method: 'GET'
    })

    expect(response.statusCode).toBe(200)
  })
}