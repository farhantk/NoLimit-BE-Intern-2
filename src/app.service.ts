import { Client } from '@elastic/elasticsearch';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
    private readonly client: Client;

    constructor() {
        this.client = new Client({ node: 'http://localhost:9200' });
    }

    async onModuleInit() {
      console.log('Connected to Elasticsearch');
      try {
        const health = await this.client.cluster.health();
        console.log(health);
      } catch (error) {
        console.error('Error connecting to Elasticsearch:', error);
      }
    }
    async countDocuments(index: string): Promise<number> {
        try {
            const result = await this.client.count({ index });
            if (result.body.count === 0) {
                throw new NotFoundException(`No documents found in the index: ${index}`);
            }
    
            return result.body.count;
        } catch (error) {
            throw new InternalServerErrorException('Internal server error');
        }
    }
    async calculateAverageSalary(index: string): Promise<number> {
        try {
            const result = await this.client.search({
                index,
                body: {
                    aggs: {
                        average_salary: {
                            avg: {
                                field: 'Salary',
                            },
                        },
                    },
                },
            });
            const averageSalary = result.body.aggregations.average_salary.value;
            if (averageSalary === null) {
                throw new NotFoundException('No salary data found for this index');
            }
    
            return averageSalary;
    
        } catch (error) {
            throw new InternalServerErrorException('Internal server error');
        }
    }
    async getMinMaxSalary(index: string): Promise<{ minSalary: number, maxSalary: number }>{
        try {
            const result = await this.client.search({
                index,
                body: {
                    aggs: {
                        min_salary: {
                            min: {
                                field: 'Salary'
                            }
                        },
                        max_salary: {
                            max: {
                                field: 'Salary'
                            }
                        }
                    }
                }
            });

            const minSalary = result.body.aggregations.min_salary.value;
            const maxSalary = result.body.aggregations.max_salary.value;
            if (minSalary === null || maxSalary === null) {
                throw new InternalServerErrorException('Error calculating minimum or maximum salary.');
            }

            return { minSalary, maxSalary };
        } catch (error) {
            throw new InternalServerErrorException('Internal server error');
        }
    }
    async getAgeDistribution(index: string): Promise<any> {
        try {
            const result = await this.client.search({
                index,
                body: {
                    aggs: {
                        age_distribution: {
                            histogram: {
                                field: 'Age',
                                interval: 5 
                            }
                        }
                    }
                }
            });
            const ageDistribution = result.body.aggregations.age_distribution.buckets;
            return ageDistribution.map(bucket => ({
                ageRange: `${bucket.key} - ${bucket.key + 5}`, 
                count: bucket.doc_count 
            }));
        } catch (error) {
            console.log(">>>", error)
            throw new InternalServerErrorException('Internal server error');
        }
    }
    async getMaritalDistribution(index: string): Promise<any> {
        try {
            const result = await this.client.search({
                index,
                body: {
                    aggs: {
                        gender_distribution: {
                            terms: {
                                field: 'MaritalStatus.keyword'
                            }
                        }
                    }
                }
            });

            const maritalDistribution = result.body.aggregations.gender_distribution.buckets;

            return maritalDistribution.map(bucket => ({
                marital: bucket.key,
                count: bucket.doc_count
            }));
        } catch (error) {
            console.error('Error:', error);
            throw new InternalServerErrorException('Internal server error');
        }
    }
    async getGenderDistribution(index: string): Promise<any> {
        try {
            const result = await this.client.search({
                index,
                body: {
                    aggs: {
                        gender_distribution: {
                            terms: {
                                field: 'Gender.keyword'
                            }
                        }
                    }
                }
            });

            const genderDistribution = result.body.aggregations.gender_distribution.buckets;

            return genderDistribution.map(bucket => ({
                gender: bucket.key,
                count: bucket.doc_count
            }));
        } catch (error) {
            console.error('Error:', error);
            throw new InternalServerErrorException('Internal server error');
        }
    }
    async getDateOfJoining(index: string): Promise<any> {
        try {
            const result = await this.client.search({
                index,
                size: 0,
                body: {
                    size: 0,
                        aggs: {
                            join_date_histogram: {
                                date_histogram: {
                                    field: 'DateOfJoining',
                                    interval: 'month', 
                                    format: 'yyyy-MM'
                        }
                      }
                    }
                },
            });
    
            const buckets = result.body.aggregations.join_date_histogram.buckets;

            return buckets.map((bucket: any) => ({
                date: bucket.key_as_string,
                count: bucket.doc_count,
            }));
        } catch (error) {
            throw new InternalServerErrorException('Internal server error');
        }
    }
    async getInterestDistribution(index: string): Promise<any> {
        try {
            const result = await this.client.search({
                index,
                body: {
                    aggs: {
                        interest_distribution: {
                            terms: {
                                field: 'Interests.keyword'
                            }
                        }
                    }
                }
            });

            const interestDistribution = result.body.aggregations.interest_distribution.buckets;

            return interestDistribution.map(bucket => ({
                interest: bucket.key,
                count: bucket.doc_count
            }));
        } catch (error) {
            console.error('Error:', error);
            throw new InternalServerErrorException('Internal server error');
        }
    }
    async getDesignationDistribution(index: string): Promise<any> {
        try {
            const result = await this.client.search({
                index,
                body: {
                    aggs: {
                        designation_distribution: {
                            terms: {
                                field: 'Designation.keyword'
                            }
                        }
                    }
                }
            });

            const designationDistribution = result.body.aggregations.designation_distribution.buckets;

            return designationDistribution.map(bucket => ({
                designation: bucket.key,
                count: bucket.doc_count
            }));
        } catch (error) {
            console.error('Error:', error);
            throw new InternalServerErrorException('Internal server error');
        }
    }
}
