import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from './password.service';
import * as bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn()
}));


describe('PasswordService', () => {
  let service: PasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordService],
    }).compile();

    service = module.get<PasswordService>(PasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // hash()
  // plain text -> hash
  // for the same input -> the same output
  // 1234567 ->sdadipu12-9oasd
  // -----------
  // bcryp.hash -> was called
  //            -> password was passed to it & salt rounds
  // mock & spies 

  it('should hash password', async () => {
    const mockHash = 'hashed_password';
    (bcrypt.hash as jest.Mock).mockResolvedValue(mockHash)
    const password = 'pasword123'
    const result = await service.hash(password)
    expect(bcrypt.hash).toHaveBeenCalledWith(password, 10)
    expect(result).toBe(mockHash);
  })

  it('should correctly verify password', async () => {
    // Mock bcypt.compare()
    // mock the resolved value
    // Call the service method - verify()
    // bcrypt.compare - was call-ed with specific argument
    // we verify if the service method returned what bcrypt.compare() did
    const mockCompare = true;
    (bcrypt.compare as jest.Mock).mockResolvedValue(mockCompare)
    const plainPassword = 'Asds123!'
    const hashedPassword = 'xxxxxxxxasdasd'
    const result = await service.verify(plainPassword, hashedPassword)
    expect(bcrypt.compare).toHaveBeenCalledWith(plainPassword, hashedPassword);
    expect(result).toBe(true);
  })

  it('should fail or inccorect  password', async () => {
    // Mock bcypt.compare() - fails!
    // mock the resolved value
    // Call the service method - verify()
    // bcrypt.compare - was call-ed with specific argument
    // we verify if the service method returned what bcrypt.compare() did
    const mockCompare = false;
    (bcrypt.compare as jest.Mock).mockResolvedValue(mockCompare)
    const plainPassword = 'Asds123!'
    const hashedPassword = 'xxxxxxxxasdasd'
    const result = await service.verify(plainPassword, hashedPassword)
    expect(bcrypt.compare).toHaveBeenCalledWith(plainPassword, hashedPassword);
    expect(result).toBe(false)
  })
});
