import { NextResponse } from "next/server";
import { uploadFileToS3 } from "@/utils/s3-upload";



export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("logo_file")

        if(!file || !(file instanceof File)){
            return NextResponse.json({error:'file is required'}, {status:400})
        }
        
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = await uploadFileToS3(buffer, file.name);

        return NextResponse.json({success:true, fileName})

    } catch (error) {
        return NextResponse.json({error:error})
    }

    return NextResponse.json({msg:"hello"})
}