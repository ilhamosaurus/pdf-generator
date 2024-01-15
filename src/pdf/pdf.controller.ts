import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { Response } from 'express';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get()
  async getPdf(@Query('url') url: string, @Res() res: Response): Promise<void> {
    const buffer = await this.pdfService.getPdf(url);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${url}.pdf`,
      //prevent cache
      'Cache-Control': 'no-cache, no-store,must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    });
    res.send(buffer);
  }

  @Post()
  async postPdf(@Body('url') url: string, @Res() res: Response): Promise<void> {
    const buffer = await this.pdfService.getPdf(url);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${url}.pdf`,

      'Cache-Control': 'no-cache, no-store,must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    });
    res.send(buffer);
  }
}
