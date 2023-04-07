import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { FiUploadCloud } from 'react-icons/fi'
import BPBox from '@components/atoms/BPBox'
import BPIcon from '@components/atoms/BPIcon'
import {
  DEFAULT_SIZE,
  SIZE,
  UI_DEFAULT_TYPE,
  UI_TYPE,
} from '@core/types/ui-kit'

type BPUploadProps = {
  size?: SIZE
  type?: UI_TYPE
  outline?: boolean
  magic?: boolean
  hoverable?: boolean
  accept?: string
  multiple?: boolean
  onChange?: (e: any) => void
  [x: string]: any
}

const BPUpload = ({
  size = DEFAULT_SIZE,
  type = UI_DEFAULT_TYPE,
  outline = false,
  magic = false,
  hoverable = false,
  url = undefined,
  accept = 'image/*,application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*,zip, application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed',
  multiple = false,
  onChange = () => {},
  ...props
}: BPUploadProps) => {
  const input = React.createRef<any>()
  const [files, setFiles] = useState([])

  const elementClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    'whitespace-nowrap flex justify-center cursor-pointer': true,
    [`hover:opacity-90`]: true,
    [props.className]: props.className,
  })

  function handleFileChange(event: any) {
    console.log(event.target.files)
    setFiles(Array.from(event.target.files))
    onChange(Array.from(event.target.files))
  }

  function handleClickFile() {
    input.current.click()
  }

  return (
    <div className={elementClass}>
      <input
        style={{ display: 'none' }}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        ref={input}
        multiple={multiple}
      />
      <BPBox
        onClick={handleClickFile}
        outline={outline}
        magic={magic}
        type={type}
        className={`flex flex-col items-center gap-4`}
      >
        <BPIcon size={'lg'} outline={outline} magic={magic} type={type}>
          <FiUploadCloud />
        </BPIcon>
        Click here to upload a file
        {!!files.length && (
          <div className="mt-2">
            {files?.map((file: any, index) => (
              <p key={index}>
                {file.name.length > 20
                  ? `${file.name.slice(0, 20)}...`
                  : file.name}
              </p>
            ))}
          </div>
        )}
      </BPBox>
    </div>
  )
}

export default BPUpload
