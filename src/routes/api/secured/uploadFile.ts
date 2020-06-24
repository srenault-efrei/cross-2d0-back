import { Router, Request, Response } from 'express'
import { error, success } from '@/core/helpers/response'
import { BAD_REQUEST, OK } from '@/core/constants/api'
import uploadFile from '@/core/services/amazonS3'
import { isEmpty } from 'lodash'



const api = Router()


api.post('/', async (req: Request, res: Response) => {
    const fields = ['filename', 'key']

    try {
        const missings = fields.filter((field: string) => !req.body[field])

        if (!isEmpty(missings)) {
            const isPlural = missings.length > 1
            throw new Error(`Field${isPlural ? 's' : ''} [ ${missings.join(', ')} ] ${isPlural ? 'are' : 'is'} missing`)
        }
        const { filename, key } = req.body
        uploadFile(filename, key)

        res.status(OK.status).json({location:`https://trocifyfile.s3.eu-west-3.amazonaws.com/${key}`})
    } catch (err) {
        res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    }

})


export default api


