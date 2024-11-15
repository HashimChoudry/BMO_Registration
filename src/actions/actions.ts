'use server'

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl} from "@aws-sdk/s3-request-presigner"
import crypto from "crypto"

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");


const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
})

const acceptedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
]

const maxFileSize = 1024 * 1024 * 10

export async function getSignedURL(type: string, size:number, checksum:string,username:string) {
    if(!acceptedTypes.includes(type)){
        return{failure:"File Format is not accepted"}
    }
    if(size > maxFileSize){
        return{failure:"File is too large"}
    }

    const putCommand = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: generateFileName(),
        ContentType: type,
        ContentLength:size,
        ChecksumSHA256: checksum,
        Metadata:{
            username: username
        }
            
        }
    )

    const signedURL = await getSignedUrl(s3,putCommand,{
        expiresIn:60,
    })

    return {success: {url: signedURL}}
}

