export const useUploadcareSource = () => {
  const UPLOADCARE_CDN_URL = 'https://ucarecdn.com'

  // Define the type for options
  interface UploadcareOption {
    preview?: string
    format?: string
    quality?: string
    crop?: string
  }

  // Default options
  const defaultOption: UploadcareOption = {
    format: 'auto',
    quality: 'smart',
  }

  // Function to generate the Uploadcare URL
  const src = (uuid: string, option?: UploadcareOption): string => {
    if (!uuid) {
      throw new Error('UUID is required to generate the Uploadcare URL.')
    }

    // Merge default options with user-provided options
    const _opt = { ...defaultOption, ...option }

    // Build the option string
    const _optStr = Object.entries(_opt)
      .filter(([_option, _value]) => _value !== undefined) // Ignore undefined values
      .map(([_option, _value]) => `/-/${_option}/${_value}`)
      .join('')

    return `${UPLOADCARE_CDN_URL}/${uuid}${_optStr}`
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