import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService {
  private logger = new Logger('AWS');
  constructor(private readonly configService: ConfigService) {}

  public async uploadFile(file: any, id: string): Promise<any> {
    const s3 = new AWS.S3({
      endpoint: this.configService.get('aws.endpoint_s3'),
      s3ForcePathStyle: true,
      // region: this.configService.get('aws.region'),
      // accessKeyId: this.configService.get('aws.access_key'),
      // secretAccessKey: this.configService.get('aws.secret_key'),
    });

    // Example: buckets list
    // s3.listBuckets((err, data) =>
    //   console.log(err ? err : `'Buckets:', ${data.Buckets}`),
    // );

    if (!file && !file.originalname) throw new Error('error in file');
    const fileExt = file.originalname.split('.')[1];
    const urlKey = `${id}.${fileExt}`;
    const params = {
      Body: file.buffer,
      Bucket: this.configService.get('aws.bucket'),
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
