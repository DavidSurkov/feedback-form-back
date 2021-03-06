import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

export class FormService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
  ) {}

  findAll(): Promise<Feedback[]> {
    return this.feedbackRepository.find();
  }

  async findOne(id: string): Promise<Feedback> {
    const feedback = await this.feedbackRepository.findOne({ id: +id });
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
