import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';

const PROJECT_TYPES = [
  'Residential Interior',
  'Luxury Villa',
  'Penthouse',
  'Commercial Space',
  'Hospitality',
  'Turnkey Solution',
];

export class CreateSubmitFromDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(PROJECT_TYPES, { message: 'Invalid project type selected' })
  projectType: string;

  @IsString()
  @IsNotEmpty()
  projectDetails: string;
}
