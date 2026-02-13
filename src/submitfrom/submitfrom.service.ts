import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';

import { SubmitFrom, SubmitFromDocument } from './entities/submitfrom.entity';
import { CreateSubmitFromDto } from './dto/create-submitfrom.dto';

@Injectable()
export class SubmitFromService {
  constructor(
    @InjectModel(SubmitFrom.name)
    private readonly submitFromModel: Model<SubmitFromDocument>,
  ) {}

  async create(createDto: CreateSubmitFromDto) {
    try {
      const savedData = await this.submitFromModel.create(createDto);

      await this.sendEmail(createDto);

      return {
        success: true,
        message: 'Consultation request submitted successfully',
        data: savedData,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error?.message || 'Something went wrong while submitting form',
      );
    }
  }

  private async sendEmail(data: CreateSubmitFromDto) {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false, 
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM, 
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: 'New Consultation Form Submitted',
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding:30px;">
          <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background:#0f172a; padding:20px;">
              <h2 style="margin:0; color:#ffffff; text-align:center;">
                New Consultation Request
              </h2>
            </div>

            <!-- Body -->
            <div style="padding:25px;">
              <p style="font-size:14px; color:#333;">
                You have received a new consultation request. Details are below:
              </p>

              <table style="width:100%; border-collapse:collapse; margin-top:15px;">
                <tr>
                  <td style="padding:10px; font-weight:bold; color:#555;">Full Name</td>
                  <td style="padding:10px; color:#111;">${data.fullName}</td>
                </tr>
                <tr style="background:#f9fafb;">
                  <td style="padding:10px; font-weight:bold; color:#555;">Email</td>
                  <td style="padding:10px; color:#111;">${data.email}</td>
                </tr>
                <tr>
                  <td style="padding:10px; font-weight:bold; color:#555;">Phone Number</td>
                  <td style="padding:10px; color:#111;">${data.phoneNumber}</td>
                </tr>
                <tr style="background:#f9fafb;">
                  <td style="padding:10px; font-weight:bold; color:#555;">Project Type</td>
                  <td style="padding:10px; color:#111;">${data.projectType}</td>
                </tr>
                <tr>
                  <td style="padding:10px; font-weight:bold; color:#555; vertical-align:top;">
                    Project Details
                  </td>
                  <td style="padding:10px; color:#111;">
                    ${data.projectDetails}
                  </td>
                </tr>
              </table>
            </div>

            <!-- Footer -->
            <div style="background:#f1f5f9; padding:15px; text-align:center;">
              <p style="margin:0; font-size:12px; color:#666;">
                This email was automatically generated from the consultation form.
              </p>
              <p style="margin:5px 0 0; font-size:12px; color:#666;">
                © ${new Date().getFullYear()} Alibda Interiors
              </p>
            </div>

          </div>
        </div>
      `,
    });
  }
}
