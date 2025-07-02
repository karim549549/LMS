import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as mjml2html from 'mjml';
import * as Handlebars from 'handlebars';
import { promises as fs } from 'fs';
import { join } from 'path';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly configService: ConfigService,
    @InjectQueue('email') private readonly emailQueue: Queue
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get('SMTP_PORT'),
      secure: this.configService.get('SMTP_SECURE') === 'true',
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });
  }

  async sendEmail(options: {
    to: string;
    subject: string;
    template: string;
    variables: Record<string, any>;
    queue?: boolean;
  }) {
    if (options.queue) {
      await this.emailQueue.add('send', options);
      return;
    }
    const html = await this.renderTemplate(options.template, options.variables);
    await this.transporter.sendMail({
      from: this.configService.get('EMAIL_FROM'),
      to: options.to,
      subject: options.subject,
      html,
    });
  }

  private async renderTemplate(templateName: string, variables: Record<string, any>): Promise<string> {
    const templatePath = join('src/templates', `${templateName}.mjml`);
    const mjmlRaw = await fs.readFile(templatePath, 'utf8');
    const compiled = Handlebars.compile(mjmlRaw);
    const mjmlWithVars = compiled({
      ...variables,
      brandName: this.configService.get('BRAND_NAME') || 'LMS',
      logoUrl: this.configService.get('BRAND_LOGO_URL') || 'https://placehold.co/150x50',
      currentYear: new Date().getFullYear(),
    });
    const { html, errors } = mjml2html(mjmlWithVars, { minify: true });
    if (errors && errors.length) {
      this.logger.error('MJML errors', errors);
    }
    return html;
  }

  // Example: send password reset email (OTP or link)
  async sendPasswordResetEmail(to: string, variables: { name: string; otp?: string; ctaUrl?: string; ctaText?: string; }) {
    await this.sendEmail({
      to,
      subject: 'Password Reset Request',
      template: 'password-reset',
      variables,
      queue: false, // set to true for background
    });
  }
}
