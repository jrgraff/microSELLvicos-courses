import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { PrismaService } from '../database/prisma/prisma.service';

interface CreateCourseParams {
  slug?: string;
  title: string;
}

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async createCourse({
    title,
    slug = slugify(title, {
      lower: true,
    }),
  }: CreateCourseParams) {
    const courseSlug = slug;

    const courseAlreadyExists = await this.prisma.course.findUnique({
      where: {
        slug: courseSlug,
      },
    });

    if (courseAlreadyExists) {
      throw new Error('Course already exists!');
    }

    return this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }

  listAllCourses() {
    return this.prisma.course.findMany();
  }

  getCourseById(id: string) {
    return this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }

  getCourseBySlug(slug: string) {
    return this.prisma.course.findUnique({
      where: {
        slug,
      },
    });
  }
}
