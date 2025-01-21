export const useUploadcareSource = () => {
  const UPLOADCARE_CDN_URL = 'https://ucarecdn.com'

  // Define the type for options
  interface UploadcareOption {
    preview?: string
    format?: string
    quality?: string
    crop?: string
    progressive?: 'yes' | 'no'
  }

  type StringMap = {
    [key: string]: any
  }

  // Default options
  const defaultOption: UploadcareOption = {
    format: 'auto',
    quality: 'smart',
  }

  // Function to generate the Uploadcare URL
  const src = (
    uuid: string,
    option?: UploadcareOption | StringMap,
    trailingSlash: boolean = true,
    useDefault: boolean = true
  ): string => {
    if (!uuid) {
      throw new Error('UUID is required to generate the Uploadcare URL.')
    }

    // format/quality/crop options only work when preview is set
    let _opt
    if (option?.preview && useDefault && option.progressive !== 'yes') {
      _opt = { ...defaultOption, ...option }
    } else {
      _opt = { ...option }
    }

    // Build the option string
    const _optStr = Object.entries(_opt)
      .filter(([_option, _value]) => _value !== undefined || _value !== false) // Ignore undefined values
      .map(([_option, _value]) => (_value ? `/-/${_option}/${typeof _value == 'boolean' ? '' : _value}` : ''))
      .join('')

    return `${UPLOADCARE_CDN_URL}/${uuid}${_optStr}${trailingSlash ? '/' : ''}`
  }

  /*
   * This is a src function that will take the uuid of an image that has been uploaded to Uploadcare along with the options,
   * which is just a string that will get appended to the URL.
   *
   * The function will return the URL of the image.
   */

  return {
    src,
  }
}
