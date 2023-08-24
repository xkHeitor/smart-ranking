import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService {
  private logger = new Logger('AWS');
  constructor(private configService: ConfigService) {}

  public async uploadFile(file: any, id: string): Promise<any> {
    const s3 = new AWS.S3({
      region: this.configService.get('aws.region'),
      accessKeyId: this.configService.get('aws.accessKeyId'),
    });

    if (!file && !file.originalname) throw new Error('error in file');
    const fileExt = file.originalname.split('.')[1];
    const urlKey = `${id}.${fileExt}`;
    const params = {
      Body: file.buffer,
      Bucket: 'smartRanking',
      Key: urlKey,
    };

    const data = s3
      .putObject(params)
      .promise()
      .then(
        (data) => {
          return data;
        },
        (error) => {
          this.logger.error(error);
          return error;
        },
      );

    return data;
  }
}
