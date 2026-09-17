import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus
  } from '@nestjs/common'
  import { Prisma } from '../../generated/prisma/client.js'
  
  @Catch(Prisma.PrismaClientKnownRequestError)
  export class PrismaExceptionFilter
    implements ExceptionFilter
  {
    catch(
      exception: Prisma.PrismaClientKnownRequestError,
      host: ArgumentsHost
    ) {
      const response = host.switchToHttp().getResponse()
  
      let status = HttpStatus.INTERNAL_SERVER_ERROR
      let message = 'Internal server error'
  
      switch (exception.code) {
        case 'P2002':
          status = HttpStatus.CONFLICT
          message = 'A record with this value already exists'
          break
  
        case 'P2025':
          status = HttpStatus.NOT_FOUND
          message = 'Record not found'
          break
  
        case 'P2003':
          status = HttpStatus.BAD_REQUEST
          message = 'Invalid relation'
          break
      }
  
      response.status(status).json({
        statusCode: status,
        message,
        error: HttpStatus[status]
      })
    }
  }