import { BadRequestException, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

    @HttpCode(200)
    @Get('count')
    async countDocuments(@Query('index') index: string) {
        if (!index) {
            throw new BadRequestException('Index parameter is required');
        }
        const count = await this.appService.countDocuments(index);
        return { totalDocuments: count };
    }

    @HttpCode(200)
    @Get('averagesalary')
    async getAverageSalary(@Query('index') index: string) {
        if (!index) {
            throw new BadRequestException('Index parameter is required');
        }
        const averageSalary = await this.appService.calculateAverageSalary(index);
        return { averageSalary };
    }

    @HttpCode(200)
    @Get('minmaxsalary')
    async getMinMaxSalary(@Query('index') index: string) {
        if (!index) {
            throw new BadRequestException('Index parameter is required');
        }
        const salaries = await this.appService.getMinMaxSalary(index);
        return salaries;
    }

    @HttpCode(200)
    @Get('agedistribution')
    async getAgeDistribution(@Query('index') index: string) {
        if (!index) {
            throw new BadRequestException('Index parameter is required');
        }
        const distribution = await this.appService.getAgeDistribution(index);
        return distribution;
    }

    @HttpCode(200)
    @Get('genderdistribution')
    async getGenderDistribution(@Query('index') index: string) {
        if (!index) {
            throw new BadRequestException('Index parameter is required');
        }
        const distribution = await this.appService.getGenderDistribution(index);
        return distribution;
    }
    @HttpCode(200)
    @Get('maritaldistribution')
    async getMaritalDistribution(@Query('index') index: string) {
        if (!index) {
            throw new BadRequestException('Index parameter is required');
        }
        const distribution = await this.appService.getMaritalDistribution(index);
        return distribution;
    }

    @HttpCode(200)
    @Get('dateofjoining')
    async getDateOfJoining(@Query('index') index: string): Promise<any> {
        if (!index) {
            throw new BadRequestException('Index parameter is required');
        }
        return this.appService.getDateOfJoining(index);
    }
    @HttpCode(200)
    @Get('interestdistribution')
    async getInterestDistribution(@Query('index') index: string): Promise<any> {
        if (!index) {
            throw new BadRequestException('Index parameter is required');
        }
        return this.appService.getInterestDistribution(index);
    }
    @HttpCode(200)
    @Get('designationdistribution')
    async getDesignationDistribution(@Query('index') index: string): Promise<any> {
        if (!index) {
            throw new BadRequestException('Index parameter is required');
        }
        return this.appService.getDesignationDistribution(index);
    }
}
