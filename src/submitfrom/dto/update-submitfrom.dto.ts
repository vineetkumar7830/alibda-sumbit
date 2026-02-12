import { PartialType } from '@nestjs/mapped-types';
import { CreateSubmitFromDto } from './create-submitfrom.dto';

export class UpdateSubmitfromDto extends PartialType(CreateSubmitFromDto) {}
