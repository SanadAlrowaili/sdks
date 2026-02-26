import { describe, it, expect } from 'vitest'
import { Address } from './address'

describe('Address', () => {
  const validAddress = '0xc65f20579d3eb3757281cdda51883c17f6c07715'
  const validAddressLowercase = '0xc65f20579d3eb3757281cdda51883c17f6c07715'
  const invalidAddress = '0xc65f20579d3eb3757281cdda51883c17f6c07715' // Too short

  describe('constructor', () => {
    it('should create an Address instance with valid address', () => {
      const address = new Address(validAddress)
      expect(address.toString()).toBe(validAddressLowercase)
    })

    it('should throw error for invalid address', () => {
      expect(() => new Address(invalidAddress)).toThrow('Invalid address')
    })

    it('should lowercase the address', () => {
      const address = new Address(validAddress)
      expect(address.toString()).toBe(validAddressLowercase)
    })
  })

  describe('static methods', () => {
    it('should have NATIVE_CURRENCY constant', () => {
      expect(Address.NATIVE_CURRENCY.toString()).toBe('0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
    })

    it('should have ZERO_ADDRESS constant', () => {
      expect(Address.ZERO_ADDRESS.toString()).toBe('0x0000000000000000000000000000000000000000')
    })

    it('should create address from bigint', () => {
      const address = Address.fromBigInt(BigInt('0x1234567890abcdef'))
      expect(address.toString()).toBe('0xc65f20579d3eb3757281cdda51883c17f6c07715')
    })

    it('should create address from first bytes', () => {
      const bytes = '0x1234567890123456789012345678901234567890abcdef'
      const address = Address.fromFirstBytes(bytes)
      expect(address.toString()).toBe('0x1234567890123456789012345678901234567890')
    })
  })

  describe('instance methods', () => {
    it('should compare addresses correctly', () => {
      const addr1 = new Address(validAddress)
      const addr2 = new Address(validAddressLowercase)
      const addr3 = new Address('0xc65f20579d3eb3757281cdda51883c17f6c07715')

      expect(addr1.equal(addr2)).toBe(true)
      expect(addr1.equal(addr3)).toBe(false)
    })

    it('should check if address is native', () => {
      const nativeAddr = Address.NATIVE_CURRENCY
      const normalAddr = new Address(validAddress)

      expect(nativeAddr.isNative()).toBe(true)
      expect(normalAddr.isNative()).toBe(false)
    })

    it('should check if address is zero', () => {
      const zeroAddr = Address.ZERO_ADDRESS
      const normalAddr = new Address(validAddress)

      expect(zeroAddr.isZero()).toBe(true)
      expect(normalAddr.isZero()).toBe(false)
    })
  })
})
