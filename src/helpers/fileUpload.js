

export const fileUpload = async(file) => {

    if (!file) throw new Error('no hay archivos por subir')

    const cloudUrl = 'https://api.cloudinary.com/v1_1/ddugmzh40/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {

        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        console.log(resp)
        if(!resp.ok) throw new Error('no se pudo subir imagen')

        const cloudResp = await resp.json();

        return cloudResp.secure_url
        
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }

}