'use client'

import { convertFileToUrl } from '@/lib/utils'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

type FileUploaderProps = {
    files: File[] | undefined,
    onChange: (files: File[]) => void
}

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onChange(acceptedFiles)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} className='file-upload'>
            <input {...getInputProps()} />
            {files && files?.length > 0 ? (
                <Image
                    src={convertFileToUrl(files[0])}
                    width={1000}
                    height={1000}
                    alt="uploaded_image"
                    className="max-h-[400px] overflow-hidden object-cover"
                />
            ) : (
                <>
                    <Image
                        src="/assets/icons/upload.svg"
                        width={40}
                        height={40}
                        alt="upload_icon"
                    />
                    <div className="file-upload_label">
                        {isDragActive ? (
                            <>
                                <p className="text-14-regular">Drop the files here ...</p>
                            </>
                        ) : (
                            <>
                                <p className="text-14-regular">
                                    <span className="text-green-500">
                                        Click to Upload
                                    </span> or drag and drop
                                </p>
                                <p>
                                    SVG, PNG, JPEG, GIF (max 800 x 400)
                                </p>
                            </>)}
                    </div>
                </>
            )}
        </div>
    )
}

export default FileUploader