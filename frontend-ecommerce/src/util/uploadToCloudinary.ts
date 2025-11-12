export const uploadToCloudinary = async (pics: any) => {
    // this two can get on the cloudinary account
    // cloud_name can be found on  the dashboard -> Home -> Dashboard
    // upload_preset can be found on the settings under the upload tab -> make sure unsigned is enabled

    const cloud_name ='', upload_preset = '';

    if (pics) {
        console.log('pics:', pics);
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", upload_preset);
        data.append("cloud_name", cloud_name);
        

        console.log('data:', data);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
            method: "POST",
            body: data
        })

        const fileData = await res.json();
        return fileData?.url?.toString();
    }
    else {
        console.log("error: pics not found");
    }
} 