import classNames from 'classnames'
import React, { useState } from 'react'
import { CiCircleRemove } from 'react-icons/ci'
import { FiUploadCloud } from 'react-icons/fi'
import BPBox from '@components/atoms/BPBox'
import BPIcon from '@components/atoms/BPIcon'
import {
  DEFAULT_SIZE,
  SIZE,
  UI_DEFAULT_VARIANT,
  UI_VARIANT,
} from '@core/types/ui-kit'

type BPUploadProps = {
  size?: SIZE
  variant?: UI_VARIANT
  outline?: boolean
  magic?: boolean
  hoverable?: boolean
  accept?: string
  multiple?: boolean
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: any) => void
  [x: string]: any
}

const BPUpload = ({
  size = DEFAULT_SIZE,
  variant = UI_DEFAULT_VARIANT,
  outline = false,
  magic = false,
  accept = 'image/*,application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*,zip, application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed',
  multiple = false,
  onChange = () => {},
  ...props
}: BPUploadProps) => {
  const input = React.createRef<any>()
  const [files, setFiles] = useState([])

  const elementClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    'whitespace-nowrap flex justify-center': true,
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

  const handleFileRemove = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
    onChange(Array.from(newFiles))
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
        outline={outline}
        magic={magic}
        variant={variant}
        className={`flex flex-col items-center gap-4`}
      >
        <button className="ui-btn-upload" onClick={handleClickFile}>
          <BPIcon size={'lg'} outline={outline} magic={magic} variant={variant}>
            <FiUploadCloud />
          </BPIcon>
          Click here to upload a file
        </button>
        {!!files.length && (
          <div className="content-files">
            {files?.map((file: any, index) => (
              <div key={index}>
                <p className="inline text-neutral-600 w-[40px]">
                  {file.name.length > 20
                    ? `${file.name.slice(0, 20)}...`
                    : file.name}
                </p>{' '}
                <button
                  onClick={() => handleFileRemove(index)}
                  className="z-10"
                >
                  <CiCircleRemove className="inline hover:text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </BPBox>
    </div>
  )
}

export default BPUpload
