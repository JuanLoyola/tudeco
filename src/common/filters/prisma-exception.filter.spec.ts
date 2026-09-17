import { HttpStatus } from '@nestjs/common'
import { describe, expect, it, vi } from 'vitest'
import { PrismaExceptionFilter } from './prisma-exception.filter.js'
import { Prisma } from '../../generated/prisma/client.js'

describe('PrismaExceptionFilter', () => {
  it('should return 409 for P2002', () => {
    const filter = new PrismaExceptionFilter()

    const response = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    }

    const host = {
      switchToHttp: () => ({
        getResponse: () => response
      })
    } as any

    const exception = new Prisma.PrismaClientKnownRequestError(
      'Unique constraint failed',
      {
        code: 'P2002',
        clientVersion: '7.10.0'
      }
    )

    filter.catch(exception, host)

    expect(response.status).toHaveBeenCalledWith(
      HttpStatus.CONFLICT
    )

    expect(response.json).toHaveBeenCalledWith({
      statusCode: 409,
      message: 'A record with this value already exists',
      error: 'CONFLICT'
    })
  })

  it('should return 404 for P2025', () => {
    const filter = new PrismaExceptionFilter()

    const response = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    }

    const host = {
      switchToHttp: () => ({
        getResponse: () => response
      })
    } as any

    const exception = new Prisma.PrismaClientKnownRequestError(
      'Record not found',
      {
        code: 'P2025',
        clientVersion: '7.10.0'
      }
    )

    filter.catch(exception, host)

    expect(response.status).toHaveBeenCalledWith(
      HttpStatus.NOT_FOUND
    )
  })
})