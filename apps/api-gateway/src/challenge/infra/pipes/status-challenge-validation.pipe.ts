import { StatusChallenge } from '@api-gateway/challenge/domain/domain/entities/status-challenge.interface';
import { BadRequestException, PipeTransform } from '@nestjs/common';

export class StatusChallengeValidationPipe implements PipeTransform {
  readonly validStatus = [
    StatusChallenge.ACCEPTED,
    StatusChallenge.DENIED,
    StatusChallenge.CANCEL,
  ];

  transform(value: any) {
    const status = value.status.toUpperCase();

    if (!this.isStatusValid(status)) {
      throw new BadRequestException(`${status} is a status invalid`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.validStatus.indexOf(status);
    return idx !== -1;
  }
}
