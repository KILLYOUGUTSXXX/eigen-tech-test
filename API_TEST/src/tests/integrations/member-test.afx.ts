import { TSequentiallyTesting } from "@utilities/helper-test.util"
import { IRequestMockCallback } from "@utilities/mock-request"

export const $1001_getmembers: TSequentiallyTesting = ({
  getDeps
}) => {
  let request: IRequestMockCallback

  beforeEach(async () => {
    request = getDeps().mockRequest
  })
  
  it('Test api "Get Some Members"', async () => {
    const response = await request({
      target: '/api/v1/members',
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

export const $1002_get_borrowed_book: TSequentiallyTesting = ({
  getDeps
}) => {
  let request: IRequestMockCallback

  beforeEach(async () => {
    request = getDeps().mockRequest
  })
  
  it('Test api "Get Borrowed Member Books"', async () => {
    const response = await request({
      target: '/api/v1/members/borrow/3',
      method: 'GET'
    })

    expect(response.body?.data?.count_borrowed_books).toBeGreaterThan(0)
  })
}

export const $1003_check_if_member_are_penalized: TSequentiallyTesting = ({
  getDeps
}) => {
  let request: IRequestMockCallback

  beforeEach(async () => {
    request = getDeps().mockRequest
  })
  
  it('Test api "Member must be not penalized"', async () => {
    const response = await request({
      target: '/api/v1/members/penalized/3',
      method: 'GET'
    })

    expect(response.body?.data?.status_penalty).toEqual(false)
  })
}

export const $3001_recheck_penalized_after_returningbook: TSequentiallyTesting = ({
  getDeps
}) => {
  let request: IRequestMockCallback

  beforeEach(async () => {
    request = getDeps().mockRequest
  })
  
  it('Test api "Member must be penalized, after returning book, with several conditions"', async () => {
    const response = await request({
      target: '/api/v1/members/penalized/3',
      method: 'GET'
    })
    expect(response.body?.data?.status_penalty).toEqual(true)
  })
}