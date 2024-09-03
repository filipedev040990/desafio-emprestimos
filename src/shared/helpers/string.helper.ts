export const isValidEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(email)
}

export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  const regex = /^\d{2}\d{4,5}\d{4}$/
  return regex.test(phoneNumber)
}

export const obfuscateValue = (object: any): object => {
  const valuesToBeObfuscated = ['password']
  valuesToBeObfuscated.forEach(word => {
    if (word in object) {
      object[word] = '[OBFUSCATED]'
    }
  })

  return object
}

export const isValidString = (value: string): boolean => {
  return typeof value === 'string' && value !== '' && value !== undefined && value !== null
}

export const isValidCpf = (cpf: string): boolean => {
  const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/
  return regex.test(cpf)
}

export const isValidLocation = (location: string) => {
  const regex = /^(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$/
  return regex.test(location)
}
