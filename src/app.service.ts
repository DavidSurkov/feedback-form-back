import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './feedback.entity';
import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
  ) {}
  findAll(): Promise<Feedback[]> {
    return this.feedbackRepository.find();
  }
  async findOne(id: string): Promise<Feedback> {
    const feedback = await this.feedbackRepository.findOneBy({ id: +id });
    if (!feedback) {
      throw new NotFoundException(`Feedback #${id} not found`);
    }
    return feedback;
  }
  create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const feedback = this.feedbackRepository.create(createFeedbackDto);
    return this.feedbackRepository.save(feedback);
  }
  async update(
    id: string,
    updateFeedbackDto: UpdateFeedbackDto,
  ): Promise<Feedback> {
    const feedback = await this.feedbackRepository.preload({
      id: +id,
      ...updateFeedbackDto,
    });
    if (!feedback) {
      throw new NotFoundException(`Feedback #${id} not found`);
    }
    return this.feedbackRepository.save(feedback);
  }
  async remove(id: string): Promise<Feedback> {
    const feedback = await this.findOne(id);
    return this.feedbackRepository.remove(feedback);
  }
}
